import React from 'react'

import { ImageListItem, ImageListItemBar } from '@mui/material'
import { IconButton } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

import MenuIcon from '@mui/icons-material/Menu'
import FullScreenIcon from '@mui/icons-material/Fullscreen'

const Photo = (props) => {
  return (
    <div>
      <ImageListItem>
        <Image
          objectFit={'cover'}
          height={200}
          src={props.src}
          alt={'posted'} />

        <ImageListItemBar
          title={props.title}
          actionIcon={
            <IconButton
              onClick={props.onFullScreen}>
              <FullScreenIcon
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            </IconButton>
          } />

      </ImageListItem>
    </div>
  )
}

export default Photo