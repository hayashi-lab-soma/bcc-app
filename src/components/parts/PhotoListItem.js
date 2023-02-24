import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { IconButton, CircularProgress } from '@mui/material'
import { Image } from '@aws-amplify/ui-react'
import FullScreenIcon from '@mui/icons-material/Fullscreen'


//  --- parameters ---
//  key:    Unique key value for each item
//  title:  Title of image
//  src:    Source of image, e.g. URL
//  height: Item height
//  
//  --- callback functions ---
//  onFullScreen():   Called by click "FullScreenIcon" button.
const PhotoListItem = (props) => {
  const [isLoding, setLoding] = useState(false)

  useEffect(() => {
    setLoding(props.isLoding)
  }, [props.isLoding])

  return (
    <div>
      <ImageListItem
        sx={{
          height: '100% !important'
        }}>

        {
          !isLoding ?
            <Image
              objectFit={'contain'}
              height={props.height}
              src={props.src}
              alt={props.title}
              backgroundColor={'rgba(0, 0, 0, 0.01)'}
              loading='lazy' />
            :
            <CircularProgress />
        }

        <ImageListItemBar
          sx={{
            pl: 1,
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
          }}
          position='below'
          title={props.title}
          subtitle={`${props.date}`}
          actionIcon={
            <IconButton
              size='large'
              onClick={props.onFullScreen}>
              <FullScreenIcon />
            </IconButton>
          } />

      </ImageListItem>
    </div>
  )
}

export default PhotoListItem