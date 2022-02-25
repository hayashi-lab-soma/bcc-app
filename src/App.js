import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Buffer } from 'buffer'
import './App.css';

import { Amplify, Auth, Storage, DataStore, } from 'aws-amplify';
import { withAuthenticator, } from '@aws-amplify/ui-react'
import { Image, } from './models'
import AWS from 'aws-sdk'
import '@aws-amplify/ui-react/styles.css'

import awsconfig from './aws-exports';

import { Box, } from '@mui/material'
import { ChonkyActions } from 'chonky'

import { NemuBar, BottomBar, S3Browser, FileUploadDialog, CameraDialog, CapturedImageDialog } from './components'


Amplify.configure(awsconfig);

const isFetch = true

const App = ({ signOut, user }) => {
  const credentials = useRef(null)
  const s3 = useRef(null)

  const [files, setFiles] = useState([])
  const [folderChain, setFolderChain] = useState([])
  const [prefix, setPrefix] = useState('')

  //----------------------------------------
  // File upload
  // const [isOpenFolderCreateForm, setFolderCreateForm] = useState(false)
  const [openFileUploadDialog, setFileUploadDialog] = useState(false)

  //----------------------------------------
  // Camera and image cupture
  const [openCameraDialog, setCameraDialog] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null) //Captured image instance
  const [openCapturedImageDialog, setCapturedImageDialog] = useState(false)

  const callbackSetCapturedImage = useCallback((img) => {
    setCapturedImage(img)   //set current camera image
    setCameraDialog(false)  //close camera dialog
    setCapturedImageDialog(true) //open cuptured image dialog
  }, [])
  //----------------------------------------

  // Effect (componentDidMount)
  useEffect(() => {
    // Get current cridentials
    (async () => {
      credentials.current = await Auth.currentCredentials()

      s3.current = new AWS.S3({
        credentials: credentials.current,
        region: awsconfig.aws_user_files_s3_bucket_region
      })

      setPrefix('/') //to call first fetch

    })() //No named function call
  }, [])

  // effect for current prefix changed
  useEffect(() => {
    fetchS3Bucket()       //fetch process
    updateFolderChain()   //folder chain update process
  }, [prefix,])

  const fetchS3Bucket = () => {
    {
      isFetch &&
        (async () => {
          if (!credentials.current) return
          if (!s3.current) return

          Storage.list('', { level: 'protected' })
            .then((res) => {
              console.debug('res: ', res)

              const chonkyFiles = []
              chonkyFiles.push(
                ...res.map((object, index) => ({
                  id: object.key,
                  name: object.key,
                  isDir: false,
                  // thumbnailUrl: ''
                }))
              )

              setFiles(chonkyFiles)

            })
            .catch((err) => {
              console.err(err)
            })

          // const params = {
          //   Bucket: awsconfig.aws_user_files_s3_bucket,
          //   Delimiter: '/',
          //   Prefix: prefix !== '/' ? prefix : 'public/'
          // }

          // s3.current.listObjectsV2(params)
          //   .promise()
          //   .then((res) => {

          //     const chonkyFiles = []
          //     const s3Objects = res.Contents
          //     const s3Prefixes = res.CommonPrefixes

          //     if (s3Objects) {
          //       chonkyFiles.push(
          //         ...s3Objects.map((object, index) => ({
          //           id: object.Key,
          //           name: object.Key.split('/').reverse()[0], //get file name
          //           isDir: false,
          //           // thumbnailUrl: ''
          //         }))
          //       )
          //     }
          //     console.log(chonkyFiles)
          //     // chonkyFiles.splice(chonkyFiles.findIndex(o => o.id === prefix), 1)

          //     if (s3Prefixes) {
          //       chonkyFiles.push(
          //         ...s3Prefixes.map((prefix, index) => ({
          //           id: prefix.Prefix,
          //           name: prefix.Prefix.split('/').reverse()[1],
          //           isDir: true
          //         }))
          //       )
          //     }

          //     console.debug('ChonkyFiles', chonkyFiles)
          //     setFiles(chonkyFiles)
          //   })
          //   .catch((err) => {
          //     console.error(err)
          //   })

        })()
    }
  }

  const updateFolderChain = () => {

    let chain = []

    if (prefix === '/') {
    }
    else {
      let currentPrefix = ''

      chain = prefix
        .replace(/\/*$/, '')
        .split('/')
        .map((prefixPart, index) => {
          currentPrefix = currentPrefix
            ? currentPrefix + prefixPart
            : prefixPart

          return {
            id: currentPrefix,
            name: prefixPart,
            isDir: true
          }
        })
    }

    chain.unshift(
      {
        id: '/',
        //name: 'bccs/public/', //root directory name
        name: '/',
        isDir: true
      }
    )

    setFolderChain(chain)
  }

  //--------------------------------------------------
  //
  //--------------------------------------------------
  const handleFileAction = useCallback((data) => {
    switch (data.id) {
      case ChonkyActions.OpenFiles.id:
        if (data.payload.files && data.payload.files.length !== 1) return
        if (!data.payload.targetFile) return

        if (data.payload.targetFile.isDir) { //if target is Directory object
          const newPrefix = `${data.payload.targetFile.id.replace(/\/*$/, '')}/`
          console.log(newPrefix)
          setPrefix(newPrefix)
        }
        else { // if target is file object
        }
        break

      case ChonkyActions.CreateFolder.id:
        // setFolderCreateForm(true)
        break

      case ChonkyActions.UploadFiles.id:
        setFileUploadDialog(true) //open file upload dialog
        break

      case ChonkyActions.DeleteFiles.id:
        const selFiles = data.state.selectedFiles
        console.log(selFiles)

        const promise = new Promise((resolve, reject) => {
          selFiles.map((file, index) => {
            Storage.remove(file.id, {level: 'protected'})
            .then((res) => {
              console.log('Removed: ', res)
              resolve()
            })
            .catch((err) => {
              console.error(err)
            })
          })
        })

        promise.then(() => {
          fetchS3Bucket()
        })

        // selFiles.map((file, index) => {
        //   Storage.remove(file.id, { level: 'protected' })
        //     .then((res) => {
        //       console.log(res)
        //     })
        //     .catch((err) => {
        //       console.err(err)
        //     })
        // })

        break

      default:
        break
    }

  }, [])

  const onFileUpload = (files) => {
    // let folderDepth = folderChain.length
    // let curFolderId = folderChain[folderDepth - 1].id
    // let keyPrefix = curFolderId === '/'
    //   ? ''
    //   : curFolderId + '/'
    //console.log(files)
    //console.log(credentials.current)

    console.debug('Upload files: ', files)

    files.map((file, index) => {
      Storage.put(file.name, file, { level: 'protected' })
        .then((res) => {
          console.log('Upload success', res)

          DataStore.save(
            new Image({
              "name": file.name,
              "size": file.size,
              "path": "",
            })
          )
            .then((res) => {
              console.log('Datastore save success', res)

              fetchS3Bucket() //call fetch method -> rendaring
            })
            .catch((err) => {
              console.error(err)
            })

        })
        .catch((err) => {
          console.error(err)
        })
    })
  }


  //--------------------------------------------------
  // rendering function
  //--------------------------------------------------
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        p={'5px'}
      >

        <NemuBar
          username={user.username}
          onClick={signOut}
        />

        {/* <SideBar
            onClickCameraOpen={() => { setCameraDialog(true) }}
          /> */}

        <Box
          sx={{
            mt: '5px',
            bottom: 0
          }}>

          <S3Browser
            files={files}
            folderChain={folderChain}
            onFileAction={handleFileAction}
          />

        </Box>

        <BottomBar
          onClickCameraOpen={() => { setCameraDialog(true) }}>
        </BottomBar>

      </Box>

      <FileUploadDialog
        open={openFileUploadDialog}
        onClose={() => { setFileUploadDialog(false) }}
        onSave={(files) => { onFileUpload(files) }}
      />

      <CameraDialog
        open={openCameraDialog}
        onClose={() => { setCameraDialog(false) }}
        onShoot={callbackSetCapturedImage}
      />

      <CapturedImageDialog
        open={openCapturedImageDialog}
        onClose={() => { setCapturedImageDialog(false) }}
        srcImg={capturedImage}
        onSubmit={() => {

          // console.debug('onSubmit')
          let tmp = capturedImage
          tmp = tmp.replace("data:image/jpeg;base64", '')
          // console.debug(tmp)
          let bin = Buffer.from(tmp, 'base64')

          let now = new Date();
          // let strTime = now.toUTCString()
          let strTime = now.getTime()

          let file = new File(
            [bin.buffer],       //body
            'IMG_' + strTime + '.jpg',   //file name
            { type: "image/jpeg" })
          // console.debug(file)

          onFileUpload([file]) //call file upload function

        }} //Image upload without annotation
        onAnnotation={() => {
          console.log('on Annotaion')
        }}
      />

    </div>
  );
}

export default withAuthenticator(App);