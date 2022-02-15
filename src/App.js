import React from 'react'
import './App.css';
import {Amplify, Auth} from 'aws-amplify';
import {withAuthenticator,} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default withAuthenticator(App);
