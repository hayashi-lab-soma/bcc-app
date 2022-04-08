import React, { useEffect, useState } from 'react'

import { Storage, } from 'aws-amplify'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import { Box } from '@mui/material'

const S3ImageGallary = (props) => {

  const [images, setImages] = useState([])

  // console.debug('Current Images', images)

  useEffect(() => {
    (async () => {
      let tmp = await Storage.list('')
      console.debug('Fetch Public space', tmp) //tmp is list of object of s3 objects

      //Extraction of jpeg images
      let _images = []

      const getImageUrl = (img) => {
        return new Promise((resolve, reject) => {
          Storage.get(img.key)
            .then((res) => {
              // console.debug(res)
              resolve(res)
            })
            .catch((err) => {
              console.error(err)
              reject('error')
            })
        })
      }


      tmp.map((img, index) => {
        if (img.key.split('.').pop() === 'jpg') {
          let url = ''
          getImageUrl(img)
            .then((res) => {
              // console.debug(res)
              _images.push(
                {
                  original: res,
                  thumbnail: res,
                  originalTitle: img.key,
                  thumbnailTitle: img.key,
                })

              setImages(_images)
            })
            .catch((err) => {
            })
        }
      })

      console.debug('Image objects?', images)

    })()
  }, [])

  return (
    <Box sx={{ maxHeight: '500px' }}>
      <ImageGallery
        items={images}
        thumbnailPosition={'bottom'} />
    </Box>
  )
}

export default S3ImageGallary