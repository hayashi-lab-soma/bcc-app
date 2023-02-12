import React, { useState, useEffect } from 'react'

import { Storage, } from 'aws-amplify'

import { Box, Grid, Typography, Button, IconButton, useStepContext } from '@mui/material'
import { Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material'
import { Menu, MenuItem } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const BUCKET = 'bcc-app-storage-dev84746-staging'
const IMAGE_URL = `https://${BUCKET}.s3.ap-northeast-1.amazonaws.com/`

const THUMBNAIL_BUCKET = "bcc-app-storage-thumbs"
const THUMBNAIL_URL = `https://${THUMBNAIL_BUCKET}.s3.ap-northeast-1.amazonaws.com/protected/`

const ImageList = (props) => {
  return (
    <Box>
      <Grid container direction='row' spacing={1}>
        {
          props.images.slice(0, 30).map((image, idx) => (
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


const Image = (props) => {
  const [signedURL, setURL] = useState('')
  const [loaded, setLoaded] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    (async () => {
      let tmp = await Storage.get(props.image.key, { level: 'protected' })
      setURL(tmp)
    })()
  }, [])

  const _date = new Date(props.image.date)

  return (
    <div>
      <Card sx={{ height: '100%', width: '100%' }}>

        <CardActionArea>

          <CardMedia
            component='img'
            src={signedURL}
            alt={props.image.key}
            height='180'
            loading='eager'
          />

        </CardActionArea>

        <CardHeader
          title={props.image.name}
          titleTypographyProps={{ width: '120px', variant: 'body1' }}
          subheader={`${_date.getFullYear()}年 ${_date.getMonth() + 1}月 ${_date.getDate()}日`}
          action={<IconButton
            aria-label="settings"
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>}
          sx={{ display: 'flex', width: '100%' }}
        />

        {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => { props.onEdit(props.image) }}>編集</Button>
          <Button onClick={() => { props.onDelete(props.image) }}>削除</Button>
        </CardActions> */}
      </Card>

      <ImageMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onDelete={() => { props.onDelete(props.image) }} />
    </div>
  )
}

const ImageMenu = (props) => {
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={props.onClose}>編集</MenuItem>
        <MenuItem onClick={props.onDelete}>削除</MenuItem>
      </Menu>
    </div>
  )
}

export default ImageList;