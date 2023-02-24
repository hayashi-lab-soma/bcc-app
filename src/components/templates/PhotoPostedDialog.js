import React from 'react'

import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material'
import { Button } from '@mui/material'

const PhotoPostedDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}>
        <DialogContent>

          {
            props.isProgress ?
              <CircularProgress />
              :
              <div>
                <DialogTitle>
                  画像の送信が完了しました．
                </DialogTitle>
                <DialogActions>
                  <Button variant='contained' onClick={props.onClose}>OK</Button>
                </DialogActions>
              </div>
          }


        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PhotoPostedDialog