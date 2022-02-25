import React from 'react'
import { Box, Grid, Dialog, Button, DialogContent, DialogTitle, DialogActions } from '@mui/material'

const CapturedImageDialog = (props) => {
  return (
    <div>

      <Dialog
        open={props.open}
        onClose={props.onClose}
        sx={{ width: '100%' }}
      >
        {/* <DialogTitle >Captured image</DialogTitle> */}

        <DialogContent style={{ objectFit: 'contain' }}>
          <img src={props.srcImg} alt='Captured ...' />
        </DialogContent>

        <DialogActions>
          <Button variant='contained' onClick={props.onClose}>Cancel</Button>
          <Button variant='contained' onClick={props.onSubmit}>Submit</Button>
          <Button variant='contained' onClick={props.onAnnotation}>Annotation</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CapturedImageDialog