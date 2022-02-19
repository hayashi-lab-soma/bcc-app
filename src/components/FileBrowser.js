import React from 'react'
import { ChonkyActions, setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { FullFileBrowser } from 'chonky'

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const FileBrowser = (props) => {
  return (
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
  )
}

export default FileBrowser;