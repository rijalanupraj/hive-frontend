import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import "./css/PostSolution.css";
import Paper from "@mui/material/Paper";
import { Stack, TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from "@mui/material/Autocomplete";
import { LoadingButton } from "@mui/lab";

const Input = styled('input')({
  display: 'none',
});

const questiontag = [
  { title: "samadhan" },
  { title: "school" },
  { title: "college" },
  { title: "government" },
  { title: "hospital" },
  { title: "travel" },
  { title: "rules" },
  { title: "Relationship" },
  { title: "law" },
];

const PostSolution = () => {

  return (
    <>
    <CssBaseline />
    <Container maxWidth='md'>
      <div>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} 
        >
          <p>How to make a passport?</p>
        </Paper>
      </div>

      <div className='containertwo'>
 
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
        
        {/* Header */}
          <div className='title'>
            <Typography variant="h5" style={{
              fontWeight:"bold",
            }}>
              Your Answer
            </Typography>     
          </div>
         
         {/* Intro */}
          <div className='titleIntro'>
            <Typography variant="h7" style={{
              fontWeight:"bold"
            }}>
              Short Introduction
            </Typography> 

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextareaAutosize
                    label="Optional"
                    required
                    style={{
                      width: "100%",
                      fullWidth: true,
                      marginTop: '2vh',
                    }}
                    minRows={4}
                    placeholder="This is Optional"
                    // error={Boolean(touched.description && errors.description)}
                    // helperText={touched.description && errors.description}
                  />
            </Stack>    

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} style={{
              marginTop:"5vh"
            }}>
            <Typography variant="h7" style={{
              fontWeight:"bold"
            }}>
              Attach Image
            </Typography> 
            </Stack>

            <Stack style={{marginTop:'2vh'}}>
              <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                <label htmlFor="contained-button-file"  style={{
                    alignContent:"center"
                  }}>
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Box>    
            </Stack>

            {/* Step 1 */}

            <div className='step1'>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} style={{
                marginTop:"5vh"
              }}>
                <Typography variant="h7" style={{
                  fontWeight:"bold"
                }}>
                  Step 1
                </Typography> 
              </Stack>

              <Grid container spacing={2} columns={16} style={{marginTop:'1vh'}}>
                <Grid item xs={8}>
                  <TextField fullWidth label="1" id="fullWidth" />
                </Grid>
                <Grid item xs={8}>

                <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} >
                  <label htmlFor="contained-button-file"  style={{marginTop:"1vh"}}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>   
                  </label>          
                </Box>               
                </Grid>
              </Grid>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextareaAutosize
                      label="Describe"
                      required
                      style={{
                        width: "100%",
                        fullWidth: true,
                        marginTop: '2vh',
                      }}
                      minRows={4}
                      placeholder="Describe"
                    />
              </Stack>  
            </div>
            {/* end step 1 */}

            {/* Step 2 */}
            <div className='step2'>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} style={{
                marginTop:"5vh"
              }}>
                <Typography variant="h7" style={{
                  fontWeight:"bold"
                }}>
                  Step 2
                </Typography> 
              </Stack>

              <Grid container spacing={2} columns={16} style={{marginTop:'1vh'}}>
                <Grid item xs={8}>
                  <TextField fullWidth label="2" id="fullWidth" />
                </Grid>
                <Grid item xs={8}>

                <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} >
                  <label htmlFor="contained-button-file"  style={{marginTop:"1vh"}}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>   
                  </label>          
                </Box>               
                </Grid>
              </Grid>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextareaAutosize
                      label="Describe"
                      required
                      style={{
                        width: "100%",
                        fullWidth: true,
                        marginTop: '2vh',
                      }}
                      minRows={4}
                      placeholder="Describe"
                      // error={Boolean(touched.description && errors.description)}
                      // helperText={touched.description && errors.description}
                    />
              </Stack>
            </div>
            {/* end step 2 */}
             
            {/* add step */}
            <div className='addStep'>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} style={{
                  marginTop:"5vh"
                }}>
                  <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                    <AddIcon style={{
                      height:"10vh",
                      width:"10vh"
                    }}/> 
                    <p style={{fontWeight:"bold"}}>Add Steps</p>       
                  </Box> 
              </Stack>
            </div>


            {/* end add step */}

            {/* Tag */}

            <div className='tag'>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} style={{
                marginTop:"5vh"
              }}>
                <Typography variant="h7" style={{
                  fontWeight:"bold"
                }}>
                  Attach Image
                </Typography> 
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} style={{
                marginTop:"2vh"
              }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={questiontag}
                  style={{
                    width: "100%",
                    fullWidth: true,
                  }}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[questiontag[0]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="search or choose tags"
                    />
                  )}
                />
              </Stack>
            </div>

            {/* end tag */}

            {/* button */}
           
            <Grid container style={{marginTop:"5vh"}}>
              <Grid item xs>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
              </Grid>
              <LoadingButton
                xs={1}
                size="large"
                type="submit"
                justifyContent="flex-end"
                color="success"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
            {/* end button */}

          </div>
        
        </Paper>
      </div>
        
    </Container>
    </>
  )
}

export default PostSolution;