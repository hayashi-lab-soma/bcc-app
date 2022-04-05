import React, { useEffect, useState, } from 'react'

import { Box, Button, IconButton } from '@mui/material'
import { AppBar, Toolbar, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

import { HeaderContents, BodyContents } from './components'

import { Amplify, Auth } from 'aws-amplify'

import { withAuthenticator, } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

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

      <HeaderContents
        username={user.username}
        onClick={signOut} />

      {
        credential !== null &&

        <BodyContents
          username={user.username}
          identityId={credential.identityId} />
      }

    </div>
  );
}

export default withAuthenticator(App);