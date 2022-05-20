import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import { React, useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import './css/PostSolution.css';
import Paper from '@mui/material/Paper';
import { Stack, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { postSolution } from '../../redux/actions/postSolutionActions';

const Input = styled('input')({
  display: 'none'
});

const questiontag = [
  { title: 'samadhan' },
  { title: 'school' },
  { title: 'college' },
  { title: 'government' },
  { title: 'hospital' },
  { title: 'travel' },
  { title: 'rules' },
  { title: 'Relationship' },
  { title: 'law' }
];

const PostSolution = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const solution = useSelector(state => state.solution);
  const navigate = useNavigate();

  useEffect(() => {
    if (!solution.isLoading) {
      formik.setSubmitting(false);
    }
  }, [solution.isLoading]);

  const SolutionSchema = Yup.object().shape({
    // intro: Yup.string().min(5, 'Too Short!').max(70, 'Too Long!').required('Name required'),
    // tags: Yup.string().required('Tags required'),
  });

  const formik = useFormik({
    initialValues: {
      answer: '',
      tags: []
    },
    validationSchema: SolutionSchema,
    onSubmit: () => {
      const formValues = {
        answer: formik.values.answer,
        tags: formik.values.tags.map(tag => tag.title)
      };
      dispatch(postSolution(questionId, formValues, navigate));
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <CssBaseline />
        <Container maxWidth='md'>
          {/* Question div */}
          <div>
            <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <p>How to make a passport?</p>
            </Paper>
          </div>

          {/* end question div */}

          <div className='containertwo'>
            <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              {/* Header */}
              <div className='title'>
                <Typography
                  variant='h5'
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  Your Answer
                </Typography>
              </div>

              {/* Intro */}
              <div className='titleIntro'>
                <Typography
                  variant='h7'
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  Short Introduction
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextareaAutosize
                    label='intro'
                    {...getFieldProps('answer')}
                    error={Boolean(touched.intro && errors.intro)}
                    helperText={touched.intro && errors.intro}
                    required
                    style={{
                      width: '100%',
                      fullWidth: true,
                      marginTop: '2vh'
                    }}
                    minRows={4}
                    placeholder='This is Optional'
                    // error={Boolean(touched.description && errors.description)}
                    // helperText={touched.description && errors.description}
                  />
                </Stack>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  style={{
                    marginTop: '5vh'
                  }}
                >
                  <Typography
                    variant='h7'
                    style={{
                      fontWeight: 'bold'
                    }}
                  >
                    Attach Image
                  </Typography>
                </Stack>

                <Stack style={{ marginTop: '2vh' }}>
                  <Box component='span' sx={{ p: 2, border: '1px dashed grey' }}>
                    <label
                      htmlFor='contained-button-file'
                      style={{
                        alignContent: 'center'
                      }}
                    >
                      <Input accept='image/*' id='contained-button-file' multiple type='file' />
                      <Button variant='contained' component='span'>
                        Upload
                      </Button>
                    </label>
                  </Box>
                </Stack>

                {/* Step 1 */}

                <div className='step1'>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    style={{
                      marginTop: '5vh'
                    }}
                  >
                    <Typography
                      variant='h7'
                      style={{
                        fontWeight: 'bold'
                      }}
                    >
                      Step 1
                    </Typography>
                  </Stack>

                  <Grid container spacing={2} columns={16} style={{ marginTop: '1vh' }}>
                    <Grid item xs={8}>
                      <TextField fullWidth label='1' id='fullWidth' />
                    </Grid>
                    <Grid item xs={8}>
                      <Box component='span' sx={{ p: 2, border: '1px dashed grey' }}>
                        <label htmlFor='contained-button-file' style={{ marginTop: '1vh' }}>
                          <Input accept='image/*' id='contained-button-file' multiple type='file' />
                          <Button variant='contained' component='span'>
                            Upload
                          </Button>
                        </label>
                      </Box>
                    </Grid>
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextareaAutosize
                      label='Describe'
                      required
                      style={{
                        width: '100%',
                        fullWidth: true,
                        marginTop: '2vh'
                      }}
                      minRows={4}
                      placeholder='Describe'
                    />
                  </Stack>
                </div>
                {/* end step 1 */}

                {/* Step 2 */}
                <div className='step2'>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    style={{
                      marginTop: '5vh'
                    }}
                  >
                    <Typography
                      variant='h7'
                      style={{
                        fontWeight: 'bold'
                      }}
                    >
                      Step 2
                    </Typography>
                  </Stack>

                  <Grid container spacing={2} columns={16} style={{ marginTop: '1vh' }}>
                    <Grid item xs={8}>
                      <TextField fullWidth label='2' id='fullWidth' />
                    </Grid>
                    <Grid item xs={8}>
                      <Box component='span' sx={{ p: 2, border: '1px dashed grey' }}>
                        <label htmlFor='contained-button-file' style={{ marginTop: '1vh' }}>
                          <Input accept='image/*' id='contained-button-file' multiple type='file' />
                          <Button variant='contained' component='span'>
                            Upload
                          </Button>
                        </label>
                      </Box>
                    </Grid>
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextareaAutosize
                      label='Describe'
                      required
                      style={{
                        width: '100%',
                        fullWidth: true,
                        marginTop: '2vh'
                      }}
                      minRows={4}
                      placeholder='Describe'
                      // error={Boolean(touched.description && errors.description)}
                      // helperText={touched.description && errors.description}
                    />
                  </Stack>
                </div>
                {/* end step 2 */}

                {/* add step */}
                <div className='addStep'>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    style={{
                      marginTop: '5vh'
                    }}
                  >
                    <Box component='span' sx={{ p: 2, border: '1px dashed grey' }}>
                      <AddIcon
                        style={{
                          height: '10vh',
                          width: '10vh'
                        }}
                      />
                      <p style={{ fontWeight: 'bold' }}>Add Steps</p>
                    </Box>
                  </Stack>
                </div>

                {/* end add step */}

                {/* Tag */}

                <div className='tag'>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    style={{
                      marginTop: '5vh'
                    }}
                  >
                    <Typography
                      variant='h7'
                      style={{
                        fontWeight: 'bold'
                      }}
                    >
                      Attach Image
                    </Typography>
                  </Stack>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    style={{
                      marginTop: '2vh'
                    }}
                  >
                    <Autocomplete
                      multiple
                      id='tags-outlined'
                      options={questiontag}
                      style={{
                        width: '100%',
                        fullWidth: true
                      }}
                      getOptionLabel={option => option.title}
                      defaultValue={[questiontag[0]]}
                      filterSelectedOptions
                      onChange={(event, newValue) => {
                        setFieldValue('tags', newValue);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Tags'
                          {...getFieldProps('tags')}
                          error={Boolean(touched.tags && errors.tags)}
                          helperText={touched.tags && errors.tags}
                          placeholder='search or choose tags'
                        />
                      )}
                    />
                  </Stack>
                </div>

                {/* end tag */}

                {solution.error && (
                  <Stack justifyContent='flex-end' sx={{ mb: 2 }}>
                    <Alert severity='error'>{solution.error}</Alert>
                  </Stack>
                )}

                {/* button */}

                <Grid container style={{ marginTop: '5vh' }}>
                  <Grid item xs>
                    <Button variant='outlined' color='error'>
                      Cancel
                    </Button>
                  </Grid>
                  <LoadingButton
                    xs={1}
                    size='large'
                    type='submit'
                    justifyContent='flex-end'
                    color='success'
                    variant='contained'
                    loading={isSubmitting}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
                {/* end button */}
              </div>
            </Paper>
          </div>
        </Container>
      </Form>
    </FormikProvider>
  );
};

export default PostSolution;
