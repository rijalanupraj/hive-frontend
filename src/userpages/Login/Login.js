import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './css/login.css';

import { useDispatch, useSelector } from 'react-redux';
// import { useAlert } from "react-alert";
import { clearErrors, userLogin } from '../../redux/actions/userActions';

// import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' style={{ textDecoration: 'inherit' }}>
        Samadhan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector(state => state.user);

  const [email, setLoginEmail] = useState('');
  const [password, setLoginPassword] = useState('');

  const loginSubmit = e => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  // console.log(email, password);

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/profile/update';
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' onSubmit={loginSubmit}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={e => setLoginEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={e => setLoginPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/forgotpassword' style={{ textDecoration: 'inherit' }} variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='register' variant='body2' style={{ textDecoration: 'inherit' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Login;
