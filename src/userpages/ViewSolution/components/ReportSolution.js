import * as React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

//Internal Import
import { reportSolution } from "../../../redux/actions/viewSolutionActions";

export default function ReportSolution({ solution }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const reportSchema = Yup.object().shape({
    subject: Yup.string()
      .required("Report subject is required")
      .min(10, "Report subject must be at least 5 characters long")
      .max(100, "Report must be less than 100 characters long"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long")
      .max(1000, "Description must be less than 1000 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      subject: "",
      discription: "",
    },
    validationSchema: reportSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(reportSolution(solution._id, values));
      formik.resetForm();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { subject, discription } = formik.values;
  return (
    <div>
      <Button
        variant="text"
        style={{ color: "blue" }}
        onClick={handleClickOpen}
      >
        Report Solution
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Button
          variant="text"
          display="flex"
          justifyContent="flex-end"
          onClick={handleClose}
        >
          <CancelIcon style={{ color: "red" }} />
        </Button>
        <DialogTitle textAlign="center">Report</DialogTitle>
        <FormikProvider value={formik}>
          <Form>
            <DialogContent>
              <DialogContentText mb={2}>
                Please provide a valid reason for reporting this solution.
              </DialogContentText>

              <TextField
                name="subject"
                mt={2}
                sx={{ mb: 2 }}
                label="Subject"
                multiline
                fullWidth
                placeholder="Subject of the report."
                {...formik.getFieldProps("subject")}
                helperText={formik.touched.subject && formik.errors.subject}
                error={formik.touched.subject && !!formik.errors.subject}
              />

              <TextField
                name="discription"
                mt={2}
                label="Description"
                multiline
                fullWidth
                rows={4}
                placeholder="Why is this solution inappropriate?"
                {...formik.getFieldProps("discription")}
                helperText={
                  formik.touched.discription && formik.errors.discription
                }
                error={
                  formik.touched.discription && !!formik.errors.discription
                }
              />
            </DialogContent>
            <DialogActions>
              {/* <Button variant="contained" type="submit">
                Submit
              </Button> */}
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  mb: 3,
                  "& > *": {},
                }}
              >
                <PostAddRoundedIcon /> Post
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}
