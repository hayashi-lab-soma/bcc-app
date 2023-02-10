import React, { useState } from 'react'

import { Button, TextField } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { DropzoneArea } from 'material-ui-dropzone'

import { Select, InputLabel, MenuItem, FormControl, } from '@material-ui/core'

const UPLOAD_SIZE_LIMIT = 100 //(MB)
const UPLOAD_FILE_LIMIT = 300 //number of images

const ImageCreateDialog = (props) => {
  const [files, setFiles] = useState([])

  const [albumId, setAlbumId] = useState('non')
  const handleChange = (event) => {
    setAlbumId(event.target.value)
  }

  return (
    <Dialog
      open={props.open} onClose={props.onClose}
      sx={{ minWidth: '300px' }}
      fullWidth>

      <DialogTitle>ファイルアップロード</DialogTitle>

      <DialogContent>
        <DropzoneArea
          maxFileSize={UPLOAD_SIZE_LIMIT * 1000 * 1000}
          filesLimit={UPLOAD_FILE_LIMIT}
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

        {/* <FormControl fullWidth>
          <InputLabel>アルバム</InputLabel>
          <Select
            defaultValue={""}
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
        </FormControl> */}

        <FormControl fullWidth>
          <TextField
            select
            label={'アルバム'}
            value={albumId}
            onChange={handleChange}
            SelectProps={{ native: true }}>
            <option
              key={'non'}
              value={'non'}>
              未分類
            </option>
            {
              props.albums.map(album => (
                (
                  (album.id !== 'all' && album.id !== 'non') &&
                  <option
                    key={album.id}
                    value={album.id}>
                    {album.name}
                  </option>
                )
              ))
            }
          </TextField>
        </FormControl>


        <Button onClick={props.onClose} fullWidth>キャンセル</Button>

        <Button onClick={() => { props.onCreate(files, albumId) }} fullWidth>送信</Button>

      </DialogActions>
    </Dialog>
  )
}

export default ImageCreateDialog;