import React from 'react'

import { AppBar, } from '@mui/material'
import { Box, Toolbar, Typography, } from '@mui/material'
import { Button, IconButton, } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme()
theme = responsiveFontSizes(theme);

// theme.typography.h5 = {
//   fontSize: '1.0rem',
//   // '@media (min-width:600px)': {
//   //   fontSize: '1.5rem',
//   // },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '1.0rem',
//   },
// };

// theme.typography.h6 = {
//   fontSize: '1.0rem',
//   // '@media (min-width:600px)': {
//   //   fontSize: '1.5rem',
//   // },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '1.0rem',
//   },
// };

//==========
//  name: "AppHeader"
//  role: Reandering Appbar.
//  props:
//    appTitle: Application title (string type).
//    username: User name of current signed-in user.
//    onClickMenu: Event handler for clicked menu button.
//    onClickUser: Event handler for clicked user button.
//==========
const AppHeader = ({ appTitle, appSubtitle, username, onClickUser, onClickMenu }) => {
  return (
    <div>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}>

        <Toolbar>

          <IconButton
            size='large'
            color='inherit'
            sx={{
              mr: 2
            }}
            onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column'
            }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant='h6'
                noWrap={'true'}
                sx={{
                  display: 'flex',
                  
                }}>
                {appTitle}
              </Typography>

              <Typography
                variant='h5'
                noWrap={'true'}
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                }}>
                {appSubtitle}
              </Typography>
            </ThemeProvider>

          </Box>

          <Button
            color='inherit'
            onClick={onClickUser}
            size='large'>
            {username}
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppHeader