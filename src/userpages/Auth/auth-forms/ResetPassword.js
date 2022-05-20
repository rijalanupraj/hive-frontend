import { CssBaseline, Typography, Container, TextField, Button } from '@mui/material';
import React from 'react';

const ResetPassword = () => {
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
                  Reset Password
              </Typography>
              </div>
              
              <div>
              <Typography variant="h6" align="center" gutterBottom style={{
                  marginTop:'3vh',
                  fontFamily:"arial",
                  fontSize:'15px',
                  color:'#959696',
                  }}>
                Please enter your new password.
               </Typography>
               </div>

               <div>
               <TextField 
                   fullWidth 
                   label="New Password" 
                   id="fullWidth" 
                   style={{marginTop:'2vh'}}/>
               </div>

               <div>
               <TextField 
                    fullWidth 
                    label="Confirm Password"
                    id="fullWidth" 
                    style={{marginTop:'2vh'}}/>
               </div>

               <div>
               <Button variant="contained" fullWidth={true} style={{
                   padding: '13px', marginTop:'1vh', borderRadius: '10px'
               }}>
                    Done
                </Button>
               </div>

               
          </div>
          
          </Container>

      </main>
      
      </>
      
  )
}

export default ResetPassword;