import React, { useState, useRef } from 'react'
import { Box, Grid, } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, } from '@mui/material'
import { Button, } from '@mui/material'
import { Select, MenuItem, FormControl, InputLabel, } from '@material-ui/core'

import {formatToTimeZone} from 'date-fns-timezone';

const FORMAT = 'YYYY-MM-DD_HH:mm'
const TIME_ZONE_TOKYO = 'Asia/Tokyo';

const CapturedImageDialog = (props) => {
  const [folderId, setFolder] = useState('');
  const prefix = useRef('')

  const handleChange = (event) => {
    setFolder(event.target.value)
    prefix.current.value = ''
  }

  return (

    <Dialog
      open={props.open}
      onClose={props.onClose}
    >

      <DialogTitle>アップロード確認</DialogTitle>

      <DialogContent>
        <Box
          fullWidth
          margin={1}
        >
          <img src={props.srcImg} alt='Captured ...' />
        </Box>

        <Box
          fullWidth
          justifyContent={'space-evenly'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}>

          <TextField
            value={folderId}
            onChange={handleChange}
            select
            label="フォルダ選択"
            sx={{ ml: 1, mr: 1, minWidth: '300px' }}>
            <MenuItem value='create-folder'>新規作成</MenuItem>
            {
              props.files.map((file, index) => {
                return (file.isDir &&
                  <MenuItem value={file.id}>{file.name}</MenuItem>)
              })
            }
          </TextField>


          {folderId === "create-folder" &&

            <TextField
              defaultValue={
                new Date().getTime()
                + '(' + formatToTimeZone(new Date(), FORMAT, {timeZone: TIME_ZONE_TOKYO})
                + ')'
              }
              label="フォルダ名"
              inputRef={prefix}
              sx={{ ml: 1, mr: 1, minWidth: '300px' }}></TextField>
          }

        </Box>

        <DialogActions>
          <Button variant='text' onClick={props.onClose}>キャンセル</Button>
          <Button variant='text'
            onClick={() => {
              props.onSubmit(
                folderId === 'create-folder' ? prefix.current.value + '/' : folderId)
            }}>
            送信</Button>
        </DialogActions>

      </DialogContent>
    </Dialog>

  )
}

export default CapturedImageDialog