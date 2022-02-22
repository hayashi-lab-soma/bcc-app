import React, { useRef, useEffect, useState, useCallback } from 'react'
import './App.css';

import { Amplify, Auth, Storage } from 'aws-amplify';
import { withAuthenticator, } from '@aws-amplify/ui-react'
import AWS from 'aws-sdk'
import '@aws-amplify/ui-react/styles.css'

import awsconfig from './aws-exports';

import { Box, } from '@mui/material'
import { MainNavBar, } from './ui-components/index'
import { ChonkyActions } from 'chonky'
import Appbar from './components/Appbar';
import FileBrowser from './components/FileBrowser'
import FileUploadDialog from './components/FileUploadDialog';
import SideBar from './components/Sidebar'

Amplify.configure(awsconfig);

const isFetch = false

const App = ({ signOut, user }) => {
  const credentials = useRef(null)
  const s3 = useRef(null)

  const [files, setFiles] = useState([])
  const [folderChain, setFolderChain] = useState([])
  const [prefix, setPrefix] = useState('')

  // const [isOpenFolderCreateForm, setFolderCreateForm] = useState(false)
  const [isOpenFileUploadDialog, setFileUploadDialog] = useState(false)

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
  }, [prefix])

  const fetchS3Bucket = () => {
    {
      isFetch &&
        (async () => {
          if (!credentials.current) return
          if (!s3.current) return

          // Storage.list('')
          // .then((res) => {
          //   console.log(res)
          // })


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
  //
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

        selFiles.map((file, index) => {
          return (
            Storage.remove(file.id) //public level object
              .then((res) => {
                console.log(res)
                fetchS3Bucket()
              })
              .catch((err) => {
                console.err(err)
              })
          )
        })
        break
      default:
        break
    }

  }, [])

  //--------------------------------------------------
  //
  //
  //
  //--------------------------------------------------
  return (
    <div>
      <Box
        sx={{
          width: '100%',
        }}
        p={'10px'}
        >

        <Appbar
          username={user.username}
          onClick={signOut} />

        <Box
          sx={{
            width: '100%',
            minHeight: '500px',
            display: 'flex',
          }}
          p={'10px'}
          >

          <SideBar />

          <FileBrowser
            files={files}
            folderChain={folderChain}
            handleFileAction={handleFileAction}
          />

        </Box>
      </Box>

      <FileUploadDialog
        open={isOpenFileUploadDialog}
        onClose={() => { setFileUploadDialog(false) }}
        onSave={(files) => { //file submit process
          // let folderDepth = folderChain.length
          // let curFolderId = folderChain[folderDepth - 1].id
          // let keyPrefix = curFolderId === '/'
          //   ? ''
          //   : curFolderId + '/'
          //console.log(files)

          console.debug('Upload files: ', files)

          files.map((file, index) => {
            return (
              Storage.put(file.name, file, { level: 'protected' })
                .then((res) => {
                  console.log('Upload success', res)
                  fetchS3Bucket()
                })
                .catch((err) => {
                  console.error(err)
                })
            )
          })
        }}
      />

    </div>
  );
}

export default withAuthenticator(App);