import React, { useState, useEffect } from 'react'

import { PhotoList, PhotoFullScreenDialog, } from '../templates'
import { Box, Divider, Typography, } from '@mui/material'
import { Pagination } from '@mui/material'
import { Storage } from 'aws-amplify'

const PhotosView = (props) => {

  const [photos, setPhotos] = useState([])
  const [slicedPhotos, setSlicesPhotos] = useState([])
  const [urls, setUrls] = useState([])

  const [open, setOpen] = useState(false)
  const [expandPhotoUrls, setExpandPhotoUrls] = useState([])

  const [page, setPage] = useState(0)

  const sortbyLastModifiedTime = (a, b) => {
    return -(a.lastModified.getTime() - b.lastModified.getTime())
  }

  const fetch = async () => {
    try {
      Storage.list('thumbs/', { level: 'protected', pageSize: 'ALL' })
        .then((res) => {
          const sortedThumbs = res.results.sort(sortbyLastModifiedTime)

          Promise.all(
            sortedThumbs.map(async (thumb, i) => {
              const raw_key = thumb.key.replace('thumbs/', 'raws/')
              const raw_dst = await Storage.list(raw_key, { level: 'protected', pageSize: 'ALL' })
              const input_key = thumb.key.replace('thumbs/', '')
              const input_dst = await Storage.list(input_key, { level: 'private', pageSize: 'ALL' })

              return {
                title: input_key.match(/'.*?'/)[0],
                date: input_dst.results[0].lastModified,
                size: raw_dst.results[0].size,
                input_key: input_key,
                raw_key: raw_key,
                thumb_key: thumb.key
              }
            })
          )
            .then((res) => {
              // console.log(res)
              setPhotos(res)
              setPage(1)
              setSlicesPhotos(res.slice(0, 10))
            })
        })
    }
    catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    (async () => {
      return Promise.all(slicedPhotos.map(async (photo, i) => {
        const url = await Storage.get(photo.thumb_key, { level: 'protected' })
        return url
      }))
    })()
      .then((urls) => {
        setUrls(urls)
      })
  }, [slicedPhotos])

  return (
    <div>

      <main>

        <Divider
          textAlign='left'
          sx={{
            m: 2
          }}>

          <Box
            sx={{
              display: 'flex',
            }}>

            <Typography variant='h6'>{`検出結果一覧（${photos.length}件）`}</Typography>

          </Box>

        </Divider>

        <Pagination
          count={Math.round(photos.length / 10.0)}
          color='primary'
          page={page}
          sx={{
            display: 'flex',
            width: '100%',
            m: 3,
            justifyContent: 'center'
          }}
          onChange={(e, page) => {
            setPage(page)
            setSlicesPhotos(photos.slice((page - 1) * 10, (page - 1) * 10 + 10))
          }}
        />

        <PhotoList
          photos={slicedPhotos}
          urls={urls}
          onFullScreen={async (photo) => {
            const inputPhotoUrl = await Storage.get(photo.input_key, { level: 'private' })
            const rawPhotoUrl = await Storage.get(photo.raw_key, { level: 'protected' })
            const expand_photo = [
              photo.title,
              inputPhotoUrl,
              rawPhotoUrl,
            ]
            setExpandPhotoUrls(expand_photo)
            setOpen(true)
          }}
        />
      </main>


      <PhotoFullScreenDialog
        open={open}
        onClose={() => { setOpen(false) }}
        title={expandPhotoUrls[0]}
        inputPhotoSrc={expandPhotoUrls[1]}
        rawPhotoSrc={expandPhotoUrls[2]}
      />

    </div >
  )
}

export default PhotosView