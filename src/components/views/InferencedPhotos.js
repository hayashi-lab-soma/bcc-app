import React, { useState, } from 'react'

import { PhotoList } from '../templates'
import { Box, Divider, Typography } from '@mui/material'
import { Dialog } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

import { Storage } from 'aws-amplify'

const InferencedPhotos = (props) => {

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
          <Typography variant='h6'>{`画像一覧（${props.photos.length}件）`}</Typography>
        </Divider>

        <Box
          sx={{
            mr: 5,
            ml: 5,
            mb: 5,
          }}>

          <PhotoList
            photos={props.photos}
            urls={props.urls}
            onFullScreen={async (idx) => {
              console.log(props.photos[idx].key)
              const _key = props.photos[idx].key.replace('thumb_', '')
              console.log(_key)

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