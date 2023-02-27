import React from 'react'

import { ChartsView } from '../views'
import { AppBase, } from '../templates'

//--------------------------------------------------
//  Component "DashboardPage"
//  role:
//    Rendering the something to show data to users
//--------------------------------------------------
const DashboardPage = (props) => {
  return (
    <div>
      <main>
        <ChartsView />
      </main>

    </div>
  )
}

export default DashboardPage