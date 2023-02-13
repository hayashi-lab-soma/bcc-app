import React, { } from 'react'

import { PhotoList } from '../templates'
import { Box, Divider, Typography } from '@mui/material'

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

          <PhotoList
            photos={props.photos} />

        </Box>

      </Box>

    </div >
  )
}

export default PhotosView