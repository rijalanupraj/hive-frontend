import React, { useEffect } from "react";
import * as Yup from "yup";
import { ButtonGroup, Button, TextareaAutosize } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
//internal import
import { updateComment, deleteComment } from "../../../redux/actions/viewSolutionActions";

const UpdateSolutionCommentSection = ({ solutionId, comment }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const UpdateCommentSchema = Yup.object().shape({
    text: Yup.string().required("Comment is required")
  });

  const formik = useFormik({
    initialValues: {
      text: comment.text
    },
    validationSchema: UpdateCommentSchema,
    onSubmit: values => {
      dispatch(updateComment(comment._id, formik.values));
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  //mui dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(solutionId, comment._id));
  };

  return (
    <div>
      <ButtonGroup
        variant='contained'
        size='small'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mt: 2 }}
        aria-label='outlined primary button group'
      >
        <Button variant='outlined' onClick={handleClickOpen}>
          <EditIcon />
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <DialogTitle>Edit Comment</DialogTitle>
              <DialogContent>
                <TextareaAutosize
                  aria-label='minimum height'
                  minRows={8}
                  placeholder='Edit your comment here'
                  style={{ maxWidth: 300, minWidth: 300 }}
                  autoFocus
                  margin='dense'
                  type='text'
                  {...getFieldProps("text")}
                  variant='standard'
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Submit</Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </Dialog>

        <Button onClick={handleDeleteComment} variant='contained' style={{ background: "red" }}>
          <DeleteRoundedIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default UpdateSolutionCommentSection;
