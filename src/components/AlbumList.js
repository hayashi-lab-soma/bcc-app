import React, { useState, useEffect } from 'react'
import { Box, Grid, Stack, Typography, Button } from '@mui/material'
import { Card, CardActionArea, CardContent } from '@mui/material'

const Album = (props) => {
  return (
    <Card
      key={props.album.id}
      onClick={() => { props.onClickAlbum(props.album) }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant='h7'>{props.album.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const AlbumList = (props) => {
  const all = {
    name: 'all'
  }
  const nonalbum = {
    name: 'nonalbum',
  }

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
            <Album
              key={album.id}
              album={album}
            />
          ))
        }

      </Stack>
    </Box>
  )
}

export default AlbumList;