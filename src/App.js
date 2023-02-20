import React, { useEffect, useState, } from 'react'

import { HomePage, DashboardPage } from './components/pages'

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

  //--------------------------------------------------
  // rendering function
  //--------------------------------------------------
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route
            path='/'
            element={<HomePage username={user.username} />}
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