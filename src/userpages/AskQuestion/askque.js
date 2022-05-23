// External Import
import { React, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';

// @MUI Import
import {
  Button,
  Grid,
  Autocomplete,
  Typography,
  Stack,
  TextField,
  TextareaAutosize,
  CssBaseline,
  Container,
  Paper,
  Chip
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// Internal Import
import { askQuestion } from '../../redux/actions/questionActions';
import { getAllAvailableTags } from '../../redux/actions/tagActions';

const theme = createTheme();

const category = ['Government', 'Health', 'Education', 'Vechiles'];

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  }
}));

export default function AskQuestion() {
  const dispatch = useDispatch();
  const question = useSelector(state => state.question);
  const tags = useSelector(state => state.tag);
  const navigate = useNavigate();

  const tagsList = tags.tagsList.map(tag => ({ title: tag }));

  useEffect(() => {
    dispatch(getAllAvailableTags());
  }, [dispatch]);

  useEffect(() => {
    if (question.error) {
      formik.setSubmitting(false);
    }
    if (question.question) {
      formik.setSubmitting(false);
    }
  }, [question.error]);

  const QuestionSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Please choose an appropriate title for your question'),
    category: Yup.string().min(2).required('Category required'),
    tags: Yup.array().min(1, 'Please choose at least one tag'),
    description: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      tags: [],
      description: ''
    },
    validationSchema: QuestionSchema,
    onSubmit: () => {
      const dataValues = {
        ...formik.values
      };
      dispatch(askQuestion(dataValues, navigate));
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <Page title='Ask Question'>

      <RootStyle>

      <Container component='main' maxWidth='sm' sx={{ mb: 4 }} style={{
        marginTop: '5rem',
        backgroundColor: '#f2f6fc',
      }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography
            component='div'
            variant='body1'
            style={{
              height: 40,
              width: '100%',
              position: 'relative'
            }}
          >
            <Stack
              sx={{
                color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),

                fontSize: '1rem',
                fontWeight: '700',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 'modal'
              }}
            >
              Create New Question
            </Stack>
          </Typography>

          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label='Title'
                    type='text'
                    required
                    placeholder='Enter your title here '
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Autocomplete
                    fullWidth={true}
                    style={{
                      width: '100%',
                      fullWidth: true
                    }}
                    required
                    {...getFieldProps('category')}
                    onChange={(event, value) => {
                      setFieldValue('category', value);
                    }}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    options={category}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    sx={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Category'
                        placeholder='search or choose category'
                      />
                    )}
                  />
                  {touched.category && errors.category ? (
                    <div className='error'>{errors.category}</div>
                  ) : null}
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextareaAutosize
                    label='Description'
                    style={{
                      width: '100%',
                      fullWidth: true
                    }}
                    minRows={4}
                    required
                    placeholder='Description'
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>
                <Grid container>
                  <Grid item xs>
                    <Button variant='outlined' color='error'>
                      Cancel
                    </Button>
                  </Grid>

                  <LoadingButton
                    xs={1}
                    size='large'
                    type='submit'
                    justifycontent='flex-end'
                    color='success'
                    variant='contained'
                    loading={isSubmitting}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Container>
      </RootStyle>
      </Page>
  );
}
