import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";

//Internal Import
import { reportUser } from "../../../redux/actions/userActions";
import { Grid } from "@mui/material";

export default function RequestVerification() {
  const dispatch = useDispatch;
  const user = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!user.isLoading) {
      formik.setSubmitting(false);
    } else {
      formik.setSubmitting(true);
    }
  }, [user.isLoading]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RequestVerificationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")

      .min(10, "Phone number must be at least 10 characters"),
    citizenship: Yup.string()
      .required("Citizenship is required")
      .min(3, "Citizenship must be at least 5 characters"),

    permanentAddress: Yup.string()
      .required("Permanent address is required")
      .max(100, "Permanent address must be at least 100 characters"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      citizenship: "",
      permanentAddress: "",
      description: "",
    },
    validationSchema: RequestVerificationSchema,
    onSubmit: (values) => {
      dispatch(reportUser(formik.values));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="text"
        icon={"ic:outline-report-problem"}
        width={20}
        height={20}
      >
        Request Verification
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Request Verification</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2} textAlign="center">
            Please provide your detail to request verification.
          </DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                sx={{ mt: 1, mb: 2 }}
                label="Phone Number"
                type="number"
                fullWidth
                placeholder="Please provide your phone number"
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                sx={{ mt: 1, mb: 2 }}
                label="Permanent Address"
                fullWidth
                placeholder="Please provide your permanent address"
                {...getFieldProps("permanentAddress")}
                error={Boolean(
                  touched.permanentAddress && errors.permanentAddress
                )}
                helperText={touched.permanentAddress && errors.permanentAddress}
              />
              <TextField
                sx={{ mt: 1, mb: 2 }}
                label="Citizenship number"
                type="number"
                fullWidth
                placeholder="Please provide your citizenship number"
                {...getFieldProps("citizenship")}
                error={Boolean(touched.citizenship && errors.citizenship)}
                helperText={touched.citizenship && errors.citizenship}
              />
              <TextField
                mt={2}
                label="Further Description"
                multiline
                fullWidth
                rows={4}
                placeholder="Write about yourself in brief"
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />

              <LoadingButton
                type="submit"
                sx={{ mt: 2, mb: 2, width: "100%" }}
                variant="contained"
                loading={isSubmitting}
              >
                Report
              </LoadingButton>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
