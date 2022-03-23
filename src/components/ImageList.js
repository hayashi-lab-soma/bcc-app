import React, {useState, useEffect} from 'react'

import {Box, Grid, Typography} from '@mui/material'
import {Card, CardActionArea, CardMedia, CardContent} from '@mui/material'

const THUMBNAIL_BUCKET = "bcc-app-storage-thumbs"
const THUMBNAIL_URL = `https://${THUMBNAIL_BUCKET}.s3.ap-northeast-1.amazonaws.com/protected/`

const Image = (props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          image={encodeURI(`${THUMBNAIL_URL}${props.userId}/${props.image.key}`)}
          alt={props.image.key} />

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
              <Image
                userId={props.userId}
                image={image} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

export default ImageList;