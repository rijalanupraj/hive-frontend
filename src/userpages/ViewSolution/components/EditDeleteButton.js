import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { DeleteForever } from "@mui/icons-material";
import { deleteSolution } from "../../../redux/actions/solutionActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDeleteButoon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const solution = useSelector((state) => state.viewSolutions);
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

  return (
    <div>
      <Button variant="text" onClick={handleEditOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Button
          variant="text"
          display="flex"
          justifyContent="flex-end"
          onClick={handleClose}
        >
          <CancelIcon style={{ color: "red" }} />
        </Button>
        <DialogTitle>
          {"Are you sure you want to edit this solution?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will modify your soluton.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/update-solution/${solution?.solution?._id}`);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* for deleting solution */}
      <Button variant="text">
        <DeleteForever onClick={handleDeleteOpen} style={{ color: "red" }} />
      </Button>
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Button
          variant="text"
          display="flex"
          justifyContent="flex-end"
          onClick={handleClose}
        >
          <CancelIcon style={{ color: "red" }} />
        </Button>
        <DialogTitle>
          {"Are you sure you want to delete this solution?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action cannot be undone. If you delete this solution, all the
            data associated with it will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              console.log(solution?.solution?._id);
              dispatch(deleteSolution(solution?.solution?._id, navigate));
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
