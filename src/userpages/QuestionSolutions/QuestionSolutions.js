import { useEffect, useRef, useState, useCallback } from "react";
import { sentenceCase } from "change-case";
import { useParams } from "react-router-dom";
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
} from "../../sections/blog";
import Image from "../../components/Image";

// ----------------------------------------------------------------------

export default function QuestionSolutions() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { title } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");

  return (
    <Page title="Blog: Post Details">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} order={{ xs: 2, md: 1 }}>
            <Card>
              {/* cover */}
              <QuestionSolutionHeader />
              {/* end cover */}

              <Box sx={{ p: { xs: 3, md: 5 }, mb: 1 }}>
                {/* start body description */}
                <Typography variant="subtitle1" align="justify">
                  You can open a bank account online or at a branch, if the bank
                  offers brick-and-mortar locations. The information you'll be
                  asked to provide will be much the same whether you’re opening
                  a checking account, a savings account or both. Here’s a list
                  of what you’ll need to open your new bank account:
                  <br />
                  1. A valid, government-issued photo ID, such as a driver’s
                  license or a passport. Nondrivers can get a state ID card at
                  the Department of Motor Vehicles office.
                  <br />
                  2. Other basic information, such as your birthdate, Social
                  Security number or Taxpayer Identification Number, or phone
                  number.
                  <br />
                  3. Aninitial deposit is required by some banks, too. Skip
                  ahead to learn more about account funding. Depending on your
                  circumstances, you might need a few other items, too:
                  <br />
                  4. Identification detailsfor other applicants, if you’re
                  opening a joint account: Because the account will be owned by
                  multiple people, the bank will want all owners’ identification
                  and personal information.
                  <br />
                  5. A co-ownerif you’re not yet 18. Ask a parent or legal
                  guardian to sign legal documents with the bank.
                </Typography>

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
                  <QuestionSolutionComment />
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
