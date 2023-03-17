
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
      <main>
        <PhotoView />
        <PhotoPost />
      </main>
    </div>
  )
}

export default HomePage