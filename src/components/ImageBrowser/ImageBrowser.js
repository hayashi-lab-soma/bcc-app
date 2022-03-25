import React, { useState, useEffect } from 'react'

import { API, graphqlOperation } from 'aws-amplify'
import { listImages } from '../../graphql/queries'

import ImageToolBar from './ImageToolBar'
import ImageList from './ImageList'

const ImageBrowser = (props) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      // if (credential === null) return

      let filter = {}

      if (props.album.name === 'all') {
        filter = {
          // autherid: { 'eq': credential.identityId }
          autherid: { 'eq': props.identityId }
        }
      }
      else if (props.album.name === 'nonalbum') {
        filter = {
          and: [
            // { autherid: { 'eq': credential.identityId } },
            { autherid: { 'eq': props.identityId } },
            { albumImagesId: { 'eq': '' } }
          ]
        }
      }
      else {
        filter = {
          and: [
            // { autherid: { 'eq': credential.identityId } },
            { autherid: { 'eq': props.identityId } },
            { albumImagesId: { 'eq': props.album.id } }
          ]
        }
      } //else

      let variables = {
        filter: filter,
        limit: 200
      }

      const data = await API.graphql({
        query: listImages,
        variables: variables
      })

      console.log(data.data.listImages.items.length)

      setImages(data.data.listImages.items)
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <ImageToolBar
        album={props.album}
        images={images} />

      <ImageList
        // userId={credential === null ? '' : credential.identityId}
        userId={props.identityId}
        album={props.album}
        images={images}
      />

    </div>
  )
}

export default ImageBrowser