import React, { useState, useEffect } from 'react'

import { Storage, } from 'aws-amplify'

import { Box, Grid, Typography } from '@mui/material'
import { Card, CardActionArea, CardMedia, CardContent, CardActions } from '@mui/material'

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

  return (
    <Card>
      <CardActionArea>
        {/* <CardMedia>
          <img src={signedURL} alt={props.image.key} />
        </CardMedia> */}

        <CardMedia
          component='img'
          src={signedURL}
          alt={props.image.key} />

        <CardContent>
          <Typography gutterBottom>
            {new Date(props.image.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card >
  )
}

const ImageList = (props) => {
  return (
    <Box>
      <Grid container direction='row' spacing={1}>
        {
          props.images.map((image, idx) => (
            < Grid item xs={2} key={image.id} >
              <Image
                image={image} />
            </Grid>
          ))
        }
      </Grid>
    </Box >
  )
}

export default ImageList;