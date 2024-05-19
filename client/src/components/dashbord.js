import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, TextField, Button, Box, Paper, Avatar, Grid, CssBaseline
} from '@mui/material';
// import SwipeableViews from 'react-swipeable-views';
import TabPanel from "./tabs"

const Dashboard = ({ givenName, familyName, email, picture }) => {


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard, Welcome {givenName}.
          </Typography>
        </Toolbar>
      </AppBar>
      <TabPanel  givenName={givenName} familyName={familyName} email={email} picture={picture} />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
      </Container>
    </Box>
  );
};

export default Dashboard;
