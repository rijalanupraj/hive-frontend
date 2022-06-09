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
import { updateComment } from "../../../redux/actions/viewSolutionActions";

const UpdateSolutionCommentSection = () => {
  const comment = useSelector((state) => state.viewSolutions.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(updateComment);
  }, []);
  const UpdateCommentSchema = Yup.object().shape({
    text: Yup.string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: UpdateCommentSchema,
    onSubmit: (values) => {
      dispatch(updateComment(formik.values));
    },
  });
  const { handleSubmit, getFieldProps } = formik;
  //mui dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <ButtonGroup
            variant="contained"
            size="small"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
            aria-label="outlined primary button group"
          >
            <Button variant="outlined" onClick={handleClickOpen}>
              <EditIcon />
              
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Comment</DialogTitle>
              <DialogContent>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={8}
                  placeholder="Edit your comment here"
                  style={{ maxWidth: 300, minWidth: 300 }}
                  autoFocus
                  margin="dense"
                  type="text"
                  {...getFieldProps("text")}
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" loading={false}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <Button variant="contained" style={{ background: "red" }}>
            <DeleteRoundedIcon />  
            </Button>
          </ButtonGroup>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default UpdateSolutionCommentSection;
