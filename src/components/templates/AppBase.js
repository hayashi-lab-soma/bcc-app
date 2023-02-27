import React, { useState } from 'react'

import { AppHeader, AppDrawer } from '../parts'
import { Toolbar } from '@mui/material'

//==========
//  name: "AppBase"
//  role: Rendering header and drawer for navigation. This is based on each page.
//  props:
//    username: Username strings
//    signOut: Event handler for sign-out function
//==========
const AppBase = ({ username, signOut }) => {

  const [drawer, setDrawer] = useState(false)

  return (
    <div>
      <AppHeader
        appTitle={'BCCloud 漂着ゴミ検出サービス'}
        username={username}
        onClickUser={() => {
          signOut()
        }}
        onClickMenu={() => {
          !drawer ? setDrawer(true) : setDrawer(false)
        }} />

      <AppDrawer
        open={drawer}
        onClose={() => setDrawer(false)} />

      <Toolbar />
    </div>
  )
}

export default AppBase