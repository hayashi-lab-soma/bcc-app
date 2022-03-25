import React, { useState, useEffect, useRef } from 'react'

import AlbumBrowser from './AlbumBrowser/AlbumBrowser'
import ImageBrowser from './ImageBrowser/ImageBrowser'

import { Box, Divider, Typography, Button, TextField } from '@mui/material'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listImages, } from '../graphql/queries'

const THUMBNAIL_BUCKET = "bcc-app-storage-thumbs"
const THUMBNAIL_URL = `https://${THUMBNAIL_BUCKET}.s3.ap-northeast-1.amazonaws.com/protected/`

const BodyContents = (props) => {

  const [album, setAlbum] = useState(null)
  const [image, setImage] = useState(null)

  return (
    <Box sx={{ ml: 1, mr: 1, mt: 2 }}>

      <AlbumBrowser
        username={props.username}
        identityId={props.identityId}
        onClickAlbum={(album) => {
          setAlbum(album)
        }}
      />

      <Box sx={{ mt: 3, mb: 3 }}>
        <Divider />
      </Box>

      <ImageBrowser
        username={props.username}
        identityId={props.identityId}
        album={album}
        onClickImage={(image) => {
          setImage(image)
        }} />

    </Box>
  )
}

export default BodyContents