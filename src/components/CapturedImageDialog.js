import React from 'react'
import { Box, Dialog, Button, } from '@mui/material'

const CapturedImageDialog = (props) => {
  return (
    <div>

      <Dialog
        open={props.open}
        onClose={props.onClose}
        p={'10px'}>

        <img src={props.srcImg} alt='Captured ...' />

        <Box
          sx={{
            display: 'flex'
          }}>

          <Button variant='contained' onClick={props.onClose}>Cancel</Button>
          <Button variant='contained' onClick={props.onSubmit}>Submit</Button>
          <Button variant='contained' onClick={props.onAnnotation}>Annotation</Button>

        </Box>

      </Dialog>
    </div>
  )
}

export default CapturedImageDialog