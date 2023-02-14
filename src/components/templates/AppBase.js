import React, { useState } from 'react'

import AppHeader from './AppHeader'
import AppDrawer from './AppDrawer'

import { Toolbar } from '@mui/material'

const AppBase = (props) => {

  const [drawer, setDrawer] = useState(false)

  return (
    <div>
      <AppHeader
        username={props.username}
        onClickMenu={() => {
          !drawer ? setDrawer(true) : setDrawer(false)
        }} />

      <AppDrawer
        open={drawer} />

      <Toolbar />
    </div>
  )
}

export default AppBase