import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
// @mui
import {
  Box,
  Chip,
  Avatar,
  Checkbox,
  AvatarGroup,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
// components
import Iconify from "../../components/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { viewSolution } from "../../redux/actions/viewSolutionActions";
import {
  upVoteAnySolution,
  downVoteAnySolution,
} from "../../redux/actions/solutionActions";
import SharesolutionButton from "../../userpages/ViewSolution/components/shareButton";
import { toggleBookmark } from "../../redux/actions/authActions";
// ----------------------------------------------------------------------

export default function QuestionSolutionsReview() {
  const dispatch = useDispatch();
  const { solutionId } = useParams();
  const solution = useSelector((state) => state.viewSolutions);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  //   if (viewSolution.isLoading && viewSolution.solution) {
  //     <div>...loading</div>;
  //   }
  //   const solution = viewSolution.solution;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(viewSolution(solutionId));
  }, []);
  useEffect(() => {
    let sol = solution.solution;
    if (auth.me && sol) {
      setUpVoteCount(solution.solution.upVoteCount);
      setDownVoteCount(solution.solution.downVoteCount);
      if (
        auth.me.solutionUpVotes.includes(sol._id) &&
        sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(sol.upVotes.length);
      } else if (
        auth.me.solutionUpVotes.includes(sol._id) &&
        !sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(sol.upVotes.length + 1);
      } else if (
        !auth.me.solutionUpVotes.includes(sol._id) &&
        sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(sol.upVotes.length - 1);
      } else if (
        !auth.me.solutionUpVotes.includes(sol._id) &&
        !sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(sol.upVotes.length);
      } else {
        setIsUpVote(false);
        setUpVoteCount(sol.upVotes.length);
      }

      if (
        auth.me.solutionDownVotes.includes(sol._id) &&
        sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(sol.downVotes.length);
      } else if (
        auth.me.solutionDownVotes.includes(sol._id) &&
        !sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(sol.downVotes.length + 1);
      } else if (
        !auth.me.solutionDownVotes.includes(sol._id) &&
        sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(sol.downVotes.length - 1);
      } else if (
        !auth.me.solutionDownVotes.includes(sol._id) &&
        !sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(sol.downVotes.length);
      } else {
        setIsDownVote(false);
        setDownVoteCount(sol.downVotes.length);
      }
    }
  }, [auth.me, solution.solution]);

  if (!solution.solution) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ py: 3 }}>
      <Stack direction="row" alignItems="center">
        {/* upvote  */}
        <IconButton
          onClick={() => {
            dispatch(upVoteAnySolution(solution.solution._id));
          }}
        >
          <Iconify
            icon={isUpVote ? "bxs:upvote" : "bx:upvote"}
            color={isUpVote ? "#1877f2" : "text.secondary"}
            width={20}
            height={20}
          />
        </IconButton>
        <Typography variant="caption">{upVoteCount}</Typography>

        <IconButton
          onClick={() => {
            dispatch(downVoteAnySolution(solution.solution._id));
          }}
        >
          <Iconify
            icon={isDownVote ? "bxs:downvote" : "bx:downvote"}
            color={isDownVote ? "#1877f2" : "text.secondary"}
            width={20}
            height={20}
          />
        </IconButton>
        <Typography variant="caption">{downVoteCount}</Typography>
        {/* comment */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              color="error"
              icon={
                <Iconify icon={"fa-regular:comment"} width={20} height={20} />
              }
              checkedIcon={
                <Iconify icon={"fa-regular:comment"} width={20} height={20} />
              }
            />
          }
          label={solution?.solution?.comments?.length}
          sx={{ minWidth: 72, mr: 0, ml: 1 }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
        </IconButton>

        <IconButton onClick={handleClickOpen}>
          <Iconify
            icon={"ant-design:share-alt-outlined"}
            width={20}
            height={20}
          />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Share this solution"}
          </DialogTitle>
          <SharesolutionButton solution={solution} />
        </Dialog>
        <IconButton>
          <Iconify icon={"ic:outline-report-problem"} width={20} height={20} />
        </IconButton>
      </Stack>
    </Box>
  );
}
