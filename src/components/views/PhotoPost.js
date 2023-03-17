import React, { useState } from 'react'

import { PhotoPostDialog, PhotoPostedDialog } from '../templates'
import { Storage } from 'aws-amplify'
import { Fab, } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuidv4 } from 'uuid'

const PhotoPost = (props) => {
  // const files = useRef([])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [isProgress, setProgress] = useState(false)
  const [progressValue, setProgressValue] = useState(0)

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
          setProgress(true)
          setProgressValue(0)
          setOpen(false)
          setOpen2(true)

          const percent = 100.0 / files.length

          // await Promise.all(files.map(async (file) => {
          //   const fname = file.name.split('.').shift()
          //   const key = `'${fname}'${uuidv4()}.jpg`
          //   try {
          //     const ret = await Storage.put(key, file, { level: 'private' })
          //     setProgressValue(progressValue + percent)
          //   }
          //   catch (e) {
          //     console.error(e)
          //   }
          // }))


          for(const file of files){
            const fname = file.name.split('.').shift()
            const key = `'${fname}'${uuidv4()}.jpg`

            try {
              const ret = await Storage.put(key, file, { level: 'private' })
            }
            catch (e) {
              console.error(e)
            }

            setProgressValue((prevProg) => prevProg + percent)              
          }

          setProgress(false)
          setProgressValue(0)
        }}
      />

      <PhotoPostedDialog
        open={open2}
        isProgress={isProgress}
        progressValue={progressValue}
        onClose={() => { setOpen2(false) }} />

    </div>
  )
}

export default PhotoPost