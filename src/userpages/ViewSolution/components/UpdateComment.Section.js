import * as React from "react";
import * as Yup from "yup";
import {
  ButtonGroup,
  Button,
  DialogContentText,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import Slide from "@mui/material/Slide";
//internal import
import {
  updateComment,
  deleteComment,
} from "../../../redux/actions/viewSolutionActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateSolutionCommentSection = ({ solutionId, comment }) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const UpdateCommentSchema = Yup.object().shape({
    text: Yup.string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues: {
      text: comment.text,
    },
    validationSchema: UpdateCommentSchema,
    onSubmit: (values) => {
      dispatch(updateComment(comment._id, formik.values));
    },
  });
  const { handleSubmit, getFieldProps } = formik;
  //mui dialog

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(solutionId, comment._id));
  };

  return (
    <div>
      <ButtonGroup
        variant="text"
        size="small"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
        aria-label="outlined primary button group"
      >
        <Button variant="text" onClick={handleEditOpen}>
          Edit
        </Button>

        <Dialog
          open={openEdit}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <DialogTitle sx={{ mb: 1, textAlign: "centre" }}>
                Edit Comment
              </DialogTitle>

              <DialogContent>
                <TextField
                  name="text"
                  placeholder="Write your comment here."
                  variant="outlined"
                  fullWidth
                  multiline
                  style={{ maxWidth: 300, minWidth: 300 }}
                  rows={4}
                  rowsMax={5}
                  sx={{
                    "& > *": {},
                  }}
                  {...formik.getFieldProps("text")}
                  helperText={formik.touched.text && formik.errors.text}
                  error={formik.touched.text && !!formik.errors.text}
                />
              </DialogContent>
              <DialogActions justify="centre">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </Dialog>

        <Button variant="text" color="error" onClick={handleDeleteOpen}>
          Delete
        </Button>

        <Dialog
          open={openDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Are you sure you want to Delete this comment?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This action cannot be undone. Your comment will be permanently
              deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteComment}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </ButtonGroup>
    </div>
  );
};

export default UpdateSolutionCommentSection;
