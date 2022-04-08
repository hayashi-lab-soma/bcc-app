import React, { useState } from 'react'

import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { Link } from 'react-router-dom'

const HeaderContents = (props) => {
  const [sw, setSwitch] = useState('Album')

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Photos
            </Typography>


            {/* <Link to='/'>Protected</Link> */}

            {/* <Link to='/public'>Public</Link> */}


            {
              sw === 'Album' &&
              < Button
                color={'inherit'}
                component={Link}
                to="/public"
                onClick={() => { setSwitch('Public') }}
              >
                検出結果を見る
              </Button>
            }

            {
              sw === 'Public' &&
              < Button
                color={'inherit'}
                component={Link}
                to="/"
                onClick={() => { setSwitch('Album') }}
              >
                マイフォルダへ
              </Button>
            }


            <Button color="inherit" onClick={props.onClick}>{props.username}</Button>

          </Toolbar>
        </AppBar>
      </Box>
    </div >
  )
}

export default HeaderContents