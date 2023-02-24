import React from 'react'

import { PhotoListItem } from '../parts'
import { Box, Typography, Divider, ImageList } from '@mui/material'

const PhotoList = (props) => {
  const LIST_COLS = 2
  const LIST_MAX_HEIGHT = 100
  const ITEM_HEIGHT = 200
  const ITEM_GAP = 12

  return (
    <div>

      <Divider
        textAlign='left'
        sx={{
          m: 2
        }}>
        <Typography variant='h6'>{`検出結果一覧（${props.photos.length}件）`}</Typography>
      </Divider>

      <ImageList
        gap={ITEM_GAP}
        // cols={LIST_COLS}
        sx={{
          m: 3,
          maxHeight: '500px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}>

        {
          props.urls.map((url, idx) => {
            return (
              <PhotoListItem
                key={idx}
                title={props.photos[idx].title}
                date={props.photos[idx].date.toLocaleString()}
                isLoding={props.photos[idx].isLoding}
                src={url}
                height={ITEM_HEIGHT}
                onFullScreen={() => { props.onFullScreen(idx) }} />
            )
          })
        }

      </ImageList>

    </div >
  )
}

export default PhotoList