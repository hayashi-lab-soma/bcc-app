import React from 'react'
import { Box, DialogTitle, Grid, Stack, } from '@mui/material'
import { Dialog, DialogContent, DialogActions, } from '@mui/material'
import { VStackIconButton } from './common'

import FolderIcon from '@mui/icons-material/Folder'
import UploadIcon from '@mui/icons-material/Upload'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

const AddDialog = (props) => {
  return (
    <div>

      <Dialog
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle></DialogTitle>

        <DialogContent
        sx={{
          mt: 1,
          mb: 1,
          mr: 3,
          ml: 3,
        }}>

          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            spacing={10}>

            <VStackIconButton
              title='フォルダ作成'
              icon={<FolderIcon fontSize='large' />}
              onClick={props.onClickFolder}
            />

            <VStackIconButton
              title='アップロード'
              icon={<UploadIcon fontSize='large' />}
              onClick={props.onClickUpload}
            />

            <VStackIconButton
              title='撮影'
              icon={<CameraAltIcon fontSize='large' />}
              onClick={props.onClickCamera}
            />

          </Stack>

        </DialogContent>

      </Dialog>
    </div >
  )
}

export default AddDialog