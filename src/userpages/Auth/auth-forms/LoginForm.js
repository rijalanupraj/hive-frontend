// External Import
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

// @MUI
import Alert from '@mui/material/Alert';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Internal Import
import Iconify from '../../../components/Iconify';
import { loginUserWithEmail } from '../../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!auth.isLoading) {
      formik.setSubmitting(false);
    } else {
      formik.setSubmitting(true);
    }
  }, [auth.isLoading]);

  const LoginSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Email / Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      // Remove remember
      delete values.remember;
      dispatch(loginUserWithEmail(values, navigate));
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  if (auth.isAuthenticated) return <Navigate to='/' />;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete='username'
            type='text'
            label='Email or Username'
            {...getFieldProps('emailOrUsername')}
            error={Boolean(touched.emailOrUsername && errors.emailOrUsername)}
            helperText={touched.emailOrUsername && errors.emailOrUsername}
          />

          <TextField
            fullWidth
            autoComplete='current-password'
            type={showPassword ? 'text' : 'password'}
            label='Password'
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPassword} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label='Remember me'
          /> */}

          <Link component={RouterLink} variant='subtitle2' to='/forgot-password' underline='hover'>
            Forgot password?
          </Link>
        </Stack>

        {auth.error && (
          <Stack justifyContent='flex-end' sx={{ mb: 2 }}>
            <Alert severity='error'>{auth.error}</Alert>
          </Stack>
        )}

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
