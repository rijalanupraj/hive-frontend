import { useState, useRef, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Divider,
  Tooltip,
  Chip,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Markdown from "../../components/Markdown";

// utils
import { fDate } from "../../utils/formatTime";
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";
import CommentCard from "./CommentCard";

import { toggleBookmark } from "../../redux/actions/authActions";
import {
  upVoteAnySolution,
  downVoteAnySolution,
} from "../../redux/actions/solutionActions";
import ReportSolution from "../reports/ReportSolution";

// ----------------------------------------------------------------------

export default function SolutionPostCard({ solution }) {
  const auth = useSelector((state) => state.auth);

  const [comment, setComment] = useState(false);

  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(solution.upVotes.length);
  const [downVoteCount, setDownVoteCount] = useState(solution.downVotes.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isComment, setIsComment] = useState("");

  const handleComment = () => {
    setComment((prev) => !prev);
  };

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

  const handleIsMessage = (value) => {
    setIsComment(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card
      style={{
        marginTop: "1rem",
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
          <Link
            to={"/profile/" + solution?.user?.username}
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {solution?.user?.username}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(solution?.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        }
        // action={
        //   <LoadingButton
        //     fullWidth
        //     size="small"
        //     type="submit"
        //     variant="contained"
        //   >
        //     Follow
        //   </LoadingButton>
        // }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* Question */}
        <Link
          to={`/question/${solution?.question?.slug}`}
          component={RouterLink}
        >
          <Typography
            variant="h6"
            align="justify"
            sx={{ mb: -1 }}
            
          >
            {solution?.question?.title}
          </Typography>
          
        </Link>

        {/* Answer */}
        {/* <Markdown children={solution?.answer.slice(0, 100) || ""} /> */}

        
          
        <Typography variant="body1" sx={{ mb: -1 }}>
          {solution?.description}
          <Link
            to={"/solution/" + solution?._id}
            variant="body1"
            component={RouterLink}
          >
            (more)
          </Link>
        </Typography>
        <Typography align="justify" sx={{ mt: 2 }} color="black">
            <Stack direction="row" spacing={1}>
              {solution?.tags.map((tag) => (
                <Chip
                  label={tag}
                  variant="outline"
                  size="small"
                  clickable
                  // sx={{width:'10%'}}
                />
              ))}
            </Stack>
          </Typography>

        {/* image */}

        {/* <Image
          alt="post media"
          src="https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png"
          ratio="2/1"
          sx={{ borderRadius: 1 }}
        /> */}

        {/* status */}
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
          <Tooltip title="Comment">
            <IconButton onClick={handleComment}>
              <Iconify icon={"fa-regular:comment"} width={20} height={20} />
            </IconButton>
          </Tooltip>

          <Typography variant="caption">5</Typography>

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
        {/* comment */}

        {comment && CommentCard()}
      </Stack>
    </Card>
  );
}
