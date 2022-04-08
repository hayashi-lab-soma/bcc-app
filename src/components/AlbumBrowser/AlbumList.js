import React from 'react'
import { Box, Stack, Button, IconButton, CardHeader, CardContent } from '@mui/material'
import { Card, CardActionArea, CardActions } from '@mui/material'

import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { minHeight } from '@mui/system';

// props
// album: album object
// onClick: callback
const Album = (props) => {

  return (
    <Card
      key={props.album.id}
      sx={{ minWidth: 180 }}
    >

      <CardActionArea
        onClick={() => { props.onClick(props.album) }} >
        <CardContent>
          <Box
            sx={{ display: 'flex' }}
            justifyContent={'center'}>
            <PhotoLibraryOutlinedIcon fontSize='large' />
          </Box>
        </CardContent>
      </CardActionArea>

      <CardHeader
        title={props.album.name}
        subheader={
          ""
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        sx={{minHeight: 80}}
      />



      {/* <CardActionArea onClick={() => { props.onClick(props.album) }} >
        <CardContent>
          <Typography >{props.album.name}</Typography>
        </CardContent>
      </CardActionArea> */}

      {/* {
        props.album.id !== 'all' &&
        props.album.id !== 'non' &&
        <CardActions>
          <Box
            sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant='contained' onClick={() => { props.onDelete(props.album) }}>削除</Button>
          </Box>
        </CardActions>
      } */}

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