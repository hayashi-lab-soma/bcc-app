import React from 'react'

import { AppBar, Menu, } from '@mui/material'
import { Toolbar, Typography, } from '@mui/material'
import { Button, IconButton, } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const AppHeader = (props) => {
  return (
    <div>
      <AppBar>

        <Toolbar>

          <IconButton
            size='large'
            color='inherit'
            sx={{
              mr: 2
            }}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              flexGrow: 1
            }}>
            ビーチクリーンWebサービス 漂着ゴミ検出AI
          </Typography>


          <IconButton
            size='large'
            color='inherit'>
            <AccountCircleIcon />
          </IconButton>

        </Toolbar>

      </AppBar>
    </div>
  )
}

export default AppHeader