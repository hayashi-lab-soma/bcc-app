import React from 'react'

import { Drawer, } from '@mui/material'
import { Toolbar } from '@mui/material'

import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import HelpIcon from '@mui/icons-material/Help'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'

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
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to='/'>Home</Link>
            </ListItemButton>
          </ListItem>

          <ListItem key='charts'>
            <ListItemButton>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <Link to='/charts'>Charts</Link>
            </ListItemButton>
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