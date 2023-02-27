import React from 'react'

import { AppBar, } from '@mui/material'
import { Toolbar, Typography, } from '@mui/material'
import { Button, IconButton, } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

//==========
//  name: "AppHeader"
//  role: Reandering Appbar.
//  props:
//    appTitle: Application title (string type).
//    username: User name of current signed-in user.
//    onClickMenu: Event handler for clicked menu button.
//    onClickUser: Event handler for clicked user button.
//==========
const AppHeader = ({ appTitle, username, onClickUser, onClickMenu }) => {
  return (
    <div>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}>

        <Toolbar>

          <IconButton
            size='large'
            color='inherit'
            sx={{
              mr: 2
            }}
            onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              flexGrow: 1
            }}>
            {appTitle}
          </Typography>

          <Button
            color='inherit'
            onClick={onClickUser}>
            {username}
          </Button>

        </Toolbar>

      </AppBar>
    </div>
  )
}

export default AppHeader