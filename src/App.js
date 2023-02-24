import React from 'react'

import { HomePage, DashboardPage } from './components/pages'

import { Amplify, Auth, API } from 'aws-amplify'
import { Logger, AWSCloudWatchProvider, } from 'aws-amplify'

import { withAuthenticator, } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import awsconfig from './aws-exports';

const loggerPrefix = 'amplify-logger'
const appName = 'bccapp-staging'
const streamName = 'root'
const LOG_LEVEL = 'INFO'

Amplify.configure(awsconfig);

const logger = new Logger('BccAppLogger', LOG_LEVEL)
// Amplify.register(logger)
// logger.addPluggable(new AWSCloudWatchProvider())

// const BUCKET = awsconfig.aws_user_files_s3_bucket
// const REGION = awsconfig.aws_user_files_s3_bucket_region

//--------------------------------------------------
//  Component "App"
//  role:
//    Routing each page component which attached path
//--------------------------------------------------
const App = ({ signOut, user }) => {

  //--------------------------------------------------
  // const [credential, setCredential] = useState(null)

  //ComponentDidMount effect
  // useEffect(() => {

  //   // change and create logStream (if there is not it)
  //   Amplify.configure({
  //     Logging: {
  //       logGroupName: `/${loggerPrefix}/${appName}`,
  //       logStreamName: user.username,
  //     },
  //     ...awsconfig
  //   })
  //   Amplify.register(logger)
  //   logger.addPluggable(new AWSCloudWatchProvider())
  //   // logger.info(`Sing-in ${user.username}`)

  //   getCurrentCredentials()

  // }, [])

  // const getCurrentCredentials = async () => {
  //   const _credential = await Auth.currentUserCredentials()
  //   setCredential(_credential)
  // }
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

  const onFileUpload = (files) => {

    console.debug('Prefix: ', prefix)
    console.debug('Upload files: ', files)

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
      
      <BrowserRouter>
      
        <Routes>

          <Route
            path='/'
            element={<HomePage username={user.username} signOut={signOut} />}
          />

          <Route
            path='/dashboard' element={<DashboardPage username={user.username} />}
          />

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default withAuthenticator(App);