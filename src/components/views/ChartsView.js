import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography, } from '@mui/material'
import { Card, CardContent, } from '@mui/material'
import { Storage } from 'aws-amplify'
import { Chart, registerables } from "chart.js"
import { Bar, Pie } from 'react-chartjs-2'

Chart.register(...registerables)

const ChartsView = (props) => {

  const [numPhotos, setNumPhotos] = useState(0)
  const [numGarbages, setNumGarbages] = useState(0)
  const [jsonObjs, setJsonObjs] = useState([])

  const labels = ['アルミホイル', 'Battery', 'Aluminium blister pack', 'Carded blister pack', 'Other plastic bottle', 'Clear plastic bottle', 'Glass bottle', 'Plastic bottle cap', 'Metal bottle cap', 'Broken glass', 'Food Can', 'Aerosol', 'Drink can', 'Toilet tube', 'Other carton', 'Egg carton', 'Drink carton', 'Corrugated carton', 'Meal carton', 'Pizza box', 'Paper cup', 'Disposable plastic cup', 'Foam cup', 'Glass cup', 'Other plastic cup', 'Food waste', 'Glass jar', 'Plastic lid', 'Metal lid', 'Other plastic', 'Magazine paper', 'Tissues', 'Wrapping paper', 'Normal paper', 'Paper bag', 'Plastified paper bag', 'Plastic film', 'Six pack rings', 'Garbage bag', 'Other plastic wrapper', 'Single-use carrier bag', 'Polypropylene bag', 'Crisp packet', 'Spread tub', 'Tupperware', 'Disposable food container', 'Foam food container', 'Other plastic container', 'Plastic glooves', 'Plastic utensils', 'Pop tab', 'Rope & strings', 'Scrap metal', 'Shoe', 'Squeezable tube', 'Plastic straw', 'Paper straw', 'Styrofoam piece', 'Unlabeled litter', 'Cigarette']

  const [data, setData] = useState({
    labels,
    datasets: [{ label: 'Garbages', data: new Array(labels.length).fill(0) }]
  })

  const fetch = async () => {
    try {
      const photos = await Storage.list('raws/', { level: 'protected' })
      // console.log(photos.results.length)
      setNumPhotos(photos.results.length)
    }
    catch (e) {
      console.error(e)
    }

    try {
      const jsons = await Storage.list('jsons/', { level: 'protected' })
      // console.debug(jsons.results)
      setJsonObjs(jsons.results)
    }
    catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {

    (async () => {
      const jsons = await Promise.all(jsonObjs.map(async (jsonObj, i) => {
        const key = jsonObj.key
        const blob = await Storage.get(key, { level: 'protected', download: true })
        const _json = await blob.Body.text()
        const json = JSON.parse(_json)
        // console.log(json)
        return json
      }))
      // console.log(ret)

      let newData = data.datasets[0].data
      // console.log(newData)

      jsons.forEach((json) => {
        Object.keys(json).forEach((key) => {
          // console.log(key, json[key])
          newData[Number(key)] = newData[Number(key)] + json[key].length
        })

        setData({
          labels,
          datasets: [
            {
              // label: 'Garbages', 
              data: newData
            }
          ]
        })

      })

    })()

  }, [jsonObjs])

  useEffect(() => {
    const total = data.datasets[0].data.reduce((sum, elem) => {
      return sum + elem
    })
    setNumGarbages(total)
  }, [data])

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Garbages',
  //       data: [1, 2, 3]
  //     }
  //   ]
  // }
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: false
  //     }
  //   }
  // }

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
        }}>

        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color={"primary.main"}>画像枚数</Typography>
                <Typography variant='h4'>{numPhotos}枚</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            <Card>
              <CardContent>
                <Typography color={"primary.main"}>ゴミ合計数</Typography>
                <Typography variant='h4'>{numGarbages}個</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant='h6' color={'primary.main'}>種類別割合</Typography>
                <Pie
                  data={data}
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
          </Grid>

          <Grid item xs={12} md={12}>
            <Card>
              <CardContent>
                <Typography variant='h6' color={'primary.main'}>ゴミ種類別 個数</Typography>
                <Bar
                  data={data}
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
          </Grid>

        </Grid>

      </Box>

    </div>
  )
}

export default ChartsView