import React from 'react'
import { Dialog, DialogTitle } from '@mui/material'

const FolderCreateDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}>
          <DialogTitle>Create Folder</DialogTitle>
      </Dialog>
    </div>
  );
}

export default FolderCreateDialog