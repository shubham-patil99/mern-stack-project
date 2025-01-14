import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://whr.loans/">
          whhr.loans
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const defaultTheme = createTheme();

export default function SignInSide({ onSignIn }) {
    const [error, setError] = useState('');

    const responseMessage = (response) => {
        if (response && response.credential) {
            const decoded = jwtDecode(response.credential);
            onSignIn(decoded);
        } else {
            setError('Error: No credential found in response');
        }
    };

    const errorMessage = (error) => {
        setError(`Login error: ${error}`);
    };

    return (

        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography style={{color:"#1976d2"}} component="h1" variant="h7">
                Sign in with Google
              </Typography>
              <br /><br />
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                <Copyright sx={{ mt: 5 }} />
              </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}
