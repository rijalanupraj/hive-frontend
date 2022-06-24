import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
  Tooltip,
  Chip,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// utils
import { fDate } from "../../utils/formatTime";

// components
import { useTheme } from "@mui/material/styles";

import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";

import SvgIconStyle from "../../components/SvgIconStyle";
import ReportQuestion from "../../userpages/QuestionsPage/components/ReportQuestion";

import {
  upVoteAnyQuestion,
  downVoteAnyQuestion,
} from "../../redux/actions/questionActions";

import { toggleAnswerLater } from "../../redux/actions/authActions";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  chat: getIcon("ic_chat"),
};

export default function QuestionPostCard({ question }) {
  const auth = useSelector((state) => state.auth);
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(question.upVotes.length);
  const [downVoteCount, setDownVoteCount] = useState(question.downVotes.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  console.log(theme.themeMode);

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
        marginTop: "1rem",
      }}
    >
      <CardHeader
        disableTypography
        avatar={
          question?.user?.profilePhoto?.hasPhoto ? (
            <Avatar
              src={question?.user.profilePhoto.url}
              alt={question?.user?.username}
            />
          ) : (
            <MyAvatar />
          )
        }
        title={
          <Link
            to={"/profile/" + question?.user?.username}
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {question?.user?.username}
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
        <Link
          to={"/question/" + question?.slug}
          style={{
            textDecoration: "none",
          }}
          component={RouterLink}
        >
          <Typography variant="h6" align="justify" sx={{ mb: 0.5 }}>
            {question?.title}
          </Typography>
        </Link>

        <Typography variant="body1" align="justify">
          {question?.description}
        </Typography>

        <Typography variant="body1" align="justify">
          <Stack direction="row" spacing={1}>
            {question?.tags.map((tag) => (
              <Chip label={tag} variant="outlined" size="small" clickable />
            ))}
          </Stack>
        </Typography>

        <Link href="#">
          <Typography
            variant="body2"
            align="justify"
            color="#3971f1"
            sx={{ mt: 2 }}
          >
            {question?.answers?.length} Answers
          </Typography>
        </Link>

        {/* image */}
        <Divider />
        <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
          {/* write  */}
          <Link href={"/post-solution/" + question._id}>
            <Tooltip title="write">
              <IconButton>
                <Iconify icon={"jam:write-f"} width={20} height={20} />
              </IconButton>
            </Tooltip>
          </Link>
          <Typography variant="caption">Answer</Typography>
          {/* upvote  */}
          <Tooltip title="upvote">
            <IconButton
              onClick={() => {
                dispatch(upVoteAnyQuestion(question._id));
              }}
            >
              <Iconify
                icon={isUpVote ? "bxs:upvote" : "bx:upvote"}
                width={20}
                height={20}
                color={isUpVote ? "#1877f2" : "text.secondary"}
              />
            </IconButton>
          </Tooltip>
          <Typography variant="caption">{upVoteCount}</Typography>

          <Tooltip title="downvote">
            <IconButton
              onClick={() => {
                dispatch(downVoteAnyQuestion(question._id));
              }}
            >
              <Iconify
                icon={isDownVote ? "bxs:downvote" : "bx:downvote"}
                width={20}
                height={20}
                color={isDownVote ? "#1877f2" : "text.secondary"}
              />
            </IconButton>
          </Tooltip>
          <Typography variant="caption">{downVoteCount}</Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Answer Later">
            {!auth.isAuthenticated ? (
              <IconButton
                onClick={() => {
                  navigate("/login?redirectTo=/question/" + question.slug);
                }}
              >
                <Iconify
                  icon={"ph:clock-afternoon-light"}
                  width={20}
                  height={20}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  dispatch(toggleAnswerLater(question._id));
                }}
              >
                <Iconify
                  icon={
                    auth.me.answerLater.includes(question._id)
                      ? "ph:clock-afternoon-fill"
                      : "ph:clock-afternoon-light"
                  }
                  color={
                    auth.me.answerLater.includes(question._id)
                      ? "#1877f2"
                      : "text.secondary"
                  }
                  width={20}
                  height={20}
                />
              </IconButton>
            )}
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify
                icon={"ant-design:share-alt-outlined"}
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Report">
            {auth.isAuthenticated ? (
              <ReportQuestion question={question} />
            ) : (
              <IconButton
                onClick={() => {
                  navigate("/login?redirectTo=/question/" + question.slug);
                }}
              >
                <Iconify
                  icon={"ic:outline-report-problem"}
                  width={20}
                  height={20}
                />
              </IconButton>
            )}
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}
