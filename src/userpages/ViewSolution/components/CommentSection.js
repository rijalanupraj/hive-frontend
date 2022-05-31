import React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

// Internal Import
import { addComment } from '../../../redux/actions/viewSolutionActions';

const CommentSection = ({ solution }) => {
  const dispatch = useDispatch();
  const commentSchema = Yup.object().shape({
    text: Yup.string()
      .required('Comment is required')
      .min(10, 'Comment must be at least 10 characters long')
      .max(1000, 'Comment must be less than 1000 characters long')
  });

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: commentSchema,
    onSubmit: values => {
      console.log(values);
      dispatch(addComment(solution._id, values));
      formik.resetForm();
    }
  });

  const { text } = formik.values;

  return (
    <Grid item xs={6}>
      {/* View Comment */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6'>View Comment</Typography>
        </Grid>
        <Grid item xs={12}>
          {solution.comments.map(comment => (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant='body1'>{comment.text}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* View Comment Ends */}

      <Stack spacing={3}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', my: 2 }} component='div' gutterBottom>
          Comments ({solution.comments.length})
        </Typography>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={3}>
              <TextField
                name='text'
                label='Comment'
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                rowsMax={4}
                sx={{
                  mb: 3,
                  '& > *': {
                    width: '100%'
                  }
                }}
                {...formik.getFieldProps('text')}
                helperText={formik.touched.text && formik.errors.text}
                error={formik.touched.text && !!formik.errors.text}
              />
              <LoadingButton
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{
                  mb: 3,
                  '& > *': {
                    width: '100%'
                  }
                }}
              >
                Post
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Stack>
    </Grid>
  );
};

export default CommentSection;
