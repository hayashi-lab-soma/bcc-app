import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'

const BarChartCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color={'primary.main'}>ゴミ種類別 個数</Typography>
        <Bar
          aria-sort='ascending'
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

export default BarChartCard