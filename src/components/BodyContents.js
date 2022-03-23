import React, { useState, useEffect, useRef } from 'react'

import { Box, Stack, Divider, Button, TextField } from '@mui/material'
import { CardActionArea, CardMedia, Grid, Typography, } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { Album, } from '../models'
import { createAlbum, } from '../graphql/mutations'
import { listImages, listAlbums } from '../graphql/queries'

const AlbumList = (props) => {
  const all = new Album({
    name: 'all'
  })
  const nonalbum = new Album({
    name: 'nonalbum',
  })

  return (
    <Box>
      <Box
        sx={{ mt: 1, mb: 1 }}
        display='flex'
        flexDirection='row'
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography>アルバム</Typography>
        </Box>

        <Button onClick={props.onClickCreate}>作成</Button>
      </Box>

      <Stack
        direction='row'
        spacing={2} >

        <Card
          key='all'
          onClick={(event) => { props.onClickAlbum(all) }}
        >
          <CardActionArea>
            <CardContent>
              <Typography>全て</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          key='nonalbum'
          onClick={(event) => { props.onClickAlbum(nonalbum) }}
        >
          <CardActionArea>
            <CardContent>
              <Typography>未分類</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {
          props.albums.map((album, idx) => (
            <Card
              key={album.id}
              onClick={() => { props.onClickAlbum(album) }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant='h7'>{album.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        }

      </Stack>
    </Box>
  )
}

const Image = (props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          image={`${process.env.PUBLIC_URL}/frame0000.jpg`}
          alt='image' />

        <CardContent>
          <Typography gutterBottom>
            {new Date(props.image.createdAt).toLocaleString()}
          </Typography>
        </CardContent>

      </CardActionArea>
    </Card>
  )
}

const ImageList = (props) => {
  return (
    <Box>
      <Box sx={{ mt: 1, mb: 3 }}>
        <Typography>
          {props.album !== null
            ? props.album.name === 'all'
              ? '全て'
              : props.album.name === 'nonalbum' ? '未分類' : `「${props.album.name}」`
            : ''}
          {`（${props.images.length}件）`}
        </Typography>
      </Box>

      <Grid container direction='row' spacing={1}>
        {
          props.images.map((image, idx) => (
            <Grid item xs={2} key={image.id}>
              <Image image={image} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

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

    // console.log(item)

    try {
      await API.graphql(graphqlOperation(createAlbum, {input: item}))
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
    // console.debug(_credential)
  }
  //--------------------------------------------------

  useEffect(() => {
    fetchAlbums()
  }, [credential])

  useEffect(() => {
    fetchImages()
  }, [album])

  const fetchAlbums = async () => {
    try {
      const data = await API.graphql({
        query: listAlbums
      })
      setAlbums(data.data.listAlbums.items)
    }
    catch (err) {
      console.error({ err })
    }
  }

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
            { albumImagesId: { 'beginsWith': album.id } }
          ]
        }
      } //else

      let variables = {
        filter: filter
      }

      // console.log(variables)

      const data = await API.graphql({
        query: listImages,
        variables: variables
      })

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
          // console.log(album)
          setAlbum(album)
        }} />

      <Box sx={{ mt: 3, mb: 3 }}>
        <Divider />
      </Box>

      <ImageList
        album={album}
        images={images} />

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