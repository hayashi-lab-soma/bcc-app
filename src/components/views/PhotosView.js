import React, { useEffect, useState } from 'react'

import { ImageList, ImageListItem, } from '@mui/material'
import { Box, Divider, Typography } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

const PhotosView = (props) => {

  return (
    <div>

      <Box
        sx={{
          mt: 2
        }}>

        <Box
          sx={{
            // ml: 3
          }}>

          <Divider
            textAlign='left'
            sx={{}}>
            <Typography variant='h6'>{`画像一覧（${props.photos.length}件）`}</Typography>
          </Divider>

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
                  <ImageListItem
                    key={idx}>

                    <Image
                      objectFit={'contain'}
                      height={240}
                      src={photo}
                      alt={'posted'} />

                  </ImageListItem>
                )
              })
            }
          </ImageList>
        </Box>

      </Box>

    </div >
  )
}

export default PhotosView