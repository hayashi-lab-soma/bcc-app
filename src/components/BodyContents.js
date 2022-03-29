import React, { useState, useEffect, useRef } from 'react'

import AlbumBrowser from './AlbumBrowser/AlbumBrowser'
import ImageBrowser from './ImageBrowser/ImageBrowser'

import { Box, Divider, Typography, Button, TextField } from '@mui/material'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listImages, } from '../graphql/queries'

const THUMBNAIL_BUCKET = "bcc-app-storage-thumbs"
const THUMBNAIL_URL = `https://${THUMBNAIL_BUCKET}.s3.ap-northeast-1.amazonaws.com/protected/`

const BodyContents = (props) => {

  const [albums, setAlbums] = useState([
    {
      id: 'all',
      name: '全て',
      images: []
    },
    {
      id: 'non',
      name: '未分類',
      images: []
    }
  ])

  const [album, setAlbum] = useState({
    id: 'all',
    name: '全て'
  })
  const [image, setImage] = useState(null)

  const handleFetchedAlbums = (albums) => {
    console.debug('Existing Albums', albums)
    setAlbums(albums)
  }

  const handleClickedAlbum = (album) => {
    console.debug('Clicked Album', album)
    setAlbum(album)
  }

  return (
    <Box sx={{ ml: 1, mr: 1, mt: 2 }}>

      <AlbumBrowser
        username={props.username}
        identityId={props.identityId}
        onFetchedAlbums={handleFetchedAlbums}
        onClickedAlbum={handleClickedAlbum}
      />

      <Box sx={{ mt: 3, mb: 3 }}>
        <Divider />
      </Box>

      <ImageBrowser
        username={props.username}
        identityId={props.identityId}
        albums={albums}
        album={album}
        onClickImage={(image) => {
          setImage(image)
        }} />

    </Box>
  )
}

export default BodyContents