import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material'
const SideBarItem = (props) => {
  return (

    <ListItemButton
      sx={{
        width: '100%'
      }}
      onClick={props.onClick}
    >

      <ListItemIcon>
        {props.icon}
      </ListItemIcon>

      <ListItemText>
        {props.title}
      </ListItemText>

    </ListItemButton>
  )
}

export default SideBarItem
