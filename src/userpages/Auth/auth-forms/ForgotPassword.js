import { CssBaseline, Typography, Container, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../../components/Page';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onFormSubmit = async e => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/v1/auth/recover', { email })
      .then(res => {
        console.log(res);
        setSuccess(res.data.message);
        setEmail('');
        setError('');
      })
      .catch(err => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <Page title="Forgot Password">
    
      <main>
        <Container maxWidth='sm'>
          <div>
            <div>
              <Typography
                variant='h4'
                align='center'
                gutterBottom
                style={{
                  marginTop:'1rem',
                  fontWeight: 'bold',
                  fontFamily: 'arial',
                  fontSize: '35px'
                }}
              >
                Forgot Your Password?
              </Typography>
            </div>

            <div>
              <Typography
                variant='h6'
                align='center'
                gutterBottom
                style={{
                  marginTop: '3vh',
                  fontFamily: 'arial',
                  fontSize: '15px',
                  color: '#959696'
                }}
              >
                Please enter the email address associated with your account and We will email you a
                link to reset your password.
              </Typography>
            </div>
            <form onSubmit={onFormSubmit}>
              <div>
                <TextField
                  fullWidth
                  required
                  label='email address'
                  id='fullWidth'
                  style={{ marginTop: '2vh' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <Alert severity='error' style={{ marginTop: '2vh' }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity='success' style={{ marginTop: '2vh' }}>
                  {success}
                </Alert>
              )}

              <div>
                <Button
                  variant='contained'
                  type='submit'
                  fullWidth={true}
                  style={{
                    padding: '13px',
                    marginTop: '1vh',
                    borderRadius: '10px'
                  }}
                >
                  Send Request
                </Button>
              </div>
            </form>

            <div>
              <RouterLink to='/login'>
                <Button
                  fullWidth={true}
                  style={{
                    padding: '15px',
                    marginTop: '1vh',
                    borderRadius: '10px'
                  }}
                >
                  Back
                </Button>
              </RouterLink>
            </div>
          </div>
        </Container>
      </main>

    </Page>
 
  );
};

export default ForgotPassword;
