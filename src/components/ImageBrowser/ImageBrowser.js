import React, { useState, useEffect } from 'react'

import { API, Storage } from 'aws-amplify'
import { listImages, } from '../../graphql/queries'
import { deleteImage, createImage } from '../../graphql/mutations'

import ImageToolBar from './ImageToolBar'
import ImageList from './ImageList'
import ImageCreateDialog from './ImageCreateDialog'

import moment from 'moment'
import loadImage from 'blueimp-load-image'
// import ExifReader from 'exifreader'
// import { resize } from 'jimp'

// const UPLOAD_IMAGE_SIZE = 768
const UPLOAD_IMAGE_SIZE = 1280

const ImageBrowser = (props) => {

  const [images, setImages] = useState([])

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  //Component did mount
  useEffect(() => {
    fetchImages()
  }, [props.album])

  const fetchImages = () => {
    let _filter = {}

    if (props.album.id === 'all') {
      _filter = {
        autherId: { 'eq': props.identityId },
      }
    }
    else {
      _filter = {
        and: [
          { autherId: { 'eq': props.identityId } },
          { albumImagesId: { 'eq': props.album.id } },
        ]
      }
    }

    // console.debug('Filter', _filter)

    API.graphql({
      query: listImages,
      variables: {
        limit: 2000,
        filter: _filter
      }
    })
      .then((res) => {
        let items = res.data.listImages.items
        items = items.filter(elem => !elem._deleted) //remove deleted flag data

        items.sort((a, b) => -(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))

        // sort((a, b) => -(a.lastModified.getTime()) - (b.lastModified.getTime()))
        console.debug(`Fetched Images  (${props.album.name}) `, items)

        setImages(items)
      })
      .catch((err) => {
        console.error('Fetch Image Error', err.errors)
      })
  }

  const imagesize = async (file) => {
    return new Promise((resolve, reject) => {

      const img = new Image()

      img.onload = () => {
        const size = {
          width: img.naturalWidth,
          height: img.naturalHeight
        }

        URL.revokeObjectURL(img.src)
        resolve(size)
      }

      img.onerror = (error) => {
        reject(error)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  //
  const createSingleImage = (srcFile, albumId) => {

    console.debug('Target File', srcFile)

    const parseExifData = (src) => {
      return new Promise((resolve, reject) => {
        loadImage.parseMetaData(src, (data) => {
          if (data) {
            console.debug(data)
            resolve(data)
          }
          console.warn('Uncontain EXIF data')
          reject('Uncontain EXIF data contents')
        })
      })
    }

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          let gps = {
            latitude: latitude,
            longitude: longitude
          }
          resolve(gps)
        })
      })
    }

    const resizeImage = (src, resizeOption) => {
      return new Promise((resolve, reject) => {
        loadImage(src, (canvas, metadata) => {
          resolve({ canvas, metadata })
        }, resizeOption)
      })
    }

    const canvas2blob = (canvas) => {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        })
      })
    }

    const preprocessing = async (src) => {
      const srcSize = await imagesize(srcFile)
      console.debug('Src size:', srcSize)

      const exif = await parseExifData(src)

      let dateTime = {}
      let gps = {}

      if ('exif' in exif) {
        dateTime = exif.exif.get('DateTime')
        console.debug('Date & Time from EXIF: ', dateTime)
      }
      else {
        let _dateTime = new Date()
        dateTime = moment(_dateTime).format('YYYY:MM:DD HH:mm:ss')
        console.debug('Date & Time from device: ', dateTime)
      }



      if ('GPSInfo' in exif) {
        const _gps = exif.exif.get('GPSInfo')
        const lat = _gps.get('GPSLatitude')
        const lon = _gps.get('GPSLongitude')
      }
      else {
        gps = await getCurrentPosition()
        console.debug('GPS info from device: ', gps)
      }


      if (Math.max(srcSize.width, srcSize.height) > UPLOAD_IMAGE_SIZE) {
        let tmp = await resizeImage(src, {
          maxHeight: UPLOAD_IMAGE_SIZE,
          maxWidth: UPLOAD_IMAGE_SIZE,
          canvas: true,
          orientation: true,
          meta: true
        })

        const canvas = tmp.canvas
        const width = canvas.width
        const height = canvas.height
        // let metadata = tmp.metadata

        const blob = await canvas2blob(canvas)

        let dstFile = new File([blob], 'image/jpeg')
        return { dstFile, width, height, dateTime, gps }
      }
      else {
        const width = srcSize.width
        const height = srcSize.height
        const dstFile = srcFile
        return { dstFile, width, height, gps }
      }
    }

    preprocessing(srcFile)
      .then((res) => {
        console.debug(res)

        // Make Image model
        let item = {
          name: srcFile.name,
          rect: {
            width: res.width,
            height: res.height
          },
          size: res.dstFile.size,
          auther: props.username,
          autherId: props.identityId,
          albumImagesId: albumId,
          date: moment(res.dateTime, 'YYYY:MM:DD HH:mm:ss').format('YYYY-MM-DD'),
          time: moment(res.dateTime, 'YYYY:MM:DD HH:mm:ss').format('HH:mm:ss.sss'),
          location: {
            latitude: res.gps.latitude,
            longitude: res.gps.longitude
          }
        }

        console.debug('Create new Image item', item)


        // PutImage to S3 Backet
        Storage.put(
          srcFile.name,
          res.dstFile,
          { level: 'protected' })
          .then((res) => {
            item.key = res.key
            // Call GraphQL API 'Create Image'
            API.graphql({ query: createImage, variables: { input: item } })
              .then((result) => {
                console.debug('Success DataStore Image', result)
                fetchImages()
              })
              .catch((err) => {
                console.error(console.error('Create Image Error', err))
              })
          })
          .catch((res) => {
          })
      })
      .catch((err) => {
        console.error('Preprocessing Error', err)
      })
  }

  const handleCreateImage = (files, albumId) => {
    files.map((file, idx) => {
      createSingleImage(file, albumId)
    })
  }

  const handleEditImage = (image) => {
    console.debug('Edit Image', image)
  }

  const handleDeleteImage = (image) => {
    console.debug('Delete Image', image)

    Storage.remove(image.key, { level: 'protected' })
      .then((result) => {
        console.debug('Deleted Image', result)

        let item = {
          id: image.id,
          _version: image._version
        }

        API.graphql({ query: deleteImage, variables: { input: item } })
          .then((result) => {
            console.debug(result)

            fetchImages()
          })
          .catch((err) => {
            console.error(err)
          })

      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <ImageToolBar
        album={props.album}
        imagesNum={images.length}
        onCreateImage={() => { setOpen(true) }}
      />

      <ImageList
        userId={props.identityId}
        album={props.album}
        images={images}
        onEditImage={handleEditImage}
        onDeleteImage={handleDeleteImage}
      />

      <ImageCreateDialog
        albums={props.albums}
        open={open}
        onClose={handleClose}
        onCreate={handleCreateImage}
      />

    </div>
  )
}

export default ImageBrowser