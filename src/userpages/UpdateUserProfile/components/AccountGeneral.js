// External Dependencies
import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

// utils
import { fData } from "../../../utils/formatNumber";

import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../components/hook-form";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Internal Import
import {
  updateProfile,
  updateProfileImage,
} from "../../../redux/actions/userActions";
import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile,
} from "../../../components/upload";
import { useMemo } from "react";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!user.isLoading) {
      formik.setSubmitting(false);
    } else {
      formik.setSubmitting(true);
    }
  }, [user.isLoading]);

  const UpdateProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    username: Yup.string()
      .min(4, "Username must be at least 6 characters")
      .required("Username is required"),
    about: Yup.string(),
  });

  const UpdateImageSchema = Yup.object().shape({
    profileImage: Yup.mixed().test(
      "required",
      "Profile Image is required",
      (value) => value !== ""
    ),
  });

  const imageDefaultValues = useMemo(
    () => ({
      profileImage: auth?.me?.profilePhoto?.url,
    }),
    [auth.me]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateImageSchema),
    imageDefaultValues,
  });

  const profileValues = methods.watch();

  useEffect(() => {
    if (auth.me) {
      methods.reset(imageDefaultValues);
    }
    if (!auth.me.profilePhoto) {
      methods.reset(imageDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.me]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        methods.setValue(
          "profileImage",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setShowButton(true);
      }
    },
    [methods.setValue]
  );

  const formik = useFormik({
    initialValues: {
      name: auth.me.name || "",
      username: auth.me.username || "",
      bio: auth.me.bio || "",
    },
    validationSchema: UpdateProfileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(formik.values, enqueueSnackbar));
    },
  });

  const onProfileImageSubmit = async () => {
    console.log("Submitting");
    const formData = new FormData();
    formData.append("profileImage", profileValues.profileImage);
    dispatch(updateProfileImage(formData, enqueueSnackbar));
    setShowButton(false);
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onProfileImageSubmit)}
          >
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profileImage"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
              {showButton && (
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              )}
            </Box>
            {/* <Box sx={{ mb: 5 }}>
            <UploadAvatar />
          </Box> */}
          </FormProvider>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Full Name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="text"
                  label="Username"
                  {...getFieldProps("username")}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  fullWidth
                  disabled
                  type="email"
                  value={auth.me.email || ""}
                />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  label="Bio"
                  {...getFieldProps("bio")}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={false}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
