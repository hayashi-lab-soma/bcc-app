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
          <DialogTitle>New Folder</DialogTitle>

          <TextField
            inputRef={props.inputRef} />

          <DialogActions>
            <Button variant='text' size='small' onClick={props.onClose}>Cancel</Button>
            <Button variant='text' size='small' onClick={props.onCreate}>Create</Button>
          </DialogActions>

        </Box>

      </Dialog>
    </div>
  );
}

export default FolderCreateDialog