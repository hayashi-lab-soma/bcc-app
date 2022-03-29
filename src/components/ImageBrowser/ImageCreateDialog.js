import React, { useState } from 'react'

import { Select, MenuItem, FormControl, Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { DropzoneArea } from 'material-ui-dropzone'

const ImageCreateDialog = (props) => {
  const [files, setFiles] = useState([])

  const [albumId, setAlbumId] = useState(null)
  const handleChange = (event) => {
    setAlbumId(event.target.value)
  }

  return (
    <Dialog
      open={props.open} onClose={props.onClose}
      sx={{minWidth:'300px'}}
      fullWidth>

      <DialogTitle>ファイルアップロード</DialogTitle>

      <DialogContent>
        <DropzoneArea
          maxFileSize={10000000}
          filesLimit={100}
          dropzoneText={'ファイル選択'}
          showPreviews={true}
          showPreviewsInDropzone={false}
          showAlerts={false}
          onChange={(files) => {
            setFiles(files)
          }}
        />
      </DialogContent>

      <DialogActions>
        <FormControl fullWidth>
          <Select
            onChange={handleChange}>
            <MenuItem
              value={'new'}>
              新規作成
            </MenuItem>
            {
              props.albums.map(album => (
                (
                  (album.id !== 'all' && album.id !== 'non') &&
                  <MenuItem
                    key={album.id}
                    value={album.id}>
                    {album.name}
                  </MenuItem>
                )
              ))
            }
          </Select>
        </FormControl>

        <Button onClick={props.onClose} fullWidth>キャンセル</Button>

        <Button onClick={() => { props.onCreate(files, albumId) }} fullWidth>送信</Button>

      </DialogActions>
    </Dialog>
  )
}

export default ImageCreateDialog;