
import React, { useState, useEffect } from 'react'

import { AppBase } from '../templates'
import { InferencedPhotos, PhotoPost } from '../views'

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