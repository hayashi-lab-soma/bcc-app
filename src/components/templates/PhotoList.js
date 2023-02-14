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
          maxHeight: 490
        }}>
        {
          props.urls.map((url, idx) => {

            return (
              <Photo
                title={props.photos[idx].key}
                src={url}
                onFullScreen={() => {props.onFullScreen(idx)}} />
            )
          })
        }
      </ImageList>
    </div>
  )
}

export default PhotoList