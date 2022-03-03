import React from 'react'
import { Stack, IconButton, } from '@mui/material'

const VStackIconButton = (props) => {
  return (

    <Stack
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}>

      <IconButton
        onClick={props.onClick}>{props.icon}</IconButton>

      {
        props.title &&
        <div>{props.title}</div>
      }


    </Stack>

  )
}

export default VStackIconButton