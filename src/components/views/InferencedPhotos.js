import React, { useState, useEffect } from 'react'

import { PhotoList } from '../templates'
import { Box, Divider, Typography } from '@mui/material'
import { Dialog } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

import { Storage } from 'aws-amplify'

const InferencedPhotos = (props) => {

  const [photos, setPhotos] = useState([])
  const [urls, setUrls] = useState([])

  const [open, setOpen] = useState(false)
  const [url, setURL] = useState(null)

  const getS3ObjectURL = async (key) => {
    try {
      const ret = await Storage.get(key, { level: 'protected' })
      return ret
    }
    catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const rawObjects = await Storage.list('raws/', { level: 'protected' })
        const thumbObjects = await Storage.list('thumbs/', { level: 'protected' })
        // console.debug(rawObjects.results)
        // console.debug(thumbObjects.results)

        const sortedRaws = rawObjects.results.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))
        const sortedThumbs = thumbObjects.results.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))

        Promise.all(
          sortedRaws.map((obj, i) => {
            return {
              title: obj.key.split('/').pop().split('_').shift(),
              date: obj.lastModified,
              raw: obj.key,
              thumb: sortedThumbs[i].key
            }
          })
        ).then((photos) => {
          setPhotos(photos)
        })
        // console.log(photos)
      }
      catch (e) {
        console.error(e)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      return Promise.all(photos.map(async (photo, i) => {
        return await Storage.get(photo.thumb, { level: 'protected' })
      }))
    })()
      .then((urls) => {
        setUrls(urls)
      })
  }, [photos])

  return (
    <div>
      <Box
        sx={{
          // border: '2px solid black',
          display: 'flex',
          flexDirection: 'column',
        }}>

        <Divider
          textAlign='left'
          sx={{
            m: 2
          }}>
          <Typography variant='h6'>{`画像一覧（${photos.length}件）`}</Typography>
        </Divider>

        <Box
          sx={{
            mr: 5,
            ml: 5,
            mb: 5,
          }}>

          <PhotoList
            photos={photos}
            urls={urls}
            onFullScreen={async (i) => {
              const _key = photos[i].raw
              const url = await getS3ObjectURL(_key)
              setURL(url)
              setOpen(true)
            }} />

        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => { setOpen(false) }}
      >

        <Image
          src={url}
          alt={'full screen'}
        />

      </Dialog>
    </div >
  )
}

export default InferencedPhotos