import React, { useRef } from 'react'

import { Dialog } from '@mui/material'
import { DialogTitle, DialogContent, DialogActions, } from '@mui/material'
import { Button } from '@mui/material'
import { DropzoneDialog, DropzoneArea } from 'react-mui-dropzone'

const FILES_LIMIT = 100 //number of photos
const MAX_FILE_SIZE = 100 //MB

const PhotoPostDialog = (props) => {
  const files = useRef([])

  const handleOnSend = () => {
    props.onSend(files.current)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}>
        <DialogTitle>写真の投稿</DialogTitle>

        <DialogContent>
          <DropzoneArea
            showFileNamesInPreview={false}
            showAlerts={false}
            filesLimit={FILES_LIMIT}
            maxFileSize={MAX_FILE_SIZE * 1000 * 1000}
            acceptedFiles={['image/jpeg']}
            dropzoneText={'ここをクリックして写真の投稿を始めてください．カメラの起動もできます．'}
            onChange={(_files) => {
              files.current = _files
            }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={props.onCancel} variant='outlined' color='primary'>キャンセル</Button>
          <Button onClick={handleOnSend} variant='outlined' color='primary'>送信</Button>
        </DialogActions>

      </Dialog>
    </div>
  )
}

export default PhotoPostDialog