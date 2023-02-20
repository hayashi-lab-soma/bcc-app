import React, { useState, useEffect } from 'react'

import { PhotoList } from '../templates'
import { Box, CircularProgress, DialogContent, Divider, Typography } from '@mui/material'
import { Dialog } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

import { Storage } from 'aws-amplify'

const InferencedPhotos = (props) => {

  const [photos, setPhotos] = useState([])
  const [urls, setUrls] = useState([])

  const [open, setOpen] = useState(false)
  const [isLoding, setLoding] = useState(false)
  const [url, setURL] = useState(null)

  const fetch = async () => {
    console.debug('Fetch')
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
            thumb: sortedThumbs[i].key,
            isLoding: true
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
  }

  useEffect(() => {
    fetch()
  }, [])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     fetch()
  //   }, 10000);
  //   return () => clearInterval(timer)
  // }, [])

  useEffect(() => {
    (async () => {
      return Promise.all(photos.map(async (photo, i) => {
        photo.isLoding = true
        const url = await Storage.get(photo.thumb, { level: 'protected' })
        photo.isLoding = false
        return url
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
              setOpen(true)
              setLoding(true)
              const url = await Storage.get(photos[i].raw, { level: 'protected' })
              setLoding(false)
              setURL(url)
            }} />

        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setURL('')
        }}>

        <DialogContent>
          {
            !isLoding ?
              <Image
                src={url}
                alt={'full screen'}
                loading='lazy'
              /> :
              <Box
                sx={{
                  display: 'flex',
                }}>
                <CircularProgress />
              </Box>
          }

        </DialogContent>

      </Dialog>
    </div >
  )
}

export default InferencedPhotos