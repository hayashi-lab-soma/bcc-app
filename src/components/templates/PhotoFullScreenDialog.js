import React, { useState } from 'react'

import { AppBar, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import { Box, Button, Fab } from '@mui/material'
import { Dialog, DialogContent, DialogActions } from '@mui/material'
import { CircularProgress } from '@mui/material'

import { Image, } from '@aws-amplify/ui-react'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw'
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw'
import { Transform } from '@mui/icons-material'

const PhotoFullScreenDialog = (props) => {

  const [showRawPhoto, setShowRawPhoto] = useState(true)

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
      >

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,1.0)'
          }}>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: 'rgba(255, 255, 255, 1.0)',
              backgroundColor: 'rgba(0,0,0,1.0)'
            }}>

            <IconButton
              color='inherit'
              onClick={props.onClose}>
              <ArrowBackIcon />
            </IconButton>

            <Typography
              variant='h6'
              sx={{
                display: 'flex',
                flexGrow: 1,
                ml: 3
              }}>
              {props.title}
            </Typography>


            {
              showRawPhoto ?
                <IconButton
                  color='inherit'
                  size='large'
                  onClick={() => { setShowRawPhoto(false) }}>
                  <Rotate90DegreesCcwIcon />
                </IconButton>
                :
                <IconButton
                  color='inherit'
                  size='large'
                  onClick={() => { setShowRawPhoto(true) }}>
                  <Rotate90DegreesCwIcon />
                </IconButton>
            }

          </Box>


          <TransformWrapper
            initialScale={1}>
            <TransformComponent>
              {
                showRawPhoto ?
                  <Image
                    objectFit={'contain'}
                    objectPosition={'50% 50%'}
                    src={props.rawPhotoSrc}
                    alt={'...'}
                    loading='lazy'
                    height={'100%'}
                  />
                  :
                  <Image
                    objectFit={'contain'}
                    objectPosition={'50% 50%'}
                    src={props.inputPhotoSrc}
                    alt={'...'}
                    loading='lazy'
                    height={'100%'}
                  />
              }
            </TransformComponent>
          </TransformWrapper>




        </DialogContent>

        {/* <DialogActions>
          <Button variant='contained' onClick={props.onClose}>閉じる</Button>
        </DialogActions> */}

        {/* <Fab
          // color='primary'
          sx={{
            position: 'fixed',
            top: 40,
            right: 30
          }}
          onClick={props.onClose}>
          <CloseIcon />
        </Fab> */}

      </Dialog>

    </div>
  )
}

export default PhotoFullScreenDialog