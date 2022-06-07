import React from "react";
import { ButtonGroup, Button, TextareaAutosize } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const UpdateSolutionCommentSection = () => {
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
      <form>
        <ButtonGroup
          variant="contained"
          size="small"
          justifyContent="space-between"
          alignItems="center"
          sx={{ m: 1 }}
          aria-label="outlined primary button group"
        >
          <Button variant="outlined" onClick={handleClickOpen}>
            Edit
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
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Button variant="contained" style={{ background: "red" }}>
            Delete
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default UpdateSolutionCommentSection;
