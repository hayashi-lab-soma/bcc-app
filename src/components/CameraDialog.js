import React, {useRef} from 'react'
import { Dialog, IconButton, } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
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
          minWidth: '640px'
        }}
        p={'10px'}>

        <Webcam
          ref={refWebcam}
          //width={1280}
          //height={720}
          screenshotFormat="image/jpeg" />

          {/* <input type='file' accept='image/*' capture='camera'></input> */}

        <IconButton
          onClick={() => {props.onShoot(refWebcam.current.getScreenshot())}}
          p={'10px'}>
          <CameraAltIcon fontSize='large'/>
        </IconButton>

      </Dialog>
    </div>
  )
}

export default CameraDialog