import React, { useState, useEffect } from 'react'

import { API, Storage } from 'aws-amplify'
import { listImages, } from '../../graphql/queries'
import { deleteImage, } from '../../graphql/mutations'

import ImageToolBar from './ImageToolBar'
import ImageList from './ImageList'
import ImageCreateDialog from './ImageCreateDialog'

import loadImage from 'blueimp-load-image'
// import ExifReader from 'exifreader'
// import { resize } from 'jimp'

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
        autherid: { 'eq': props.identityId },
      }
    }
    // else if (props.album.id === 'non') {
    //   _filter = {
    //     and: [
    //       { autherid: { 'eq': props.identityId } },
    //       { albumImagesId: null }
    //     ]
    //   }
    // }
    else {
      _filter = {
        and: [
          { autherid: { 'eq': props.identityId } },
          { albumImagesId: { 'eq': props.album.id } },
        ]
      }
    }

    // console.debug('Filter', _filter)

    API.graphql({
      query: listImages,
      variables: {
        filter: _filter
      }
    })
      .then((res) => {
        let items = res.data.listImages.items
        items = items.filter(elem => !elem._deleted)
        console.debug(`Fetched (${props.album.name}) Images`, items)
        setImages(items)
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  //
  //
  //
  const createSingleImage = (srcFile, albumId) => {

    console.debug('Upload File Object', srcFile)

    // const makeResizeOption = (src) => {
    //   return new Promise((resolve, reject) => {
    //     const options = {
    //       maxHeight: 1280,
    //       maxWidth: 1280,
    //       canvas: true,
    //       orientation: true
    //     }
    //     //get metadata (exif data) and get photo orientation
    //     loadImage.parseMetaData(src, (data) => {
    //       if (data.exif) { //existing EXIF data?
    //         options.orientation = data.exif.get('Orientation')
    //       }
    //       resolve(options)
    //     })

    //   })
    // }

    // const getExifData = (src) => {
    //   return new Promise((resolve, reject) => {
    //     loadImage.parseMetaData(src, (data) => {
    //       resolve(data)
    //     })
    //   })
    // }

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
      // let exif = await getExifData(src)
      let tmp = await resizeImage(src, {
        maxHeight: 1280,
        maxWidth: 1280,
        canvas: true,
        orientation: true,
        meta: true
      })

      let canvas = tmp.canvas
      let metadata = tmp.metadate

      let blob = await canvas2blob(tmp.canvas)

      // console.debug(exif)
      // console.debug(exif.exif)
      // console.debug(canvas.width, canvas.height)
      // console.debug(blob)
    }


    preprocessing(srcFile)


    // makeResizeOption(srcFile)
    //   .then((options) => {

    //     resizeImage(srcFile, options)
    //       .then((resizedBlob) => {
    //         // console.debug(resizedBlob)

    //         let resizedFile = new File([resizedBlob], 'image/jpeg')
    //         console.debug(resizedFile)
    //       })
    //       .catch((err) => {
    //         console.error(err)
    //       })
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })

    // resizeImage(srcFile,
    //   {
    //     maxHeight: 1280,
    //     maxWidth: 1280,
    //     canvas: true,
    //     orientation: true
    //   })
    //   .then((resizedBlob) => {
    //     // console.debug(resizedBlob)
    //     let resizedFile = new File([resizedBlob], 'image/jpeg')
    //     console.debug(resizedFile)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })

    // loadImage.parseMetaData(srcFile, (data) => {

    //   const options = {
    //     maxHeight: 1024,
    //     maxWidth: 1024,
    //     canvas: true
    //   }
    //   if (data.exif) {
    //     options.orientation = data.exif.get('Orientation')
    //   }

    //   loadImage(srcFile, (canvas) => {

    //     canvas.toBlob((blob) => {

    //       Storage.put(srcFile.name, blob, {
    //         level: "protected",
    //       })
    //         .then((res) => {
    //           console.debug(res)
    //         })
    //         .catch((err) => {
    //           console.error(err)
    //         })
    //     }, 'image/jpeg')

    //   }, options)
    // })

    // ExifReader.load(file, { expanded: true })
    //   .then((result) => {
    //     let exif_file = 'file' in result ? result.file : null
    //     let exif_data = 'exif' in result ? result.exif : null

    //     console.debug('File meta data', exif_file)
    //     console.debug('File Exif data', exif_data)

    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })

    // Storage.put(file.name, file, {
    //   level: "protected",
    // })
    //   .then((result) => {
    //     console.log('Success create Image', result)
    //     const Key = result.key

    //     ExifReader.load(file, { expanded: true })
    //       .then((result) => {
    //         console.debug(result)
    //         // console.debug(result.exif)

    //         // let _rect = {
    //         //   width: result.file['Image Width'].value,
    //         //   height: result.file['Image Height'].value
    //         // }

    //         // let _date = ''
    //         // let _time = ''
    //         // if (result.exif) {
    //         //   _date = moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('YYYY-MM-DD')
    //         //   _time = moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('HH:mm:ss.sss')
    //         // }

    //         let _location = {
    //           latitude: -1.0,
    //           longitude: -1.0
    //         }

    //         let item = {
    //           name: file.name,
    //           rect: {
    //             width: result.file['Image Width'].value,
    //             height: result.file['Image Height'].value
    //           },
    //           size: file.size,
    //           auther: props.username,
    //           autherid: props.identityId,
    //           key: Key,
    //           albumImagesId: albumId,
    //           date: result.exif ? moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('YYYY-MM-DD') : '2022-01-01',
    //           time: result.exif ? moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('HH:mm:ss.sss') : '01:01:01.111',
    //           location: _location
    //         }

    //         console.debug(item)

    //         API.graphql({ query: createImage, variables: { input: item } })
    //           .then((result) => {
    //             console.debug('Success DataStore Image', result)
    //           })
    //           .catch((err) => {
    //             console.error({ err })
    //           })

    //       })
    //       .catch((err) => {
    //         console.error(err)
    //       })
    //   })
    //   .catch((err) => {
    //     console.error({ err })
    //   })
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