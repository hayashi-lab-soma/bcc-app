import React from 'react'
import { ChonkyActions, setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { FullFileBrowser } from 'chonky'
import { Box, } from '@mui/material'

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const FileBrowser = (props) => {
  return (

    <div
      style={{
        height: 500
      }}
    >

      <FullFileBrowser
        files={props.files}
        folderChain={props.folderChain}
        onFileAction={props.handleFileAction}
        fileActions={
          [
            ChonkyActions.OpenFiles,
            ChonkyActions.UploadFiles,
            ChonkyActions.DownloadFiles,
            ChonkyActions.CreateFolder,
            ChonkyActions.DeleteFiles
          ]
        }
      />
    </div>
  )
}

export default FileBrowser;