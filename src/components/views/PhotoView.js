import React, { useState, useEffect } from 'react'

import { PhotoList, PhotoFullScreenDialog, } from '../templates'
import { Box, Divider, Typography, } from '@mui/material'
import { Pagination } from '@mui/material'
import { Storage } from 'aws-amplify'

const SLICE_SIZE = 10

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
      //Storage.list('thumbs/', { level: 'protected', pageSize: 'ALL' })
      Storage.list('raws/', {level: 'protected', pageSize: 'ALL'})
        .then((res) => {
          console.log(res)
          // const sortedThumbs = lodash.sortBy(res.results, [function(o){return o.lastModified.getTime()}])
          // const sortedThumbs = res.results.sort(sortbyLastModifiedTime)
          // const sortedThumbs = res.results

          const sortedRaws = res.results.sort(sortbyLastModifiedTime)

          Promise.all(
            // sortedThumbs.map(async (thumb, i) => {
              sortedRaws.map(async (raw, i) => {
              // const raw_key = thumb.key.replace('thumbs/', 'raws/')
              // const raw_dst = await Storage.list(raw_key, { level: 'protected', pageSize: 1 })
              // const input_key = thumb.key.replace('thumbs/', '')
              // const input_dst = await Storage.list(input_key, { level: 'private', pageSize: 1 })

              const raw_key = raw.key
              const thumb_key = raw_key.replace('raws/', 'thumbs/')
              const input_key = raw_key.replace('raws/', '')
              
              return {
                title: input_key.match(/'.*?'/)[0],
                date: raw.lastModified,
                size: raw.size,
                input_key: input_key,
                raw_key: raw_key,
                thumb_key: thumb_key
              }
            })
          )
            .then((res) => {
              // console.log(res)
              setPhotos(res)
              setPage(1)
              setSlicesPhotos(res.slice(0, SLICE_SIZE))
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
          count={Math.round(photos.length / SLICE_SIZE)}
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
            setSlicesPhotos(photos.slice((page - 1) * SLICE_SIZE, (page - 1) * SLICE_SIZE+ SLICE_SIZE))
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