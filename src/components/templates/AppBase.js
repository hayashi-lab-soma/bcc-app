import React, { useState } from 'react'

import { AppHeader, AppDrawer} from '../parts'
import { Toolbar } from '@mui/material'

const AppBase = (props) => {

  const [drawer, setDrawer] = useState(false)

  return (
    <div>
      <AppHeader
        username={props.username}
        signOut={props.signOut}
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