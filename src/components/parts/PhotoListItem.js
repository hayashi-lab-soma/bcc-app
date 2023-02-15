import React from 'react'

import { Box } from '@mui/material'
import { ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { IconButton } from '@mui/material'
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
  return (
    <div>
      <ImageListItem>

        <Image
          objectFit={'cover'}
          height={props.height}
          src={props.src}
          alt={props.title} />

        <ImageListItemBar
          sx={{
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
          }}
          position='below'
          title={
            <Box
            sx={{
              ml: 1
            }}>
              <Typography
                variant='subtitle1'>
                {props.title}
              </Typography>
              <Typography
              variant='caption'>
                {props.date}
              </Typography>
            </Box>
          }
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