import React, { useState, useEffect } from 'react'
import { Box, Grid, Stack, Typography, Button } from '@mui/material'
import { Card, CardActionArea, CardContent } from '@mui/material'

// props
// album: album object
// onClick: callback
const Album = (props) => {
  return (
    <Card
      key={props.album.id}
      onClick={() => { props.onClick(props.album) }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant='h7'>{props.album.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

// props
// albums: Array
// onClickAlbum: call back
const AlbumList = (props) => {
  const all = {
    name: 'all'
  }
  const nonalbum = {
    name: 'nonalbum',
  }

  return (
    <Box>

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
            <Album
              key={album.id}
              album={album}
              onClick={props.onClickAlbum}
            />
          ))
        }

      </Stack>
    </Box>
  )
}

export default AlbumList;