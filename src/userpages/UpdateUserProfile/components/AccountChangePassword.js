// External Dependencies
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { Stack, Card, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Formik
import { useFormik, Form, FormikProvider } from 'formik';

// Internal Import
import Iconify from '../../../components/Iconify';
import { changePassword } from '../../../redux/actions/userActions';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!user.isLoading) {
      formik.setSubmitting(false);
    } else {
      formik.setSubmitting(true);
    }

    if (user.success) {
      formik.resetForm();
    }
  }, [user.isLoading]);

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: values => {
      dispatch(changePassword(formik.values));
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems='flex-end'>
            <TextField
              fullWidth
              autoComplete='off'
              type='password'
              label='Old Password'
              {...getFieldProps('oldPassword')}
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />
            <TextField
              fullWidth
              autoComplete='off'
              type={showPassword ? 'text' : 'password'}
              label='New Password'
              {...getFieldProps('newPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(show => !show)} edge='end'>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />
            <TextField
              fullWidth
              autoComplete='off'
              type={showConfirmPassword ? 'text' : 'password'}
              label='Confirm Password'
              {...getFieldProps('confirmNewPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowConfirmPassword(show => !show)} edge='end'>
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>

          {user.error && (
            <Alert sx={{ mt: 3 }} severity='error'>
              {user.error}
            </Alert>
          )}

          {user.success && (
            <Alert sx={{ mt: 3 }} severity='success'>
              {user.success}
            </Alert>
          )}
        </Form>
      </FormikProvider>
    </Card>
  );
}
