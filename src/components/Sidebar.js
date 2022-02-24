import React from 'react'
import { Box, ListSubheader } from '@mui/material'
import { List, } from '@mui/material'
import { Divider, } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import CameraIcon from '@mui/icons-material/Camera'
import SendIcon from '@mui/icons-material/Send'

import SidebarItem from './SideBarItem'

const Sidebar = (props) => {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minWidth: 100,
          maxWidth: 200,
          minHeight: '500px',
          textAlign: 'left',
        }}
        p={'5px'}
      >

        <List>
          <SidebarItem
            title='Folder'
            icon={<FolderIcon />} />
        </List>

        <Divider />

        <List
          component='nav'
          aria-labelledby='tools-subheader'
          subheader={
            <ListSubheader component="div" id='tools-subheader'>
              Tools
            </ListSubheader>
          }>

          <SidebarItem
            title='Camera open'
            icon={<CameraIcon />}
            // onClick={() => { setCameraDialog(true) }}
            onClick={props.onClickCameraOpen}
          />

          <SidebarItem
            title='None'
            icon={<SendIcon />} />

        </List>

        <Divider />

        <List
          component='nav'
          aria-labelledby='tools-subheader'
          subheader={
            <ListSubheader component="div" id='tools-subheader'>
              Others
            </ListSubheader>
          }>

        </List>

        <Divider />

      </Box>

    </div>
  )
}

export default Sidebar