import { useEffect, useRef, useState, useCallback } from "react";
import { sentenceCase } from "change-case";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
// routes

import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import Iconify from "../../components/Iconify";
import { useSnackbar } from "notistack";
// hooks
import useSettings from "../../hooks/useSettings";

// utils
// import axios from '../../utils/axios';
// components
import Page from "../../components/Page";

// sections
import { SimilarSolutionsPost } from "../../sections/QuestionSolutions";

import SelectedQuestionCard from "../../sections/cards/SelectedQuestionCard";
import QuestionAnswersCard from "../../sections/cards/QuestionAnswersCard";
import RelatedQuestionsCard from "../../sections/cards/RelatedQuestionsCard";
import { getQuestionBySlug } from "../../redux/actions/questionActions";
import { getAllSolutionByQuestionSlug } from "../../redux/actions/solutionActions";
// ----------------------------------------------------------------------

export default function AnotherQuestionSolutions() {
  const { themeStretch } = useSettings();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const [solutionsList, setSolutionsList] = useState([]);
  const solution = useSelector((state) => state.solution);
  const auth = useSelector((state) => state.auth);
  const [sort, setSort] = useState("best");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestionBySlug(slug, navigate, enqueueSnackbar));
    dispatch(getAllSolutionByQuestionSlug(slug));
  }, [slug]);

  useEffect(() => {
    setSolutionsList(solution.solutions);
    console.log("fetched again");
  }, [solution.solutions]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSort(event.target.value);
  };

  useEffect(() => {
    if (sort === "best") {
      setSolutionsList(
        [...solutionsList].sort((a, b) => {
          return b.score - a.score;
        })
      );
    } else if (sort === "upvote") {
      setSolutionsList(
        [...solutionsList].sort((a, b) => {
          return b.upVotes.length - a.upVotes.length;
        })
      );
    } else if (sort === "new") {
      setSolutionsList(
        [...solutionsList].sort((a, b) => {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        })
      );
    } else if (sort === "old") {
      setSolutionsList(
        [...solutionsList].sort((a, b) => {
          return Date.parse(a.createdAt) - Date.parse(b.createdAt);
        })
      );
    }
  }, [sort]);

  const hideAnswer = (id) => {
    let newSolutionsList = [...solutionsList];

    newSolutionsList = newSolutionsList.filter((solution) => {
      return solution._id !== id;
    });

    setSolutionsList([...newSolutionsList]);
  };

  if (!question.question || question.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="Question Solutions">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12} order={{ xs: 2, md: 1 }}>
            {/*  seleceted question card */}
            <SelectedQuestionCard question={question?.question} auth={auth} />

            {/* start sort */}
            <Stack direction="row" alignItems="center" sx={{ pt: 2 }}>
              {/* upvote  */}
              <Typography variant="h6">
                Solutions ({solutionsList?.length})
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="sort">Sort</InputLabel>
                  <Select
                    labelId="sort"
                    id="sort"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                  >
                    <MenuItem value="best">Best</MenuItem>
                    <MenuItem value="new">Most Recent</MenuItem>
                    <MenuItem value="old">Oldest</MenuItem>
                    <MenuItem value="upvote">Most Upvote</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            {/* end sort */}

            {/* question answers */}

            {solutionsList.length > 0 &&
              solutionsList.map((solution) => (
                <QuestionAnswersCard
                  key={solution._id}
                  solution={solution}
                  auth={auth}
                  hideAnswer={hideAnswer}
                />
              ))}
          </Grid>

          {/* start related questions */}
          {/* <Grid
            item
            xs={12}
            md={4}
            lg={4}
            order={{ xs: 1, md: 1 }}
          >
            <RelatedQuestionsCard />
          </Grid> */}
          {/* end related questions */}
        </Grid>
      </Container>
    </Page>
  );
}
