import React from 'react'

import ImageToolBar from './ImageToolBar'

const ImageBrowser = (props) => {
  return (
    <div>
      <ImageToolBar
        album={props.album}
        images={props.images} />

        
    </div>
  )
}

export default ImageBrowser