import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import Iconify from "../../components/Iconify";
import { IconButton } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { reportSolution } from "../../redux/actions/solutionActions";
import { useSnackbar } from "notistack";

export default function ReportSolution({ solution }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SolutionReportSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: SolutionReportSchema,
    onSubmit: (values) => {
      dispatch(reportSolution(solution._id, values, enqueueSnackbar));
      formik.resetForm();
      handleClose();
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Iconify icon={"ic:outline-report-problem"} width={20} height={20} />
      </IconButton>
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
        <DialogContent>
          <DialogContentText mb={2} textAlign="center">
            Please provide a valid reason for reporting this solution.
          </DialogContentText>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="text"
                label="Subject"
                {...getFieldProps("subject")}
                error={Boolean(touched.subject && errors.subject)}
                helperText={touched.subject && errors.subject}
              />
              <TextField
                fullWidth
                type="text"
                label="Description"
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Report
              </LoadingButton>
            </Form>
          </FormikProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
