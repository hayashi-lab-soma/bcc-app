import React, { useState, useEffect } from 'react'

import { API, Storage, DataStore } from 'aws-amplify'
import { Image, Location } from '../../models'
import { listImages, } from '../../graphql/queries'
import {createImage,} from '../../graphql/mutations'

import ImageToolBar from './ImageToolBar'
import ImageList from './ImageList'
import ImageCreateDialog from './ImageCreateDialog'

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
    else if (props.album.id === 'non') {
      _filter = {
        and: [
          { autherid: { 'eq': props.identityId } },
          { albumImagesId: null }
        ]
      }
    }
    else {
      _filter = {
        and: [
          { autherid: { 'eq': props.identityId } },
          { albumImagesId: { 'eq': props.album.id } }
        ]
      }
    }

    console.debug('Filter', _filter)

    API.graphql({
      query: listImages,
      variables: {
        filter: _filter
      }
    })
      .then((res) => {
        let items = res.data.listImages.items
        console.debug(`(${props.album.name}) Images`, items)
        setImages(items)
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  const createOneImage = (file, albumId) => {

    Storage.put(file.name, file, {
      level: "protected",
    })
      .then((result) => {
        console.log('Success create Image', result)

        let _location = {
          latitude: -1.0,
          longitude: -1.0
        }

        let item = {
          name: file.name,
          size: file.size,
          auther: props.username,
          autherid: props.identityId,
          key: result.key,
          albumImagesId: albumId,
          location: _location
        }

        console.debug(item)

        API.graphql({query: createImage, variables: { input: item } })
          .then((result) => {
            console.debug('Success DataStore Image', result)
          })
          .catch((err) => {
            console.error({ err })
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