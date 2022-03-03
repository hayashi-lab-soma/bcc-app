import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

const FolderCreateDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
      >

        <DialogTitle>新しいフォルダ</DialogTitle>

        <DialogContent>
          <TextField
            inputRef={props.inputRef} />

          <DialogActions>
            <Button variant='text' size='small' onClick={props.onClose}>キャンセル</Button>
            <Button variant='text' size='small' onClick={props.onCreate}>作成</Button>
          </DialogActions>
          
        </DialogContent>



      </Dialog>
    </div>
  );
}

export default FolderCreateDialog