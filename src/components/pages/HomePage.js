
import React, { useEffect, } from 'react'

import { AppBase } from '../templates'
import { PhotoView, PhotoPost } from '../views'

//--------------------------------------------------
//  Component "HomePage"
//  role:
//    Show the photos (raw, inferenced and etc ...)
//--------------------------------------------------
const HomePage = (props) => {
  return (
    <div>
      <header>
        <AppBase
          username={props.username}
          signOut={props.signOut} />
      </header>

      <main>
        <PhotoPost />
        <PhotoView />
      </main>

    </div>
  )
}

export default HomePage