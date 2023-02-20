import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'
//--------------------------------------------------
// CountCardItem
//  props:
//    numPhotos: Number of posted photos
//    numInferenced: Number of inferenced photos
//--------------------------------------------------
const CountCard = (props) => {
  return (
    <Card >
      <CardContent>
        <Typography color={"primary.main"}>画像枚数</Typography>
        <Typography variant='h4'>{props.numPhotos}枚</Typography>
        <Typography color={"secondary.main"}>AI推論処理件数</Typography>
        <Typography variant='h6'>{props.numInferenced}枚</Typography>
        <Typography color={"primary.main"}>ゴミ検出数</Typography>
        <Typography variant='h4'>{props.numGarbages}個</Typography>
      </CardContent>
    </Card >
  )
}

export default CountCard