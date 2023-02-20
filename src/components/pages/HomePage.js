
import React, { useState, useEffect } from 'react'

import { AppBase } from '../templates'
import { InferencedPhotos, PhotoPost } from '../views'

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
          username={props.username} />
      </header>

      <main>
        <InferencedPhotos />
        <PhotoPost />
      </main>

    </div>
  )
}

export default HomePage