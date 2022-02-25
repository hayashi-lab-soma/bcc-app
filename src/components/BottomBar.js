import React from 'react'
import { Box, Grid } from '@mui/material'
import { AppBar, IconButton, Toolbar, } from '@mui/material'

// Icons
import HomeIcon from '@mui/icons-material/Home'
import FolderIcon from '@mui/icons-material/Folder'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

const BottomBar = (props) => {
  return (
    <div>
      <AppBar
        position='fixed'
        color='primary'
        sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent='space-around'>

              <IconButton
                size='large'>
                <HomeIcon fontSize='inherit' />
              </IconButton>

              <IconButton
                size='large'>
                <FolderIcon fontSize='inherit' />
              </IconButton>

              <IconButton
                size='large'
                onClick={props.onClickCameraOpen}>
                <CameraAltIcon fontSize='inherit' />
              </IconButton>

            </Grid>
          </Box>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default BottomBar