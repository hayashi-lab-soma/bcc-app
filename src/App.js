import React, { useEffect, useState, } from 'react'

import { Charts, Home, } from './components/pages'

import { Amplify, Auth } from 'aws-amplify'
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

  //--------------------------------------------------
  // rendering function
  //--------------------------------------------------
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route
            path='/'
            element={
              <Home
                username={user.username} />
            }
          />

          <Route
            path='/charts'
            element={
              <Charts />
            }
          />

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default withAuthenticator(App);