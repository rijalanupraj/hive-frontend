import React from 'react';
import "./css/Homepage.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { logOutUser } from '../../redux/actions/authActions';
import {Grid, Paper, Box, styled, Typography, ButtonBase, Stack, IconButton} from '@mui/material';
import { LoadingButton} from '@mui/lab';
import MailIcon from '@mui/icons-material/Mail';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

            <div>
            <Paper variant='outlined' style={{
                padding: '1rem',
                marginTop: '0.7rem',
              }}>
              <Grid container spacing={2}>

                <Grid item  style={{
                    paddingLeft: '1.5rem',
                  }}>
                  <ButtonBase sx={{width:10, height: 10 }}>
                    {/* profile */}
                    <img alt="complex" src={
                              'http://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png'
                            }
                            style={{
                              borderRadius:'50%',
                              width:'400%',
                            }} 
                            />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={0}>
                    <Grid item xs>

                      {/* username */}
                      <Typography variant="body1" gutterBottom style={{                      
                              paddingLeft: '0.5rem',
                              fontWeight: 'bold',
                              marginTop: '-0.3rem',
                            }}>
                        Samadhan Bro
                      </Typography>

                      {/* posted on */}
                      <Typography variant="body2" color="text.secondary" style={{                           
                              paddingLeft: '0.5rem',
                              marginTop: '-0.5rem',
                            }}>
                        Posted On May 25, 2022
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* follow button */}
                  <Grid item>
                    
                    <LoadingButton
                      fullWidth
                      size='small'
                      type='submit'
                      variant='contained'
                    >
                      Follow
                    </LoadingButton>
                  </Grid>
                  
                </Grid>

                
              </Grid>

              {/* read solution */}
              <Stack style={{
                marginTop: '1rem',
              }}>
                <Stack>
                  <Typography variant="h8" style={{
                    fontWeight: 'bold',
                  }}>
                      How to get a driving license?
                  </Typography>
                </Stack>
              
                <Stack>
                  <ol>
                    <li>Keep on Driving</li>
                    <li>Keep on Driving</li>
                    <li>Keep on Driving</li>
                    <li>When you get it, tell us too.<a href='/'>(see more)</a></li>
                  </ol>
                </Stack>
                
                
              </Stack>

              {/* picture */}
              <Stack>
                  <div style={{
                    backgroundColor:'#2d2b1f',
                    backgroundSize: 'cover',
                  }}>
                    <img alt="Unavailable" src={
                                'https://business.wisc.edu/wp-content/uploads/2019/01/triumph-490x327-1.jpg'
                              }
                              style={{
                                display:'block',
                                marginLeft:'auto',
                                marginRight:'auto', 
                                width:'70%',
                                backgroundSize: 'cover',
                              }} 
                              />
                  </div>
                </Stack>

                {/* upvote/downvote section */}
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={0}>
                    <Grid item xs>
                      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* upvote */}
                        <IconButton size='large' aria-label='upvote' color='inherit'>
                        <ArrowUpwardIcon /><Typography variant="body2" color="text.secondary" style={{                           
                                          paddingLeft: '0.3rem',
                                          marginTop: 'auto',
                                          marginBottom:'bottom',
                                        }}>
                                    99
                                  </Typography>
                        </IconButton>
                        
                        {/* downvote */}
                        <IconButton size='large' aria-label='downvote' color='inherit'>
                          <ArrowDownwardIcon />
                        </IconButton>

                        {/* comment */}
                        <IconButton size='large' aria-label='comment' color='inherit'
                        >
                            <ChatBubbleOutlineIcon /><Typography variant="body2" color="text.secondary" style={{                           
                                          paddingLeft: '0.3rem',
                                          marginTop: 'auto',
                                          marginBottom:'bottom',
                                        }}>
                                    13
                                  </Typography>
                        </IconButton>

                        {/* share */}
                        <IconButton size='large' aria-label='share' color='inherit'>
                          
                          <ShareIcon /><Typography variant="body2" color="text.secondary" style={{                           
                                          paddingLeft: '0.3rem',
                                          marginTop: 'auto',
                                          marginBottom:'bottom',
                                        }}>
                                    33
                                  </Typography>
                  
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      {/* bookmark */}
                      <IconButton size='large' aria-label='bookmark' color='inherit'>
                              
                        <BookmarkBorderIcon/>
                        
                      </IconButton>

                      {/* report */}
                      <IconButton size='large' aria-label='report' color='inherit'>
                        
                        <FlagIcon/>
                
                      </IconButton>
                    
                    </Box>
                    
                  </Grid>
                  
                </Grid>
                              
            </Paper>

            </div>



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
