import React, { useRef } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material'
import { Button, TextField } from '@mui/material'

const AlbumCreateDialog = (props) => {

  const albumName = useRef('')

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}>

      <DialogTitle>アルバム名</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id="name"
          label="アルバム名"
          fullWidth
          variant='standard'
          inputRef={albumName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>キャンセル</Button>

        <Button
          onClick={() => { props.onCreate(albumName.current.value) }}>
          作成
        </Button>

      </DialogActions>
    </Dialog>
  )
}

export default AlbumCreateDialog