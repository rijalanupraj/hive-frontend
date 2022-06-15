import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ReportUser() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          justifyContent="flex-end"
          onClick={handleClose}
        >
          <CancelIcon style={{ color: "red" }} />
        </Button>
        <DialogTitle textAlign="center">Report User</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Please provide a valid reason for reporting this user.
          </DialogContentText>

          <TextField
            id="outlined-multiline-static"
            mt={2}
            label="Report User"
            multiline
            fullWidth
            rows={4}
            placeholder="Write your reason here."
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
