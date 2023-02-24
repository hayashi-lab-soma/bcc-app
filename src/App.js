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

export default withAuthenticator(App, { hideSignUp: true });