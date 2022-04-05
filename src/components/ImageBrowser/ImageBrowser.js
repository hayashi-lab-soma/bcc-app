import React, { useState, useEffect } from 'react'

import { API, Storage, DataStore } from 'aws-amplify'
import { Image, Location } from '../../models'
import { listImages, } from '../../graphql/queries'
import { createImage, deleteImage, updateAlbum, } from '../../graphql/mutations'

import ImageToolBar from './ImageToolBar'
import ImageList from './ImageList'
import ImageCreateDialog from './ImageCreateDialog'

import ExifReader from 'exifreader'
import moment from 'moment'
import { Api } from '@mui/icons-material'

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

  const readExif = (file) => {
    ExifReader.load(file, { expanded: true })
      .then((res) => {
      })
      .catch((err) => {

      })
  }

  const createOneImage = (file, albumId) => {
    // console.debug(file)

    Storage.put(file.name, file, {
      level: "protected",
    })
      .then((result) => {
        console.log('Success create Image', result)
        const Key = result.key

        ExifReader.load(file, { expanded: true })
          .then((result) => {
            console.debug(result)
            // console.debug(result.exif)

            // let _rect = {
            //   width: result.file['Image Width'].value,
            //   height: result.file['Image Height'].value
            // }

            // let _date = ''
            // let _time = ''
            // if (result.exif) {
            //   _date = moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('YYYY-MM-DD')
            //   _time = moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('HH:mm:ss.sss')
            // }

            let _location = {
              latitude: -1.0,
              longitude: -1.0
            }

            let item = {
              name: file.name,
              rect: {
                width: result.file['Image Width'].value,
                height: result.file['Image Height'].value
              },
              size: file.size,
              auther: props.username,
              autherid: props.identityId,
              key: Key,
              albumImagesId: albumId,
              date: result.exif ? moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('YYYY-MM-DD') : '2022-01-01',
              time: result.exif ? moment(result.exif.DateTimeOriginal.description, 'YYYY:MM:DD HH:mm:ss').format('HH:mm:ss.sss') : '01:01:01.111',
              location: _location
            }

            console.debug(item)

            API.graphql({ query: createImage, variables: { input: item } })
              .then((result) => {
                console.debug('Success DataStore Image', result)
              })
              .catch((err) => {
                console.error({ err })
              })

          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  const handleCreateImage = (files, albumId) => {
    files.map((file, idx) => {
      createOneImage(file, albumId)
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