import React, { useRef } from 'react'
import { Grid, Box, Dialog, DialogContent, DialogActions, IconButton, } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CameraIcon from '@mui/icons-material/Camera'
import Webcam from 'react-webcam'

const CameraDialog = (props) => {

  const refWebcam = useRef(null)

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        sx={{
          width: '100%',
        }}
        p={'10px'}>

        {/* <DialogContent> */}

        <Webcam
          ref={refWebcam}
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize={true}
          videoConstraints={{facingMode: 'environment'}} />

        {/* <input type='file' accept='image/*' capture='camera'></input> */}
        {/* </DialogContent> */}

        <Box
          display='flex'
          justifyContent='space-around'>

          <IconButton
            onClick={() => { props.onShoot(refWebcam.current.getScreenshot()) }}
            p={'10px'}
            size='large'>
            <CameraIcon fontSize='inherit' />
          </IconButton>

        </Box>

      </Dialog>
    </div>
  )
}

export default CameraDialog