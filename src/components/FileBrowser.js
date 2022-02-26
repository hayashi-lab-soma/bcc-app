import React from 'react'
import { ChonkyActions, setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
// import { FullFileBrowser } from 'chonky'
import { FileBrowser,FileList, FileContextMenu, FileToolbar, FileNavbar } from 'chonky'
import { Box, } from '@mui/material'

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const S3Browser = (props) => {
  return (

    <div
      style={{
        height: '500px'
      }}
    >

      {/* <FullFileBrowser
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
      /> */}

      <FileBrowser
        files={props.files}
        folderChain={props.folderChain}
        onFileAction={props.onFileAction}
        fileActions={
          [
            ChonkyActions.OpenFiles,
            ChonkyActions.UploadFiles,
            ChonkyActions.DownloadFiles,
            ChonkyActions.CreateFolder,
            ChonkyActions.DeleteFiles
          ]
        }>

        <FileNavbar />
        <FileContextMenu />
        <FileList />
      </FileBrowser>

    </div>
  )
}

export default S3Browser;