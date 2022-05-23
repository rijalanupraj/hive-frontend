// External Import
import * as Yup from 'yup';
import { React, useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// @MUI Import
import {
  Alert,
  CssBaseline,
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  Autocomplete,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';

// Internal Import
import './css/PostSolution.css';
import { postSolution } from '../../redux/actions/solutionActions';
import { getAllAvailableTags } from '../../redux/actions/tagActions';

const Input = styled('input')({
  display: 'none'
});

const PostSolution = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const solution = useSelector(state => state.solution);
  const navigate = useNavigate();
  const tags = useSelector(state => state.tag);

  const tagsList = tags.tagsList.map(tag => ({ title: tag }));

  useEffect(() => {
    dispatch(getAllAvailableTags());
  }, [dispatch]);

  useEffect(() => {
    if (!solution.isLoading) {
      formik.setSubmitting(false);
    }
  }, [solution.isLoading]);

  const SolutionSchema = Yup.object().shape({
    answer: Yup.string().min(5, 'Too Short!').max(70, 'Too Long!').required('Name required'),
    tags: Yup.array().min(1, 'Please choose at least one tag')
  });

  const formik = useFormik({
    initialValues: {
      answer: '',
      tags: []
    },
    validationSchema: SolutionSchema,
    onSubmit: () => {
      const formValues = {
        ...formik.values
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
                    label='answer'
                    {...getFieldProps('answer')}
                    error={Boolean(touched.answer && errors.answer)}
                    helperText={touched.answer && errors.answer}
                    required
                    style={{
                      width: '100%',
                      fullWidth: true,
                      marginTop: '2vh'
                    }}
                    minRows={4}
                    placeholder='This is Optional'
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
                      options={tagsList.map(option => option.title)}
                      style={{
                        width: '100%',
                        fullWidth: true
                      }}
                      freeSolo
                      onChange={(event, value) => {
                        setFieldValue('tags', value);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant='filled'
                          label='Tags'
                          placeholder='Choose or Add tags'
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
