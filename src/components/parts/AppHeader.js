import React from 'react'

import { AppBar, } from '@mui/material'
import { Toolbar, Typography, } from '@mui/material'
import { Button, IconButton, } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const AppHeader = (props) => {
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
            onClick={props.onClickMenu}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              flexGrow: 1
            }}>
            BCC漂着ゴミ検出ウェブサービス
          </Typography>

          <Button
            color='inherit'
            onClick={props.signOut}>
            {props.username}
          </Button>

        </Toolbar>

      </AppBar>
    </div>
  )
}

export default AppHeader