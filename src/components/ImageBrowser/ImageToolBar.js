import React, { useState, useEffect } from 'react'

import { Storage } from 'aws-amplify'

import { Box, Typography, Button } from '@mui/material'
import { DropzoneDialog } from 'material-ui-dropzone'

const ImageToolBar = (props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = async (file) => {
    try {
      const result = await Storage.put(
        file.name,
        file,
        {
          level: "protected",
        }
      )
    }
    catch (err) {
      console.err({ err })
    }
  }

  const handleCreateMulti = (files) => {
    files.map((file, idx) => {
      handleCreate(file)
    })
  }

  return (
    <Box
      sx={{ mt: 1, mb: 1 }}
      display='flex'
      flexDirection='row'>

      <Box sx={{ mt: 1, mb: 3, flexGrow: 1 }}>
        <Typography>
          {props.album !== null
            ? props.album.name === 'all'
              ? '全て'
              : props.album.name === 'nonalbum' ? '未分類' : `「${props.album.name}」`
            : ''}
          {`（${props.images.length}件）`}
        </Typography>
      </Box>

      <Button onClick={() => { setOpen(true) }}>追加</Button>

      <DropzoneDialog
        open={open}
        onClose={handleClose}
        filesLimit={100}
        maxFileSize={20000000}
        useChipsForPreview={false}
        dialogTitle={'ファイルアップロード'}
        dropzoneText={'ファイル選択'}
        cancelButtonText={'キャンセル'}
        submitButtonText={'送信'}
        onSave={(files) => {
          console.log(files) 
          // handleCreate(files[0])
          handleCreateMulti(files)
        }}
      />

    </Box>
  )
}

export default ImageToolBar