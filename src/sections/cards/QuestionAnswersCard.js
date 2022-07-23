// @mui
import { useState, useEffect } from "react";
import {
  Box,
  Link,
  Card,
  Avatar,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
  Divider,
  Tooltip,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import Markdown from "../../components/Markdown";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ReportSolution from "../reports/ReportSolution";
import {
  upVoteAnySolution,
  downVoteAnySolution,
} from "../../redux/actions/solutionActions";
import { toggleBookmark } from "../../redux/actions/authActions";
import EditDeleteButon from "../../userpages/ViewSolution/components/EditDeleteButton";

import Image from "../../components/Image";

// utils

// import { fShortenNumber } from "../../../utils/formatNumber";

import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";
import Label from "../../components/Label";

// ----------------------------------------------------------------------

export default function QuestionAnswersCard({ solution, auth, hideAnswer }) {
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(solution.upVotes.length);
  const [downVoteCount, setDownVoteCount] = useState(solution.downVotes.length);
  const [commentCount, setCommentCount] = useState(solution.comments.length);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.me) {
      if (
        auth.me.solutionUpVotes.includes(solution._id) &&
        solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(solution.upVotes.length);
      } else if (
        auth.me.solutionUpVotes.includes(solution._id) &&
        !solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(solution.upVotes.length + 1);
      } else if (
        !auth.me.solutionUpVotes.includes(solution._id) &&
        solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(solution.upVotes.length - 1);
      } else if (
        !auth.me.solutionUpVotes.includes(solution._id) &&
        !solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(solution.upVotes.length);
      } else {
        setIsUpVote(false);
        setUpVoteCount(solution.upVotes.length);
      }

      if (
        auth.me.solutionDownVotes.includes(solution._id) &&
        solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(solution.downVotes.length);
      } else if (
        auth.me.solutionDownVotes.includes(solution._id) &&
        !solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(solution.downVotes.length + 1);
      } else if (
        !auth.me.solutionDownVotes.includes(solution._id) &&
        solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(solution.downVotes.length - 1);
      } else if (
        !auth.me.solutionDownVotes.includes(solution._id) &&
        !solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(solution.downVotes.length);
      } else {
        setIsDownVote(false);
        setDownVoteCount(solution.downVotes.length);
      }
    }
  }, [auth.me]);
  return (
    <Card
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <CardHeader
        disableTypography
        avatar={
          solution?.user?.profilePhoto?.hasPhoto ? (
            <Avatar
              src={solution?.user.profilePhoto.url}
              alt={solution?.user?.username}
            />
          ) : (
            <MyAvatar />
          )
        }
        title={
          <Link href="#" variant="subtitle2" color="text.primary">
            {solution.user.username}
            {solution?.user?.isVerified && (
              <Typography display="inline">
                <VerifiedIcon
                  sx={{
                    ml: 0.5,
                    fontSize: "small",
                    color: "#3B8AF0",
                    verticalAlign: "baseline",
                  }}
                />
              </Typography>
            )}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(solution.createdAt)}
          </Typography>
        }
        action={
          <IconButton
            onClick={() => {
              hideAnswer(solution._id);
            }}
          >
            <Iconify
              icon={"charm:circle-cross"}
              width={20}
              height={20}
              color="red"
            />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant="h6" align="justify">
          {solution?.description}
        </Typography>

        {/* Answer */}
        {solution.answer && <Markdown children={solution?.answer || ""} />}

        {auth.me?._id === solution?.user?._id && (
          <EditDeleteButon solution={solution} />
        )}

        {/* image optional */}

        {/* <Image
          alt='post media'
          src='https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png'
          ratio='4/3'
          sx={{ borderRadius: 1 }}
        /> */}
        <Divider />
        <Stack direction="row" alignItems="center">
          {/* upvote  */}
          <Tooltip title="Upvote">
            <IconButton
              onClick={() => {
                if (auth.me) {
                  dispatch(upVoteAnySolution(solution._id));
                } else {
                  navigate("/login?redirectTo=/solution/" + solution._id);
                }
              }}
            >
              <Iconify
                icon={isUpVote ? "bxs:upvote" : "bx:upvote"}
                color={isUpVote ? "#1877f2" : "text.secondary"}
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
          <Typography variant="caption">{upVoteCount}</Typography>

          <Tooltip title="Downvote">
            <IconButton
              onClick={() => {
                if (auth.isAuthenticated) {
                  dispatch(downVoteAnySolution(solution._id));
                } else {
                  navigate("/login?redirectTo=/solution/" + solution._id);
                }
              }}
            >
              <Iconify
                icon={isDownVote ? "bxs:downvote" : "bx:downvote"}
                color={isDownVote ? "#1877f2" : "text.secondary"}
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>

          <Typography variant="caption">{downVoteCount}</Typography>
          {/* comment */}
          <Tooltip title="comment">
            <Link
              to={"/solution/" + solution?._id}
              variant="body1"
              component={RouterLink}
            >
              <IconButton>
                <Iconify icon={"fa-regular:comment"} width={20} height={20} />
              </IconButton>
            </Link>
          </Tooltip>
          <Typography variant="caption">{solution?.comments.length}</Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Bookmark">
            {!auth.isAuthenticated ? (
              <IconButton
                onClick={() => {
                  navigate("/login?redirectTo=/solution/" + solution._id);
                }}
              >
                <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  dispatch(toggleBookmark(solution._id));
                }}
              >
                <Iconify
                  icon={
                    auth.me.bookmarks.includes(solution._id)
                      ? "bi:bookmark-dash-fill"
                      : "bi:bookmark-check"
                  }
                  color={
                    auth.me.bookmarks.includes(solution._id)
                      ? "#1877f2"
                      : "text.secondary"
                  }
                  width={20}
                  height={20}
                />
              </IconButton>
            )}
          </Tooltip>

          <IconButton>
            <Iconify
              icon={"ant-design:share-alt-outlined"}
              width={20}
              height={20}
            />
          </IconButton>
          <Tooltip title="Report">
            {auth.isAuthenticated ? (
              <ReportSolution solution={solution} />
            ) : (
              <IconButton
                onClick={() => {
                  navigate("/login?redirectTo=/solution/" + solution._id);
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
