import React, { } from 'react'

import { PhotoListItem } from '../parts'
import { ImageList } from '@mui/material'

const PhotoList = (props) => {
  const ITEM_HEIGHT = 200
  const ITEM_GAP = 12

  return (
    <div>


      <ImageList
        gap={ITEM_GAP}
        sx={{
          m: 3,
          maxHeight: 600,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}>

        {
          props.photos.map((photo, idx) => {

            return (
              <PhotoListItem
                key={idx}
                title={photo.title}
                date={photo.date.toLocaleString()}
                size={photo.size}
                src={props.urls[idx]}
                height={ITEM_HEIGHT}
                onFullScreen={() => { props.onFullScreen(photo) }}
              />
            )
          })
        }

      </ImageList>

    </div >
  )
}

export default PhotoList