import React from 'react'

import { ImageListItem, ImageListItemBar } from '@mui/material'
import { IconButton } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

import MenuIcon from '@mui/icons-material/Menu'

const Photo = (props) => {
  return (
    <div>
      <ImageListItem
        key={props.key}>

        <Image
          objectFit={'contain'}
          height={240}
          src={props.photo}
          alt={'posted'} />

        <ImageListItemBar
          title={'TITLE'}
          actionIcon={
            <IconButton>
              <MenuIcon
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            </IconButton>
          } />

      </ImageListItem>
    </div>
  )
}

export default Photo