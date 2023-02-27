import React from 'react'

import { Drawer, } from '@mui/material'
import { Toolbar } from '@mui/material'

import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import HelpIcon from '@mui/icons-material/Help'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'

//==========
//  name: "AppDrawer"
//  role:
//  props:
//==========
const AppDrawer = (props) => {
  return (
    <div>
      <Drawer
        variant='temporary'
        open={props.open}
      >

        <Toolbar />

        <List>
          <ListItem key='home'>
            <Link to='/' onClick={props.onClose}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                Home
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem key='dashboard'>
            <Link to='/dashboard' onClick={props.onClose}>
              <ListItemButton>
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                Dashboard
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem key='help'>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              Help
            </ListItemButton>
          </ListItem>

          <ListItem key='settings'>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Settings
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </div>
  )
}

export default AppDrawer