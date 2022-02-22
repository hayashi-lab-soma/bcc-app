import React from 'react'
import { Box, ListItemText, ListSubheader, } from '@mui/material'
import { List, ListItemButton, ListItemIcon, } from '@mui/material'
import { Divider, } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import CameraIcon from '@mui/icons-material/Camera'
import SendIcon from '@mui/icons-material/Send'

import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const handleCameraOpen = () => {
    console.log('Clicked camera open')
  }

  return (

    <Box
      sx={{
        width: '100%',
        height: '100%',
        minWidth: 100,
        maxWidth: 200,
        textAlign: 'left',
        ml: '5px',
        mr: '5px',
      }}
    >

      <List>
        <SidebarItem
          title='Folder'
          icon={<FolderIcon />} />

        <SidebarItem
          title='Camera open'
          icon={<CameraIcon />}
          onClick={handleCameraOpen} />

      </List>

      <Divider />

      <List
        component='nav'
        aria-aria-labelledby='tools-subheader'
        subheader={
          <ListSubheader component="div" id='tools-subheader'>
            Tools
          </ListSubheader>
        }>

        <SidebarItem
          title='Camera open'
          icon={<CameraIcon />} />

        <SidebarItem
          title='None'
          icon={<SendIcon />} />

      </List>

      <Divider />

      <List
        component='nav'
        aria-aria-labelledby='tools-subheader'
        subheader={
          <ListSubheader component="div" id='tools-subheader'>
            Others
          </ListSubheader>
        }>

      </List>

      <Divider />

    </Box>

  )
}

export default Sidebar