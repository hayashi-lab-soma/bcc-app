import React, { useEffect, useState } from 'react'

import { CountCard, PieChartCard, BarChartCard } from '../parts'

import { Box, Grid, } from '@mui/material'
import { Storage } from 'aws-amplify'
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const ChartsView = (props) => {

  const [numPhotos, setNumPhotos] = useState(0)
  const [numInferencedPhotos, setNumInferencedPhotos] = useState(0)
  const [numGarbages, setNumGarbages] = useState(0)
  const [resultJson, setResultJson] = useState()

  const labels = [
    'Alminum foil',
    'Battery',
    'Aluminium blister pack',
    'Carded blister pack',
    'Other plastic bottle',
    'Clear plastic bottle',
    'Glass bottle',
    'Plastic bottle cap',
    'Metal bottle cap',
    'Broken glass', 'Food Can', 'Aerosol', 'Drink can', 'Toilet tube', 'Other carton', 'Egg carton', 'Drink carton', 'Corrugated carton', 'Meal carton', 'Pizza box', 'Paper cup', 'Disposable plastic cup', 'Foam cup', 'Glass cup', 'Other plastic cup', 'Food waste', 'Glass jar', 'Plastic lid', 'Metal lid', 'Other plastic', 'Magazine paper', 'Tissues', 'Wrapping paper', 'Normal paper', 'Paper bag', 'Plastified paper bag', 'Plastic film', 'Six pack rings', 'Garbage bag', 'Other plastic wrapper', 'Single-use carrier bag', 'Polypropylene bag', 'Crisp packet', 'Spread tub', 'Tupperware', 'Disposable food container', 'Foam food container', 'Other plastic container', 'Plastic glooves', 'Plastic utensils', 'Pop tab', 'Rope & strings', 'Scrap metal', 'Shoe', 'Squeezable tube', 'Plastic straw', 'Paper straw', 'Styrofoam piece', 'Unlabeled litter', 'Cigarette']

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Garbages',
        data: new Array(labels.length).fill(0)
      }
    ]
  })

  const fetch = async () => {
    try {
      const photos = await Storage.list('', { level: 'private' })
      const inferences = await Storage.list('raws/', { level: 'protected' })
      // console.log(photos.results.length)
      setNumPhotos(photos.results.length)
      setNumInferencedPhotos(inferences.results.length)
    }
    catch (e) {
      console.error(e)
    }

    try {
      const res = await Storage.list('', { level: 'protected' })
      // const res = await Storage.list('jsons/', { level: 'protected' })
      // console.debug(res.results)
      const results = res.results.filter(item => item.key !== "").filter(item => item.key.split('.').pop() === "results")
      console.debug(results)
      setResultJson(results[0])
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
      const blob = await Storage.get(resultJson.key, { level: 'protected', download: true })
      const _json = await blob.Body.text()
      const json = JSON.parse(_json)

      console.debug(json)

      let countData = new Array(labels.length).fill(0)
      Object.keys(json).forEach((objId) => {
        countData[Number(objId)] = Number(json[objId])
      })

      // console.log(countData)

      setData({
        labels,
        datasets: [
          {
            data: countData
          }
        ]
      })

      setNumGarbages(json['total'])

    })()

  }, [resultJson])

  // useEffect(() => {
  //   const total = data.datasets[0].data.reduce((sum, elem) => {
  //     return sum + elem
  //   })
  //   setNumGarbages(total)
  //   // console.log(data)
  // }, [data])

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
        }}>

        <Grid container spacing={2}>

          <Grid item xs={12} md={4}>
            <CountCard
              numPhotos={numPhotos}
              numInferenced={numInferencedPhotos}
              numGarbages={numGarbages} />
          </Grid>

          <Grid item xs={12} md={6}>
            <PieChartCard
              data={data} />
          </Grid>

          <Grid item xs={12} md={12}>
            <BarChartCard
              data={data} />
          </Grid>

        </Grid>

      </Box>

    </div>
  )
}

export default ChartsView