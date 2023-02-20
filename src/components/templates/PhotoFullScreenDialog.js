import React from 'react'

import { Box } from '@mui/material'
import { Dialog, DialogContent } from '@mui/material'
import { CircularProgress } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

const PhotoFullScreenDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}>

      <DialogContent>
        {
          !props.isLoding ?
            <Image
              src={props.url}
              alt={'full screen'}
              loading='lazy'
            /> :
            <Box
              sx={{
                display: 'flex',
              }}>
              <CircularProgress />
            </Box>
        }

      </DialogContent>

    </Dialog>
  )
}

export default PhotoFullScreenDialog