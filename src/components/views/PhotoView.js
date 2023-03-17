import React, { useState, useEffect } from 'react'

import { PhotoList, PhotoFullScreenDialog, } from '../templates'
import { Box, Grid, Button, Divider, Typography, } from '@mui/material'
import { Pagination } from '@mui/material'
import { Storage } from 'aws-amplify'

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme()
theme = responsiveFontSizes(theme);

const SLICE_SIZE = 10

const labels2 = [
  'プラスチック製品',
  'ペットボトル',
  '缶',
  'ガラス類',
  '金属類',
  '紙類',
  'ゴム類',
  '発泡スチロール',
  'ロープ・ひも類',
  'タバコ',
  'その他'
]

const PhotosView = (props) => {

  const [photos, setPhotos] = useState([])
  const [slicedPhotos, setSlicesPhotos] = useState([])
  const [urls, setUrls] = useState([])

  const [open, setOpen] = useState(false)
  const [expandPhotoUrls, setExpandPhotoUrls] = useState([])

  const [openLabelsDlg, setOpenLabelsDlg] = useState(false)

  const [page, setPage] = useState(0)

  const sortbyLastModifiedTime = (a, b) => {
    return -(a.lastModified.getTime() - b.lastModified.getTime())
  }

  const fetch = async () => {
    try {
      //Storage.list('thumbs/', { level: 'protected', pageSize: 'ALL' })
      Storage.list('raws/', { level: 'protected', pageSize: 'ALL' })
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>

          <ThemeProvider theme={theme}>
            <Typography
              variant='h6'
              textAlign='left'
              sx={{
                // border: '2px solid black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                pt: 1,
                pl: 1,
                mt: 2,
                ml: 5,
                mr: 5,
              }}>
              使用方法
            </Typography>

            <Typography
              variant='body1'
              textAlign={'left'}
              sx={{
                // border: '2px solid black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                pt: 1,
                pl: 3,
                ml: 5,
                mr: 5,
              }}>
              (1) プラスマークの画像投稿ボタンを押して，画像をアップロードしてください．
            </Typography>
            <Typography
              variant='body1'
              textAlign={'left'}
              sx={{
                // border: '2px solid black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                // pt: 3,
                pl: 3,
                ml: 5,
                mr: 5,
              }}>
              (2) 画像のアップロードが完了すると，AIによるゴミ検出と解析が行われます．
            </Typography>

            <Typography
              variant='body1'
              textAlign={'left'}
              sx={{
                // border: '2px solid black',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                // pt: 3,
                pl: 3,
                pb: 0,
                ml: 5,
                mr: 5,
              }}>
              (3) AI解析が完了した画像が結果一覧に表示されます．
            </Typography>

          </ThemeProvider>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pl: 2,
              pb: 1,
              ml: 5,
              mr: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}>

            <Button
              variant='text'
              color='primary'
              onClick={() => {
                setOpenLabelsDlg(true)
              }}>
              検出対象のゴミ種類はこちら
            </Button>
          </Box>

        </Box>

        <Divider
          // textAlign='left'
          sx={{
            mt: 1,
          }}>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>

            <Typography
              variant='h6'>
              {`AIによる検出結果（${photos.length}件）`}
            </Typography>
            <Typography
              variant='body'
              maxWidth={'50%'}>
              AIが検出したゴミは緑や紫で着色されています
            </Typography>
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
            setSlicesPhotos(photos.slice((page - 1) * SLICE_SIZE, (page - 1) * SLICE_SIZE + SLICE_SIZE))
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

      <Dialog
        open={openLabelsDlg}
        onClose={() => {
          setOpenLabelsDlg(false)
        }}>
        <DialogTitle>
          検出対象のゴミ種類({labels2.length}種)
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
            {
              labels2.map((label, i) => {
                return (
                  <Grid item margin={'auto'}>
                    <Typography
                      variant='h6'
                      color='white'
                      sx={{
                        backgroundColor: 'rgb(128, 128, 128)',
                        borderRadius: 3,
                        p: 1
                      }}>
                      {label}
                    </Typography>
                  </Grid>
                )
              })
            }
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setOpenLabelsDlg(false) }}>閉じる</Button>
        </DialogActions>

      </Dialog>

    </div >
  )
}

export default PhotosView