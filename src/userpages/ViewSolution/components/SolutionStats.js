import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Iconify from "../../../components/Iconify";

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export default function SolutionStats({ solution }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Iconify icon={"gridicons:stats-up"} width={20} height={20} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: 1 }}>Solution Stats</DialogTitle>
        <DialogContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Iconify icon={"bxs:upvote"} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Total Upvotes"
                secondary={solution?.upVotes.length}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Iconify icon={"bxs:downvote"} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Total Downvotes"
                secondary={solution?.downVotes.length}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Iconify icon={"bxs:comment"} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Total Comments"
                secondary={solution?.comments.length}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
