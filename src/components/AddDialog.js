import React from 'react'
import { Box, Grid, Stack, } from '@mui/material'
import { Dialog, IconButton, DialogContent, DialogActions, } from '@mui/material'

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

        <DialogContent>

          <Grid container
            spacing={12}>

            <Grid item>
              <Stack justifyContent={'center'}>
                <IconButton >
                  <FolderIcon fontSize='large' />
                </IconButton>
                <label>フォルダ作成</label>
              </Stack>
            </Grid>

            <Grid item>
              <Stack justifyContent={'center'}>
                <IconButton>
                  <UploadIcon fontSize='large' />
                </IconButton>
                <label>アップロード</label>
              </Stack>
            </Grid>

            <Grid item>
              <Stack justifyContent={'center'}>
                <IconButton>
                  <CameraAltIcon fontSize='large' />
                </IconButton>
                <label>撮影</label>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>

      </Dialog>
    </div >
  )
}

export default AddDialog