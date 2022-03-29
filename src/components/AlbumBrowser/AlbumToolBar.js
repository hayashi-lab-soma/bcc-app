import React, { useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'



const AlbumToolBar = (props) => {
  return (
    <Box
      sx={{ mt: 1, mb: 1, ml: 2 }}
      display='flex'
      flexDirection='row'
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography>アルバム</Typography>
      </Box>

      <Button onClick={props.onCreateAlbum}>作成</Button>
    </Box>
  )
}

export default AlbumToolBar;