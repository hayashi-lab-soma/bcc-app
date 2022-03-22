import React from 'react'
import {Box} from '@mui/material'
import { AppBar, Button, Toolbar, IconButton } from '@mui/material'
import { Select, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const NemuBar = (props) => {
  return (
    <Box>
      <AppBar position='static' color='primary'>
        <Toolbar
          color='inherit'>

          <IconButton
            size='medium'
            color='inherit'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Button
            variant='text'
            color='inherit'
            onClick={props.onClick}>
            {props.username}
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NemuBar