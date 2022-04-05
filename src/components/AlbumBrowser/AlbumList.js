import React, { useState, useEffect } from 'react'
import { Box, Grid, Stack, Typography, Button, CardHeader } from '@mui/material'
import { Card, CardActionArea, CardContent, CardActions } from '@mui/material'

// props
// album: album object
// onClick: callback
const Album = (props) => {

  return (
    <Card
      key={props.album.id}
    >
      <CardHeader
        title={props.album.name}
      />
      <CardActionArea onClick={() => { props.onClick(props.album) }} >
        <CardContent>
          <Typography >{props.album.name}</Typography>
        </CardContent>
      </CardActionArea>

      {
        props.album.id !== 'all' &&
        props.album.id !== 'non' &&
        <CardActions>
          <Button onClick={() => { props.onDelete(props.album) }}>削除</Button>
        </CardActions>
      }

    </Card>
  )
}

// props
// albums: Array
// onClickAlbum: call back
const AlbumList = (props) => {
  return (
    <Box>
      <Stack
        direction='row'
        spacing={2} >
        {
          props.albums.map((album, idx) => (
            <Album
              key={album.id}
              album={album}
              onClick={props.onClickAlbum}
              onDelete={props.onDeleteAlbum}
            />
          ))
        }

      </Stack>
    </Box>
  )
}

export default AlbumList;