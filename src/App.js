import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Buffer } from 'buffer'
import './App.css';

import { Amplify, Auth, Storage, DataStore, } from 'aws-amplify';
import { withAuthenticator, } from '@aws-amplify/ui-react'
import { Image, Location } from './models'
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

  const [files, setFiles] = useState([]) //all S3 objects (file, folder, ...)
  const [folderChain, setFolderChain] = useState([]) //folder chain
  const [prefix, setPrefix] = useState('') //current folder

  //----------------------------------------
  // Add dialog
  const [openAddDialog, setAddDialog] = useState(false)

  //----------------------------------------
  // File upload
  // const [isOpenFolderCreateForm, setFolderCreateForm] = useState(false)
  const [openFileUploadDialog, setFileUploadDialog] = useState(false)

  //----------------------------------------
  // Folder create
  const [openFolderCreateDialog, setFolderCreateDialog] = useState(false)
  const refCreateFolderNameInput = useRef(null)

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

  const [isMenu, setMenu] = useState(false)

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

          const UserId = await Auth.currentUserInfo()

          // console.debug(UserId.id)
          console.debug('Current prefix: ', prefix)

          // Storage.list(prefix !== '/' ? prefix : '',
          //   { level: 'protected' })
          //   .then((res) => {
          //     console.debug('Fetch res: ', res)

          //     const chonkyFiles = []

          //     res.forEach((object, index) => {
          //       // console.debug(object.key.split('/'))
          //       if (object.size) {
          //         chonkyFiles.push(
          //           {
          //             id: object.key,
          //             name: object.key,
          //             isDir: false
          //           }
          //         )
          //       }
          //       else {
          //         let _elems1 = object.key.split('/').slice(0, -1)
          //         console.debug(_elems1)

          //         let elems = _elems1

          //         if (elems.length === 1) {
          //           chonkyFiles.push(
          //             {
          //               id: object.key,
          //               name: object.key.slice(0, -1),
          //               isDir: true
          //             }
          //           )
          //         }
          //       }
          //     })

          //     setFiles(chonkyFiles)

          //   })
          //   .catch((err) => {
          //     console.err(err)
          //   })

          s3.current.listObjectsV2({
            Bucket: awsconfig.aws_user_files_s3_bucket,
            Delimiter: '/',
            Prefix: 'protected/' + UserId.id + '/' + (prefix !== '/' ? prefix : '')
          })
            .promise()
            .then((res) => {
              const chonkyFiles = []
              const s3Objects = res.Contents
              const s3Prefixes = res.CommonPrefixes

              if (s3Objects) {
                chonkyFiles.push(
                  ...s3Objects.map((object, index) => ({
                    id: object.Key.replace('protected/' + UserId.id + '/', ''),
                    name: object.Key.split('/').reverse()[0], //get file name
                    isDir: false,
                    thumbnailUrl: THUMBNEILS_BUCKET_URL
                      + UserId.id + '/'
                      + (prefix !== '/' ? prefix : '')
                      + object.Key.split('/').reverse()[0]
                  }))
                )
              }

              if (s3Prefixes) {
                chonkyFiles.push(
                  ...s3Prefixes.map((prefix, index) => ({
                    id: prefix.Prefix.replace('protected/' + UserId.id + '/', ''),
                    name: prefix.Prefix.split('/').reverse()[1],
                    isDir: true
                  }))
                )
              }

              console.debug(chonkyFiles)
              setFiles(chonkyFiles)
            })
            .catch((err) => {
              console.error(err)
            })

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
            Storage.remove(file.id, { level: 'protected' })
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

        break

      default:
        break
    }

  }, [])

  const onFileUpload = (files, location) => {

    console.debug('Prefix: ', prefix)
    console.debug('Upload files: ', files)

    let UserId
    (async () => {
      UserId = await Auth.currentUserInfo()
    })()

    files.map((file, index) => {
      Storage.put((prefix !== '/' ? prefix : '') + file.name,
        file,
        { level: 'protected' })
        .then((res) => {
          console.log('Upload success', res)

          DataStore.save(
            new Image({
              "name": file.name,
              "size": file.size,
              "auth": UserId.username,
              "url": awsconfig.aws_user_files_s3_bucket + '/'
                + UserId.id + '/'
                + res.key,

              "location": new Location({
                "latitude": parseFloat(location.latitude),
                "longitude": parseFloat(location.longitude)
              })
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

  const onFolderCreate = (fname) => {
    // console.debug(fname)
    Storage.put((prefix !== '/' ? prefix : '')
      + fname + '/',
      null,
      { level: 'protected' })
      .then((res) => {
        console.log('Create prefix: ', res)
        fetchS3Bucket()
      })
      .catch((err) => {
        console.error(err)
      })
  }


  const handleClick = () => {
    setMenu(true)
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

          <Fab
            style={{
              margin: 0,
              top: 'auto',
              left: 'auto',
              right: '20px',
              bottom: '100px',
              position: 'fixed',
              borderRadius: '30px'
            }}
            size='large'
            // onClick={() => { setFolderCreateDialog(true) }}
            onClick={() => { setAddDialog(true) }}
          >
            <AddIcon />
          </Fab>

        </Box>
      </Box>

      <AddDialog
        open={openAddDialog}
        onClose={() => { setAddDialog(false) }}
        onClickFolder={() => {
          setFolderCreateDialog(true) //
          setAddDialog(false)         //
        }}
        onClickUpload={() => {
          setFileUploadDialog(true)
          setAddDialog(false)
        }}
        onClickCamera={() => {
          setCameraDialog(true)
          setAddDialog(false)
        }}
      />

      <FolderCreateDialog
        open={openFolderCreateDialog}
        onClose={() => { setFolderCreateDialog(false) }}
        inputRef={refCreateFolderNameInput}
        onCreate={() => {
          onFolderCreate(refCreateFolderNameInput.current.value)
          setFolderCreateDialog(false)
        }}
      />

      <FileUploadDialog
        open={openFileUploadDialog}
        onClose={() => { setFileUploadDialog(false) }}
        onSave={(files) => {
          onFileUpload(files)
          setFileUploadDialog(false)
        }}
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
        files={files}
        onSubmit={(folder) => {

          let new_prefix = folder

          let tmp = capturedImage
          tmp = tmp.replace("data:image/jpeg;base64", '')
          let bin = Buffer.from(tmp, 'base64')

          let now = new Date();
          let strTime = now.getTime()

          let strPos = ''

          const getPosition = (options) => {
            return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
          }

          if (navigator.geolocation) {
            getPosition()
              .then((position) => {
                // console.log(position)
                strPos = '_' + position.coords.latitude + '-' + position.coords.longitude

                let file = new File(
                  [bin.buffer], //body
                  new_prefix + 'IMG_' + strTime + strPos + '.jpg', //file name
                  { type: "image/jpeg" })

                onFileUpload(
                  [file], position.coords) //call file upload function

                setCapturedImageDialog(false)
                setCameraDialog(true)

              })
              .catch((reject) => {
              })
          } else {
            let file = new File(
              [bin.buffer], //body
              new_prefix + 'IMG_' + strTime + '.jpg', //file name
              { type: "image/jpeg" })

            onFileUpload([file]) //call file upload function

            setCapturedImageDialog(false)
            setCameraDialog(true)
          }

        }} //Image upload without annotation
      />

    </div>

  );
}

export default withAuthenticator(App);