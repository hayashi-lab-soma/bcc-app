import React, { useEffect, useState, } from 'react'

import { Box, Button, IconButton } from '@mui/material'
import { AppBar, Toolbar, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

import { HeaderContents, BodyContents } from './components'
import S3ImageGallary from './ImageGallary'

import { Amplify, Auth } from 'aws-amplify'

import { withAuthenticator, } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// const BUCKET = awsconfig.aws_user_files_s3_bucket
// const REGION = awsconfig.aws_user_files_s3_bucket_region

const App = ({ signOut, user }) => {

  //--------------------------------------------------
  const [credential, setCredential] = useState(null)

  useEffect(() => { //ComponentDidMount effect
    getCurrentCredentials()
  }, [])

  const getCurrentCredentials = async () => {
    const _credential = await Auth.currentUserCredentials()
    setCredential(_credential)
  }
  //--------------------------------------------------

  //--------------------------------------------------
  // rendering function
  //--------------------------------------------------
  return (
    <div>
      <BrowserRouter>
        <HeaderContents
          username={user.username}
          onClick={signOut} />
        <Routes>

          <Route path='/'
            element=
            {
              credential !== null &&
              <BodyContents username={user.username} identityId={credential.identityId} />
            }
          />

          <Route path='public'
            element={
              <S3ImageGallary />
            } />
            
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default withAuthenticator(App);