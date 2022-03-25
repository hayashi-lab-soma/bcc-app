import React, { useEffect, useState } from 'react'

import { API, graphqlOperation } from 'aws-amplify'
import { listAlbums } from '../../graphql/queries'

import AlbumToolBar from './AlbumToolBar'
import AlbumList from './AlbumList'

const AlbumBrowser = (props) => {

  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      const data = await API.graphql({ query: listAlbums })
      setAlbums(data.data.listAlbums.items)
    }
    catch (err) {
      console.error({ err })
    }
  }

  const createAlbum = async (name) => {
    try {
      let item = {
        name: name,
        auther: props.username,
        autherid: props.identityId
      }

      console.log(item)

      try {
        // await API.graphql(graphqlOperation(createAlbum, { input: item }))
        fetchAlbums()
      }
      catch (err) {
        console.error({ err })
      }
    }
    catch (err) {
    }
  }

  const handleClickAlbum = (album) => { props.onClickAlbum(album) }

  return (
    <div>
      <AlbumToolBar
        onCreate={createAlbum} />

      <AlbumList
        albums={albums}
        onClickAlbum={handleClickAlbum} />
    </div>
  )
}

export default AlbumBrowser