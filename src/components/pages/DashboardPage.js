import React from 'react'

import { ChartsView } from '../views'
import { AppBase, } from '../templates'

const DashboardPage = (props) => {
  return (
    <div>
      <header>
        <AppBase
          username={props.username} />
      </header>

      <main>
        <ChartsView />
      </main>

    </div>
  )
}

export default DashboardPage