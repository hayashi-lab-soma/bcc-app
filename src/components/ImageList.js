import React, { useState, useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'

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

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>

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


      <DropzoneDialog
        maxFileSize={500000000}
        filesLimit={100}
        cancelButtonText={'キャンセル'}
        submitButtonText={'送信'}
        previewChipProps={false}
        showPreviews={true}
        useChipsForPreview={false}
        open={open}
        onClose={handleClose}
        onSave={(files) => {
          console.log(files)
        }}
      />

    </Box>
  )
}

export default ImageList;