import React from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'

const FileUploadDialog = (props) => {
  return (
    <DropzoneDialog
      showPreviews={true}
      maxFileSize={5000000000}
      filesLimit={100}
      open={props.open}
      onClose={props.onClose}
      onSave={props.onSave}
    />
  )
}

export default FileUploadDialog