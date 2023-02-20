import React from 'react'

import {Card, CardContent, Typography} from '@mui/material'
import { Pie } from 'react-chartjs-2'

const PiChartCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color={'primary.main'}>ゴミ種類別割合</Typography>
        <Pie
          data={props.data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: false
              }
            }
          }} />
      </CardContent>
    </Card>
  )
}

export default PiChartCard