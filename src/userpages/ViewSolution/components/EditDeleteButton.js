import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { deleteSolution } from "../../../redux/actions/solutionActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDeleteButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = React.useState(false);
  const solution = useSelector((state) => state.viewSolutions);

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
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
        <Button
          variant="text"
          onClick={() => {
            navigate(`/update-solution/${solution?.solution?._id}`);
          }}
        >
          Edit
        </Button>

        {/* for deleting solution */}
        <Button variant="text" onClick={handleDeleteOpen} color="error">
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
            {"Are you sure you want to delete this solution?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you delete this solution, all the data associated with it will
              be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                console.log(solution?.solution?._id);
                dispatch(deleteSolution(solution?.solution?._id, navigate));
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </ButtonGroup>
    </div>
  );
}
