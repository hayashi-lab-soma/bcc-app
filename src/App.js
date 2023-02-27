import React from 'react'

import { HomePage, DashboardPage } from './components/pages'
import { AppBase } from './components/templates'

import { Amplify } from 'aws-amplify'

import { withAuthenticator, } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import awsconfig from './aws-exports';
import { Toolbar } from '@mui/material'

Amplify.configure(awsconfig);

// const logger = new Logger('BccAppLogger', LOG_LEVEL)
// Amplify.register(logger)
// logger.addPluggable(new AWSCloudWatchProvider())

//==========
//  name: "App"
//  role: Routing to each page.
//  props:
//    "signOut": The handler function to sign out, which get from "withAuthenticator".
//    "user": Information of sign-in user who is Cognito User.
//==========
const App = ({ signOut, user }) => {

  return (
    <div>
      <BrowserRouter>
        <header>
          <AppBase
            username={user.username}
            signOut={signOut}
          />
        </header>

        <main>
          <Routes>

            <Route
              path='/'
              element={
                <HomePage />
              }
            />

            <Route
              path='/dashboard' element={
                <DashboardPage />}
            />

          </Routes>
        </main>

      </BrowserRouter>
    </div >
  );
}

export default withAuthenticator(App, { hideSignUp: true });