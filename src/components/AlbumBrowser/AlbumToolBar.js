import React, { useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'

const AlbumCreateForm = (props) => {
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

const AlbumToolBar = (props) => {

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{ mt: 1, mb: 1 }}
      display='flex'
      flexDirection='row'
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography>アルバム</Typography>
      </Box>

      <Button onClick={() => { setOpen(true) }}>作成</Button>

      <AlbumCreateForm
        open={open}
        onClose={handleClose}
        onCreate={props.onCreate} />

    </Box>
  )
}

export default AlbumToolBar;