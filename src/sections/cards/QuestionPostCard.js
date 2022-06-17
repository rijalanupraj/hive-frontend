import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// utils
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from "../../utils/formatNumber";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import SvgIconStyle from "../../components/SvgIconStyle";

import { upVoteAnyQuestion, downVoteAnyQuestion } from "../../redux/actions/questionActions";

// ----------------------------------------------------------------------

const getIcon = name => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  chat: getIcon("ic_chat")
};

export default function QuestionPostCard({ question }) {
  const auth = useSelector(state => state.auth);
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(question.upVotes.length);
  const [downVoteCount, setDownVoteCount] = useState(question.downVotes.length);
  const navigate = useNavigate();
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
    <Card
      style={{
        marginTop: "1rem"
      }}
    >
      <CardHeader
        disableTypography
        avatar={
          question?.user?.profilePhoto?.hasPhoto ? (
            <Avatar src={question?.user.profilePhoto.url} alt={question?.user?.username} />
          ) : (
            <MyAvatar />
          )
        }
        title={
          <Link
            to={"/profile/" + question?.user?.username}
            variant='subtitle2'
            color='text.primary'
            component={RouterLink}
          >
            {question?.user?.username}
          </Link>
        }
        subheader={
          <Typography variant='caption' sx={{ display: "block", color: "text.secondary" }}>
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
        <Typography variant='h6' align='justify'>
          {question?.title}
        </Typography>

        <Typography variant='caption' align='justify'>
          {question?.answers?.length}
        </Typography>

        {/* image */}

        <Stack direction='row' alignItems='center'>
          {/* write  */}
          <FormControlLabel
            control={
              <Link href={"/post-solution/" + question._id}>
                <IconButton>
                  <Iconify icon={"jam:write-f"} width={20} height={20} />
                </IconButton>
              </Link>
            }
            label='answer'
            sx={{ minWidth: 72, mr: 2 }}
          />
          {/* upvote  */}
          <IconButton
            onClick={() => {
              dispatch(upVoteAnyQuestion(question._id));
            }}
          >
            <Iconify icon={isUpVote ? "bxs:upvote" : "bx:upvote"} width={20} height={20} />
          </IconButton>
          <Typography variant='caption'>{upVoteCount}</Typography>

          <IconButton
            onClick={() => {
              dispatch(downVoteAnyQuestion(question._id));
            }}
          >
            <Iconify icon={isDownVote ? "bxs:downvote" : "bx:downvote"} width={20} height={20} />
          </IconButton>
          <Typography variant='caption'>{downVoteCount}</Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
          </IconButton>

          <IconButton>
            <Iconify icon={"ant-design:share-alt-outlined"} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify icon={"ic:outline-report-problem"} width={20} height={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
