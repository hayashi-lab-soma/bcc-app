import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material'

const FolderCreateDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
      >

        <Box
          p={'10px'}>
          <DialogTitle>新しいフォルダ</DialogTitle>

          <TextField
            inputRef={props.inputRef} />

          <DialogActions>
            <Button variant='text' size='small' onClick={props.onClose}>キャンセル</Button>
            <Button variant='text' size='small' onClick={props.onCreate}>作成</Button>
          </DialogActions>

        </Box>

      </Dialog>
    </div>
  );
}

export default FolderCreateDialog