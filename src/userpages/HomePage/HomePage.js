import React, {useEffect} from 'react';
import "./css/Homepage.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { logOutUser } from '../../redux/actions/authActions';
import {Grid, Paper, Box, styled, Typography, ButtonBase, Stack, IconButton} from '@mui/material';

import {getAllSolutionHome} from '../../redux/actions/solutionActions';
import SolutionCard from './components/SolutionCard';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function HomePage() {
  const auth = useSelector(state => state.auth);
  const solution = useSelector(state => state.solution);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect (() => {
    dispatch(getAllSolutionHome());
  } , [auth]);

  return (
    <Page title="Home">
      <RootStyle>
        <Paper style={{
          width: '100%',
          backgroundColor:'#f2f6fc',
          boxShadow: 'none',
        }}>
          
        <Grid container spacing={5} style={{
          marginTop: '1rem',
          padding:'1.5rem',
          
        }}>
{/* ======================================================================================================================= */}
          {/* Left */}
          <Grid item xs="3" >
            <Paper variant='outlined' style={{
                  padding: '1rem',
                }}>
              <Typography variant='h6' style={{
                paddingLeft: '1rem',
              }}>
                Category
              </Typography>

              <ul>
                <a href="/" className='anchor'><li >Bank</li></a>
                <li>Government</li>
                <li>Visa</li>
              </ul>
              <Typography variant='h7'>
                <a href='/' style={{
                  textDecoration: 'none',	
                  paddingLeft: '1rem',
                }}>See More...</a>
              </Typography>
              
            </Paper>
            
          </Grid>
{/* ====================================================================================================================== */}
          {/* Center */}

          <Grid item xs={6} style={{
            height: '100%',
          }}>


            {/* question header */}
            <div>
              <Paper variant='outlined' style={{
                padding: '1rem',
              }}>
                
                {/* profile pic and ask question */}
                <Grid container spacing={2}>
                  <Grid item xs={1.5}>
                    <Box style={{
                      paddingLeft: '2rem',	
                    }}>

                      <img
                        // src={
                        //   user.profilePhoto && user.profilePhoto.hasPhoto && user.profilePhoto.url
                        //     ? user.profilePhoto.url
                        //     : 'http://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png'
                        // }

                        src={
                            'http://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png'
                          }
                        alt="logo"
                        style={{
                          borderRadius:'50%',
                          width:'120%',
                        }}
                        
                      />
                    </Box>    
                  </Grid>
                  
                  {/* ask question */}
                  <Grid item xs={10}>
                   <Box
                      sx={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#e3e3e3',
                        '&:hover': {
                          opacity: [0.9, 0.8, 0.7],
                        },
                        borderRadius: '10px',
                      }}
                    >
                    <p style={{
                      padding: '0.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      }}>
                        <a href='/ask-question' className='anchor'>What's Your Question?</a></p>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </div>

            {/* home tranding, new post, best post */}

            <Paper variant='outlined' style={{
                padding: '1rem',
                marginTop: '0.7rem',
              }}>
                <Grid container spacing={2}>
  
                  <Grid item xs={6}>

                  </Grid>

                </Grid>

            </Paper>

            {/* Solution */}
            {
              solution.homeSolutions && solution.homeSolutions.map((sol, index) => (
                <SolutionCard key={index} solution={sol}/>
              ))
            }
           



          </Grid>
{/* ============================================================================================================================== */}

          {/* Right */}
          <Grid item xs='3'>
            <Paper variant='outlined' style={{
                  padding: '1rem',
                  	
              }}>
                <Typography variant='h6' style={{
                  paddingLeft: '1rem',
                }}>
                  Most Searched Questions
                </Typography>
                <br/>
                <ul>
                  <a href='/view-solution' className='anchor'><li>How to make an bank account in NIC asia?</li></a>
                  <li>How to apply for EDV</li>
                  <li>How to apply for Australia in Student Visa?</li>
                </ul>
            
              
            </Paper>

            <Paper variant='outlined' style={{
                  padding: '1rem',
                  marginTop: '1rem',
                }}>
              
            </Paper>
           
          </Grid>
        </Grid>
        </Paper>

        
        
      </RootStyle>
      <div style={{
      margin: '20vh',
      backgroundColor: '#fff',
      textAlign: 'center',
    }}>
      This is Home Page
      {auth.isAuthenticated ? <p>You are logged in</p> : <p>You are not logged in</p>}
      {auth.isAuthenticated ? (
        <button onClick={() => dispatch(logOutUser(navigate))}>Log Out</button>
      ) : (
        <button onClick={() => navigate('/login')}>Log In</button>
      )}
    </div>
    </Page>
  );
}

export default HomePage;
