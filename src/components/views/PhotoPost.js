import React, { useState } from 'react'

import { Fab, } from '@mui/material'

import { PhotoPostDialog } from '../templates'

import { Storage } from 'aws-amplify'

import AddIcon from '@mui/icons-material/Add'

const PhotoPost = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Fab
        size='large'
        color='primary'
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20
        }}
        onClick={() => {
          setOpen(true)
        }}>
        <AddIcon />
      </Fab>

      <PhotoPostDialog
        open={open}
        onClose={() => { setOpen(false) }}
        onCancel={() => { setOpen(false) }}
        onSend={(files) => {
          props.onSend(files)
          setOpen(false)
        }}
      />

    </div>
  )
}

export default PhotoPost