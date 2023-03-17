import React from 'react'

import { CircularProgress, } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material'
import { Button, Typography, Box } from '@mui/material'

const PhotoPostedDialog = (props) => {
  return (
    <div>
      {
        props.isProgress ?
          <Dialog
            open={props.open}>
            <DialogContent>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant='determinate' value={props.progressValue} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.progressValue)}%`}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
          :
          <Dialog
            open={props.open}
            onClose={props.onClose}>
            <DialogContent>

              <DialogTitle>
                画像の送信が完了しました．
              </DialogTitle>
              <DialogActions>
                <Button variant='contained' onClick={props.onClose}>OK</Button>
              </DialogActions>

            </DialogContent>
          </Dialog>
      }


    </div>
  )
}

export default PhotoPostedDialog