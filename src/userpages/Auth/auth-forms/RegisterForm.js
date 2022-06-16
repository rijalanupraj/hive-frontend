import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate, Navigate } from "react-router-dom";
import Page from "../../../components/Page";

// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
// component
import Iconify from "../../../components/Iconify";

import { useSelector, useDispatch } from "react-redux";
import { registerUserWithEmail } from "../../../redux/actions/registerActions";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const register = useSelector(state => state.register);
  const navigate = useNavigate();

  useEffect(() => {
    if (register.error) {
      formik.setSubmitting(false);
    }
  }, [register.error]);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(5, "Too Short!").max(70, "Too Long!").required("Name required"),
    username: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Username required"),
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string().min(6, "Too short").required("Password is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(registerUserWithEmail(formik.values, navigate));
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title='Register'>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label='Name'
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                label='Username'
                {...getFieldProps("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
            </Stack>
            <TextField
              fullWidth
              autoComplete='username'
              type='email'
              label='Email address'
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              autoComplete='current-password'
              type={showPassword ? "text" : "password"}
              label='Password'
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => setShowPassword(prev => !prev)}>
                      <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            {register.error && (
              <Stack justifyContent='flex-end' sx={{ mb: 2 }}>
                <Alert severity='error'>{register.error}</Alert>
              </Stack>
            )}
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Page>
  );
}
