import React from 'react'
import { AppBar, Button, Toolbar } from '@mui/material'

const Appbar = (props) => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' onClick={props.onClick}>{props.username}</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Appbar