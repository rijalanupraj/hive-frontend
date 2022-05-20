import { CssBaseline, Typography, Container, TextField, Button } from '@mui/material';
import React from 'react';

const ForgotPassword = () => {
  return (
      <>
      <CssBaseline/>
      <main>
          <Container maxWidth='sm'>

          
          <div>
              <div>
              <Typography variant="h4" align="center" gutterBottom style={{
                  marginTop:'25vh',
                  fontWeight:'bold',
                  fontFamily:"arial",
                  fontSize:'35px',
                  }}>
                  Forgot Your Password?
              </Typography>
              </div>
              
              <div>
              <Typography variant="h6" align="center" gutterBottom style={{
                  marginTop:'3vh',
                  fontFamily:"arial",
                  fontSize:'15px',
                  color:'#959696',
                  }}>
              Please enter the email address associated with your account and We will email you a link to reset your password.
               </Typography>
               </div>

               <div>
               <TextField fullWidth label="email address" id="fullWidth" style={{marginTop:'2vh'}}/>
               </div>

               <div>
               <Button variant="contained" fullWidth={true} style={{
                   padding: '13px', marginTop:'1vh', borderRadius: '10px'
               }}>
                    Send Request
                </Button>
               </div>

               <div>
               <Button href="/login" fullWidth={true} style={{
                   padding: '15px', marginTop:'1vh', borderRadius: '10px'
               }}>
                   Back</Button>
               </div>
          </div>
          
          </Container>

      </main>
      
      </>
      
  )
}

export default ForgotPassword;