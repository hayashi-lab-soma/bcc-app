import React from 'react'

import { PhotoListItem } from '../parts'
import { ImageList } from '@mui/material'

const PhotoList = (props) => {
  const LIST_COLS = 3
  const LIST_MAX_HEIGHT = 500
  const ITEM_HEIGHT = 200
  const ITEM_GAP = 10

  return (
    <div>
      <ImageList
        gap={ITEM_GAP}
        cols={LIST_COLS}
        sx={{
          maxHeight: LIST_MAX_HEIGHT
        }}>

        {props.urls.map((url, idx) => {
          return (
            <PhotoListItem
              key={idx}
              title={props.photos[idx].title}
              date={props.photos[idx].date.toLocaleString()}
              src={url}
              height={ITEM_HEIGHT}
              onFullScreen={() => { props.onFullScreen(idx) }} />
          )
        })}

      </ImageList>
    </div >
  )
}

export default PhotoList