import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Buffer } from 'buffer'
import './App.css';

import { Amplify, Auth, Storage, DataStore, } from 'aws-amplify';
import { withAuthenticator, } from '@aws-amplify/ui-react'
import { Image, } from './models'
import AWS from 'aws-sdk'
import '@aws-amplify/ui-react/styles.css'

import awsconfig from './aws-exports';

import { Box, Fab, } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { ChonkyActions } from 'chonky'

import { NemuBar, BottomBar, S3Browser, FileUploadDialog, CameraDialog, CapturedImageDialog, AddDialog } from './components'
import FolderCreateDialog from './components/FolderCreateDialog';


Amplify.configure(awsconfig);

// const THUMBNEILS_BUCKET_URL = 'https://bcc-app-storage-thumbs.s3.ap-northeast-1.amazonaws.com/protected/ap-northeast-1%3A6d2639f5-1a6c-4b09-96b0-c217998c646b/'
const THUMBNEILS_BUCKET_URL = 'https://bcc-app-storage-thumbs.s3.ap-northeast-1.amazonaws.com/protected/'

const isFetch = true

const App = ({ signOut, user }) => {
  const credentials = useRef(null)
  const s3 = useRef(null)

  //--------------------------------------------------
  // rendering function
  //--------------------------------------------------
  return (
    <div>
    </div>

  );
}

export default withAuthenticator(App);