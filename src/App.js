import React, { useEffect, useState, } from 'react'

import { Box, Button, IconButton } from '@mui/material'
import { AppBar, Toolbar, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

import { Amplify, API, } from 'aws-amplify'

import { withAuthenticator, } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { listImages, } from './graphql/queries'

import { NemuBar, } from './components'

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const BUCKET = awsconfig.aws_user_files_s3_bucket

const App = ({ signOut, user }) => {
  
  const [images, setImages] = useState([])
  const [isFetching, setFething] = useState(false)

  useEffect(() => {
    fetchImages()
    console.log(BUCKET, user)
  }, [])

  const fetchImages = async () => {
    setFething(true)

    try {
      const data = await API.graphql({ query: listImages })
      setImages(data.data.listImages.items)
      setFething(false)
    }
    catch (err) {
      console.error(err)
    }
  }

  //--------------------------------------------------
  // rendering function
  //--------------------------------------------------
  return (
    <div>
      <NemuBar username={user.username} onClick={signOut}/>

      <h1>Albums</h1>

      <h1>Images</h1>
      

      <Box
        sx={{ ml: 5, mr: 5 }} s>
        <ImageList
          cols={3}
          gap={8}>

          {
            images.map(image => (
              <ImageListItem key={image.id}>
                <img
                  // src={`${image.url}?w=300&fit=crop&auto=format`}
                  src={`${process.env.PUBLIC_URL}/frame0000.jpg`}
                  alt={image.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={image.name}
                  subtitle={image.auther}>
                </ImageListItemBar>
              </ImageListItem>
            ))
          }

        </ImageList>
      </Box>

    </div>
  );
}

export default withAuthenticator(App);