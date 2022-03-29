import React, { useEffect, useState } from 'react'

import { API, graphqlOperation } from 'aws-amplify'
import { listAlbums } from '../../graphql/queries'
import { createAlbum, deleteAlbum } from '../../graphql/mutations'

import AlbumToolBar from './AlbumToolBar'
import AlbumCreateDialog from './AlbumCreateDialog'
import AlbumList from './AlbumList'

const AlbumBrowser = (props) => {

  const ALL = {
    id: 'all',
    name: '全て',
    images: []
  }

  const NON = {
    id: 'non',
    name: '未分類',
    images: []
  }

  const [albums, setAlbums] = useState([])

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  // Component did mount
  useEffect(() => {
    fetchAlbums()
  }, [])

  function fetchAlbums() {

    API.graphql({ query: listAlbums})
      .then((res) => {
        let items = res.data.listAlbums.items
        items = items.filter(elem => !elem._deleted)
        items.unshift(NON)
        items.unshift(ALL)

        setAlbums(items)
        props.onFetchedAlbums(items)
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  const handleCreateAlbum = (name) => {
    let item = {
      name: name,
      auther: props.username,
      autherid: props.identityId
    }

    console.debug('Try create Album', item)

    API.graphql({ query: createAlbum, variables: { input: item } })
      .then((res) => {
        console.debug('Success create Album', res)
        fetchAlbums() //fetch & rendering
        handleClose() //close dialog
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  const handleClickedAlbum = (album) => {
    props.onClickedAlbum(album)
  }

  const handleDeleteAlbum = (album) => {
    console.debug('Try delete Album', album)

    let item = {
      id: album.id,
      _version: album._version,
    }

    API.graphql({ query: deleteAlbum, variables: { input: item } })
      .then((res) => {
        console.log('Success delete Album', res)
        fetchAlbums()
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  return (
    <div>
      <AlbumToolBar
        onCreateAlbum={() => { setOpen(true) }} />

      <AlbumList
        albums={albums}
        onClickAlbum={handleClickedAlbum}
        onDeleteAlbum={handleDeleteAlbum} />

      <AlbumCreateDialog
        open={open}
        onClose={handleClose}
        onCreate={handleCreateAlbum}
      />

    </div>
  )
}

export default AlbumBrowser