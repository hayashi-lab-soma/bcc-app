import React, { useState, useEffect, useRef } from 'react'

import ImageList from './ImageList'
import AlbumList from './AlbumList'

import { Box, Divider, Typography, Button, TextField } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createAlbum, } from '../graphql/mutations'
import { listImages, listAlbums } from '../graphql/queries'

const THUMBNAIL_BUCKET = "bcc-app-storage-thumbs"
const THUMBNAIL_URL = `https://${THUMBNAIL_BUCKET}.s3.ap-northeast-1.amazonaws.com/protected/`

const AlbumCreateForm = (props) => {
  const albumName = useRef('')
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>アルバム名</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id="name"
          label="アルバム名"
          fullWidth
          variant='standard'
          inputRef={albumName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>キャンセル</Button>
        <Button
          onClick={() => { props.onCreate(albumName.current.value) }}>作成</Button>
      </DialogActions>
    </Dialog>
  )
}

const BodyContents = (props) => {

  const [credential, setCredential] = useState(null)

  const [albums, setAlbums] = useState([])
  const [album, setAlbum] = useState(null)
  const [images, setImages] = useState([])

  const [openAlbumCreateForm, setAlbumCreateForm] = useState(false)
  const handleCreateAlbum = async (albumName) => {
    let item = {
      name: albumName,
      auther: props.username,
      autherid: credential.identityId
    }

    try {
      await API.graphql(graphqlOperation(createAlbum, { input: item }))
      fetchAlbums()
    }
    catch (err) {
      console.error({ err })
    }

    setAlbumCreateForm(false)
  }

  //--------------------------------------------------
  useEffect(() => { //ComponentDidMount effect
    getCurrentCredentials()
  }, [])

  const getCurrentCredentials = async () => {
    const _credential = await Auth.currentUserCredentials()
    setCredential(_credential)
  }
  //--------------------------------------------------

  //--------------------------------------------------
  useEffect(() => {
    fetchAlbums()
  }, [credential])

  const fetchAlbums = async () => {
    try {
      const data = await API.graphql({ query: listAlbums })
      setAlbums(data.data.listAlbums.items)
      setAlbum({ name: 'all' })
    }
    catch (err) {
      console.error({ err })
    }
  }

  useEffect(() => {
    fetchImages()
  }, [album])

  const fetchImages = async () => {
    try {
      if (credential === null) return

      let filter = {}

      if (album.name === 'all') {
        filter = {
          autherid: { 'eq': credential.identityId }
        }
      }
      else if (album.name === 'nonalbum') {
        filter = {
          and: [
            { autherid: { 'eq': credential.identityId } },
            { albumImagesId: { 'eq': '' } }
          ]
        }
      }
      else {
        filter = {
          and: [
            { autherid: { 'eq': credential.identityId } },
            { albumImagesId: { 'eq': album.id } }
          ]
        }
      } //else

      let variables = {
        filter: filter,
        limit: 200
      }

      // console.log(variables)

      const data = await API.graphql({
        query: listImages,
        variables: variables
      })

      console.log(data.data.listImages.items.length)

      setImages(data.data.listImages.items)
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <Box sx={{ ml: 1, mr: 1, mt: 2 }}>

      <AlbumList
        albums={albums}
        onClickCreate={() => { setAlbumCreateForm(true) }}
        onClickAlbum={(album) => {
          setAlbum(album)
        }} />

      <Box sx={{ mt: 3, mb: 3 }}>
        <Divider />
      </Box>



      <Box
        sx={{ mt: 1, mb: 1 }}
        display='flex'
        flexDirection='row'>

        <Box sx={{ mt: 1, mb: 3, flexGrow: 1 }}>
          <Typography>
            {album !== null
              ? album.name === 'all'
                ? '全て'
                : album.name === 'nonalbum' ? '未分類' : `「${album.name}」`
              : ''}
            {`（${images.length}件）`}
          </Typography>
        </Box>

        <Button onClick={() => {}}>追加</Button>

      </Box>




      <ImageList
        userId={credential === null ? '' : credential.identityId}
        album={album}
        images={images}
      />

      

      <AlbumCreateForm
        open={openAlbumCreateForm}
        onClose={() => { setAlbumCreateForm(false) }}
        onCancel={() => { setAlbumCreateForm(false) }}
        onCreate={(name) => { handleCreateAlbum(name) }}
      />

    </Box>
  )
}

export default BodyContents