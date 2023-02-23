import React, { useState, useRef } from 'react'

import { Box, Fab, } from '@mui/material'
import { DropzoneArea } from 'react-mui-dropzone'

import { PhotoPostDialog, PhotoPostedDialog } from '../templates'

import { Storage } from 'aws-amplify'


import AddIcon from '@mui/icons-material/Add'


const PhotoPost = (props) => {
  // const files = useRef([])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <div>

      {/* <Box
        sx={{
          p: 3,
          pl: 10,
          pr: 10
        }}>
        <DropzoneArea
          filesLimit={FILES_LIMIT}
          maxFileSize={MAX_FILE_SIZE * 1000 * 1000}
          acceptedFiles={['image/jpeg']}
          dropzoneText={'ここをクリックして写真の投稿を始めてください．カメラの起動もできます．'}
          onChange={(_files) => {
            files.current = _files
          }} />
      </Box> */}

      <Fab
        size='large'
        color='primary'
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20
        }}
        onClick={() => {
          setOpen(true)
        }}>
        <AddIcon />
      </Fab>

      <PhotoPostDialog
        open={open}
        onClose={() => { setOpen(false) }}
        onCancel={() => { setOpen(false) }}
        onSend={async (files) => {

          // props.onSend(files)
          await Promise.all(files.map(async (file) => {
            const fname = file.name.split('.').shift() //get file name without explanation
            const type = file.name.split('.').pop()
            const date = new Date()
            const key = `${fname}_${date.getTime()}.${type}` //key (file object name) is fname + UTC + .jpg
            try {
              const ret = await Storage.put(key, file, { level: 'private' })
              console.log(ret)
            }
            catch (e) {
              console.error(e)
            }

          }))
          setOpen2(true)
          setOpen(false)
        }}
      />

      <PhotoPostedDialog
        open={open2}
        onClose={() => { setOpen2(false) }} />

    </div>
  )
}

export default PhotoPost