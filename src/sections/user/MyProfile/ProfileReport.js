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
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

//Internal Import
import { reportUser } from "../../../redux/actions/userActions";
import { Grid } from "@mui/material";

export default function ReportUser({ auth, profile }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);

  const handleClickOpen = () => {
    if (!auth.isAuthenticated) {
      navigate(`/login?redirectTo=${window.location.pathname}`);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ReportUserSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      subject: "",
      description: "",
    },
    validationSchema: ReportUserSchema,
    onSubmit: (values) => {
      dispatch(reportUser(profile._id, values, enqueueSnackbar));
      formik.resetForm();
      setOpen(false);
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
        Report
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Button
          variant="text"
          display="flex"
          // justifyContent="flex-end"
          onClick={handleClose}
        >
          <CancelIcon style={{ color: "red" }} />
        </Button>
        <DialogTitle textAlign="center">Report User</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2} textAlign="center">
            Please provide a valid reason for reporting this user.
          </DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                sx={{ mt: 1, mb: 2 }}
                label="Report Subject"
                fullWidth
                placeholder="Write your report subject here."
                {...getFieldProps("subject")}
                error={Boolean(touched.subject && errors.subject)}
                helperText={touched.subject && errors.subject}
              />
              <TextField
                mt={2}
                label="Report Description"
                multiline
                fullWidth
                rows={4}
                placeholder="Write your reason for reporting this user here."
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
