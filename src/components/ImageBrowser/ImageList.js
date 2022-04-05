import React, { useState, useEffect } from 'react'

import { Storage, } from 'aws-amplify'

import { Box, Grid, Typography, Button, IconButton } from '@mui/material'
import { Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const BUCKET = 'bcc-app-storage-dev84746-staging'
const IMAGE_URL = `https://${BUCKET}.s3.ap-northeast-1.amazonaws.com/`

const THUMBNAIL_BUCKET = "bcc-app-storage-thumbs"
const THUMBNAIL_URL = `https://${THUMBNAIL_BUCKET}.s3.ap-northeast-1.amazonaws.com/protected/`

const Image = (props) => {
  const [signedURL, setURL] = useState('')

  useEffect(() => {
    (async () => {
      let tmp = await Storage.get(props.image.key, { level: 'protected' })
      setURL(tmp)
    })()
  }, [])

  const _date = new Date(props.image.date)

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.image.name}
        subheader={`${_date.getFullYear()}年 ${_date.getMonth() + 1}月 ${_date.getDate()}日`}
      />
      <CardActionArea>
        <CardMedia
          component='img'
          src={signedURL}
          alt={props.image.key}
          height='180' />
      </CardActionArea>
      <CardContent>
        {props.image.size}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => { props.onEdit(props.image) }}>編集</Button>
        <Button onClick={() => { props.onDelete(props.image) }}>削除</Button>
      </CardActions>
    </Card >
  )
}

const ImageList = (props) => {
  return (
    <Box>
      <Grid container direction='row' spacing={1}>
        {
          props.images.map((image, idx) => (
            < Grid item xs={4} key={image.id} >
              <Image
                image={image}
                onEdit={props.onEditImage}
                onDelete={props.onDeleteImage} />
            </Grid>
          ))
        }
      </Grid>
    </Box >
  )
}

export default ImageList;