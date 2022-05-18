import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import "./css/PostSolution.css";

const PostSolution = () => {
  return (
    <>
    <CssBaseline />
    <Container maxWidth='lg'>
      <div>
        <Box sx={{ maxWidth:'sm', bgcolor: '#fafafa', height: '13vh', marginTop:'2vh', boxShadow: '1px 1px #dbdbdb', borderRadius: '10px'}} />
      </div>

      <div className='containertwo'>
        <Box sx={{ bgcolor: '#fafafa', height: '50vh', marginTop:'2vh', boxShadow: '1px 1px #dbdbdb', borderRadius: '15px'}}>
          <div className='title'>
            <Typography variant="h5">
              Your Answer
            </Typography>     
          </div>

          <div className='titleIntro'>
            <Typography variant="h7">
              Short Introduction
            </Typography>     
          </div>
        
        </Box>
      </div>
        
    </Container>
    </>
  )
}

export default PostSolution;