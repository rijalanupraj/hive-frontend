import { useEffect, useRef, useState, useCallback } from "react";
import { sentenceCase } from "change-case";
import { useNavigate, useParams } from "react-router-dom";
// @mui
import {
  Box,
  Card,
  Grid,
  Divider,
  Container,
  Typography,
  Pagination,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Avatar,
  Link,
  Paper,
} from "@mui/material";
// routes

import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import Iconify from "../../components/Iconify";

// hooks
import useSettings from "../../hooks/useSettings";
import useIsMountedRef from "../../hooks/useIsMountedRef";
// utils
// import axios from '../../utils/axios';
// components
import Page from "../../components/Page";
import Markdown from "../../components/Markdown";
import { SkeletonPost } from "../../components/skeleton";
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm,
  QuestionSolutionHeader,
  QuestionSolutionComment,
  QuestionSolutionReview,
  SimilarSolutionsPost,
} from "../../sections/QuestionSolutions";
import Image from "../../components/Image";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------
import { viewSolution } from "../../redux/actions/viewSolutionActions";
import moment from "moment";

export default function SolutionView() {
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
    <Page title="Blog: Post Details">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} order={{ xs: 2, md: 1 }}>
            <Card>
              {/* cover */}
              <QuestionSolutionHeader que={solution?.solution?.question} />
              {/* end cover */}

              <Box sx={{ p: { xs: 3, md: 5 }, mb: 1 }}>
                <Box sx={{ my: 2, mt: -2 }}>
                  <Divider />
                  <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar
                      alt="experts"
                      src={solution?.solution?.user?.profilePhoto}
                      sx={{ width: 42, height: 42 }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">Answered By:</Typography>
                      <Typography variant="button">
                        {solution?.solution?.user?.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: "grey.500" }}
                      >
                        {moment(solution?.solution?.user?.createdAt).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                </Box>

                {/* start body description */}

                <Markdown children={solution?.solution?.answer || ""} />
                {/* end body description */}

                {/* start image */}
                <Image
                  alt="post media"
                  src="https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png"
                  ratio="16/9"
                  sx={{ borderRadius: 1, mt: 4 }}
                />
                {/* end image */}

                {/* start upVote/downvote */}

                <Box sx={{ my: 5 }}>
                  <Divider />

                  <QuestionSolutionReview />

                  <Divider />
                </Box>

                {/* end upVote/downVote */}

                {/* start comment */}

                <Box sx={{ my: 3 }}>
                  <QuestionSolutionComment solution={solution?.solution} />
                </Box>

                {/* end comment */}
              </Box>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            // sx={{ display: { xs: "none", xl: "block" } }}
            order={{ xs: 1, md: 1 }}
          >
            <SimilarSolutionsPost />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
