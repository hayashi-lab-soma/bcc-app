import React from 'react'

import { Box, Button, Fab } from '@mui/material'
import { Dialog, DialogContent, DialogActions } from '@mui/material'
import { CircularProgress } from '@mui/material'

import { Image } from '@aws-amplify/ui-react'

import CloseIcon from '@mui/icons-material/Close'

const PhotoFullScreenDialog = (props) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}>

        <DialogContent>
          {
            !props.isLoding ?
              <Image
                src={props.url}
                alt={'...'}
                loading='lazy'
              /> :
              <Box>
                <CircularProgress />
              </Box>
          }

        </DialogContent>

        {/* <DialogActions>
          <Button variant='contained' onClick={props.onClose}>閉じる</Button>
        </DialogActions> */}


        <Fab
          // color='primary'
          sx={{
            position: 'fixed',
            top: 40,
            right: 30
          }}
          onClick={props.onClose}>
          <CloseIcon />
        </Fab>

      </Dialog>

    </div>
  )
}

export default PhotoFullScreenDialog