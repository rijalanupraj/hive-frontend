import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate } from "react-router-dom";
// // utils
// import { fDate } from "../../utils/formatTime";
// import { fShortenNumber } from "../../utils/formatNumber";
// components

import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";

import ReportQuestion from "../../userpages/QuestionsPage/components/ReportQuestion";

import {
  upVoteAnyQuestion,
  downVoteAnyQuestion,
} from "../../redux/actions/questionActions";
import { toggleAnswerLater } from "../../redux/actions/authActions";

// ----------------------------------------------------------------------

export default function QuestionSolutionHeader({ question, auth }) {
  const navigate = useNavigate();
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(question.upVotes.length);
  const [downVoteCount, setDownVoteCount] = useState(question.downVotes.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.me) {
      if (
        auth.me.questionUpVotes.includes(question._id) &&
        question.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(question.upVotes.length);
      } else if (
        auth.me.questionUpVotes.includes(question._id) &&
        !question.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(question.upVotes.length + 1);
      } else if (
        !auth.me.questionUpVotes.includes(question._id) &&
        question.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(question.upVotes.length - 1);
      } else if (
        !auth.me.questionUpVotes.includes(question._id) &&
        !question.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(question.upVotes.length);
      } else {
        setIsUpVote(false);
        setUpVoteCount(question.upVotes.length);
      }

      if (
        auth.me.questionDownVotes.includes(question._id) &&
        question.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(question.downVotes.length);
      } else if (
        auth.me.questionDownVotes.includes(question._id) &&
        !question.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(question.downVotes.length + 1);
      } else if (
        !auth.me.questionDownVotes.includes(question._id) &&
        question.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(question.downVotes.length - 1);
      } else if (
        !auth.me.questionDownVotes.includes(question._id) &&
        !question.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(question.downVotes.length);
      } else {
        setIsDownVote(false);
        setDownVoteCount(question.downVotes.length);
      }
    }
  }, [auth.me]);

  return (
    <Card maxWidth="sm">
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link href="#" variant="subtitle2" color="text.primary">
            {question.user.username}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(question?.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={0.5} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant="h6" align="justify">
          {question.title}
        </Typography>

        <Typography variant="body1" align="justify">
          {question.description}
        </Typography>

        {/* image */}

      </Stack>
    </Card>
  );
}
