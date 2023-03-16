import React, { useEffect, useState } from 'react'

import { CountCard, PieChartCard, BarChartCard } from '../parts'

import { Box, Grid, } from '@mui/material'
import { Storage } from 'aws-amplify'
import { Chart, registerables } from "chart.js"
import { forEach } from 'lodash'
Chart.register(...registerables)

const ChartsView = (props) => {

  const [numPhotos, setNumPhotos] = useState(0)
  const [numInferencedPhotos, setNumInferencedPhotos] = useState(0)
  const [numGarbages, setNumGarbages] = useState(0)
  const [resultJson, setResultJson] = useState()

  const labels2 = [
    'プラスチック製品',
    'ペットボトル',
    '缶',
    'ガラス類',
    '金属類',
    '紙類',
    'ゴム類',
    '発泡スチロール',
    'ロープ・ひも類',
    'タバコ',
    'その他'
  ]

  const labels = [
    '金属類',
    'その他',
    '金属類',
    'その他',
    'ペットボトル',
    'ペットボトル',
    'ガラス製ボトル',
    'ペットボトル',
    '金属類',
    'ガラス類',
    '缶',
    'その他',
    '缶',
    'ゴム類',
    '紙類',
    '紙類',
    '紙類',
    '紙類',
    '紙類',
    '紙類',
    '紙類',
    'プラスチック製品',
    'その他',
    'ガラス類',
    'プラスチック製品',
    '生ごみ',
    'ガラス類',
    'プラスチック製品',
    '金属類',
    'プラスチック製品',
    '紙類',
    '紙類',
    'プラスチック製品',
    '紙類',
    '紙類',
    'プラスチック製品',
    'プラスチック製品',
    'その他',
    'その他',
    'プラスチック製品',
    'その他',
    'プラスチック製品',
    'プラスチック製品', ,
    'その他',
    'その他',
    'プラスチック製品',
    'プラスチック製品',
    'プラスチック製品',
    'プラスチック製品',
    'プラスチック製品',
    'プラスチック製品',
    'ロープ・ひも類',
    '金属類',
    'その他',
    'その他',
    'プラスチック製品',
    'プラスチック製品',
    '発泡スチロール',
    'その他',
    'タバコ'
  ]

  // const labels = [
  //   'Alminum foil',
  //   'Battery',
  //   'Aluminium blister pack',
  //   'Carded blister pack',
  //   'Other plastic bottle',
  //   'Clear plastic bottle',
  //   'Glass bottle',
  //   'Plastic bottle cap',
  //   'Metal bottle cap',
  //   'Broken glass',
  //   'Food Can',
  //   'Aerosol',
  //   'Drink can',
  //   'Toilet tube',
  //   'Other carton',
  //   'Egg carton',
  //   'Drink carton',
  //   'Corrugated carton',
  //   'Meal carton',
  //   'Pizza box',
  //   'Paper cup',
  //   'Disposable plastic cup',
  //   'Foam cup',
  //   'Glass cup',
  //   'Other plastic cup',
  //   'Food waste',
  //   'Glass jar',
  //   'Plastic lid',
  //   'Metal lid',
  //   'Other plastic',
  //   'Magazine paper',
  //   'Tissues',
  //   'Wrapping paper',
  //   'Normal paper',
  //   'Paper bag',
  //   'Plastified paper bag',
  //   'Plastic film',
  //   'Six pack rings',
  //   'Garbage bag',
  //   'Other plastic wrapper',
  //   'Single-use carrier bag',
  //   'Polypropylene bag',
  //   'Crisp packet',
  //   'Spread tub',
  //   'Tupperware',
  //   'Disposable food container',
  //   'Foam food container',
  //   'Other plastic container',
  //   'Plastic glooves',
  //   'Plastic utensils',
  //   'Pop tab',
  //   'Rope & strings',
  //   'Scrap metal',
  //   'Shoe',
  //   'Squeezable tube',
  //   'Plastic straw',
  //   'Paper straw',
  //   'Styrofoam piece',
  //   'Unlabeled litter',
  //   'Cigarette'
  // ]

  const [data, setData] = useState({
    labels: labels2,
    datasets: [
      {
        label: 'Garbages',
        data: new Array(labels2.length).fill(0)
      }
    ]
  })

  const fetch = async () => {
    try {
      const photos = await Storage.list('', { level: 'private', pageSize: 'ALL' })
      const inferences = await Storage.list('raws/', { level: 'protected', pageSize: 'ALL' })
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
      // console.debug(results)
      setResultJson(results[0])
    }
    catch (e) {
      console.error(e)
    }
  }

  const createLabelAndData = (raw_data) => {
    let newCount = new Array(labels2.length).fill(0)
    raw_data.forEach((id) => {
      console.debug(id, raw_data[id])

      //プラスチック類
      newCount[0] = raw_data[7] + raw_data[21] + raw_data[24] + raw_data[27] + raw_data[29]
        + raw_data[32] + raw_data[36] + raw_data[38] + raw_data[39] + raw_data[41]
        + raw_data[45] + raw_data[47] + raw_data[48] + raw_data[49] + raw_data[50]
        + raw_data[55]

      //ペットボトル
      newCount[1] = raw_data[4] + raw_data[5]

      //缶
      newCount[2] = raw_data[10] + raw_data[12]

      //ガラス類
      newCount[3] = raw_data[6] + raw_data[9] + raw_data[23] + raw_data[26]

      //金属類
      newCount[4] = raw_data[0] + raw_data[2] + raw_data[3] + raw_data[8] + raw_data[28] + raw_data[52]

      //紙類
      newCount[5] = raw_data[14] + raw_data[15] + raw_data[16] + raw_data[17] + raw_data[18]
        + raw_data[19] + raw_data[20] + raw_data[22] + raw_data[30] + raw_data[31]
        + raw_data[33] + raw_data[34] + raw_data[35] + raw_data[56]

      //ゴム類
      newCount[6] = raw_data[13]

      //発泡スチロール類
      newCount[7] = raw_data[46] + raw_data[57]

      //ロープ・ひも類
      newCount[8] = raw_data[51]

      //タバコ
      newCount[9] = raw_data[59]

      //その他
      newCount[10] = raw_data[1] + raw_data[11] + raw_data[25] + raw_data[37] + raw_data[40]
        + raw_data[42] + raw_data[42] + raw_data[43] + raw_data[44] + raw_data[53]
        + raw_data[58]
    })

    return newCount
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {

    (async () => {
      const blob = await Storage.get(resultJson.key, { level: 'protected', download: true })
      const _json = await blob.Body.text()
      const json = JSON.parse(_json)

      // console.debug(json)

      let countData = new Array(labels.length).fill(0)
      Object.keys(json).forEach((objId) => {
        countData[Number(objId)] = Number(json[objId])
      })

      let newCount = createLabelAndData(countData)
      // console.log(countData, newCount)
      // console.log(countData)


      // create object type
      const _objDict = labels2.map((label, i) => {
        return {
          label: label,
          count: newCount[i]
        }
      })

      const objDict = _objDict.sort((a, b) => { return -(a.count - b.count) })


      setData({
        labels: objDict.map((o,i) => {return o.label}),
        datasets: [
          {
            // label: labels2,
            data: objDict.map((o,i) => {return o.count})
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