import React from 'react'

import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material'
import { Button } from '@mui/material'

const PhotoPostedDialog = (props) => {
  return (
    <div>
      {
        props.isProgress ?
          <Dialog
            open={props.open}>
            <DialogContent>
              <CircularProgress />
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