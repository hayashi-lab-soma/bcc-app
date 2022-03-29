import React, { useState, useEffect } from 'react'

import { Storage, DataStore } from 'aws-amplify'
import { Image, } from '../../models'

import { Box, Typography, Button, FormControl } from '@mui/material'


const ImageToolBar = (props) => {

  //  const handleCreate = async (file, albumId) => {
  // try {
  //   const result = await Storage.put(
  //     file.name,
  //     file,
  //     {
  //       level: "protected",
  //     }
  //   )
  // }
  // catch (err) {
  //   console.err({ err })
  // }

  //   Storage.put(file.name, file, {
  //     level: "protected",
  //   })
  //     .then((result) => {
  //       console.log(result)

  //       DataStore.save(
  //         new Image({
  //           name: file.name,
  //           size: file.size,
  //           auther: props.username,
  //           autherid: props.identityId,
  //           key: result.key,
  //           albumImagesId: albumId
  //         })
  //       )
  //         .then((result) => {
  //           console.log(result)
  //         })
  //         .catch((err) => {
  //           console.error({ err })
  //         })
  //     })
  //     .catch((err) => {
  //       console.error({ err })
  //     })
  // }

  return (
    <Box
      sx={{ mt: 1, mb: 1 }}
      display='flex'
      flexDirection='row'>

      <Box sx={{ mt: 1, mb: 3, flexGrow: 1 }}>
        <Typography>
          {`「${props.album.name}」`}
          {`（${props.imagesNum} 件）`}
        </Typography>
      </Box>

      <Button onClick={props.onCreateImage}>追加</Button>

    </Box>
  )
}

export default ImageToolBar