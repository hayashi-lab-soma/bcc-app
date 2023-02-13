import React from 'react'

import { Photo } from '../parts'

import { ImageList } from '@mui/material'

const PhotoList = (props) => {
  return (
    <div>
      <ImageList
        gap={8}
        cols={3}
        sx={{
          width: '80%',
          maxHeight: 600
        }}>
        {
          props.photos.map((photo, idx) => {
            return (
              <Photo
                key={idx}
                photo={photo} />
            )
          })
        }
      </ImageList>
    </div>
  )
}

export default PhotoList