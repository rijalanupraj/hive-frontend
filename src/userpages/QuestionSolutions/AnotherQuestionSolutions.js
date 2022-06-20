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
  const { solutions } = useSelector((state) => state.solution);
  const auth = useSelector((state) => state.auth);
  const [sort, setSort] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestionBySlug(slug, navigate, enqueueSnackbar));
    dispatch(getAllSolutionByQuestionSlug(slug));
  }, [slug]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  if (!question.question || question.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="Question Solutions">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} order={{ xs: 2, md: 1 }}>
            {/*  seleceted question card */}
            <SelectedQuestionCard question={question?.question} auth={auth} />

            {/* start sort */}
            <Stack direction="row" alignItems="center" sx={{ pt: 2 }}>
              {/* upvote  */}
              <Typography variant="h6">
                Solutions ({solutions?.length})
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
                    <MenuItem value={10}>Most Recent</MenuItem>
                    <MenuItem value={20}>Most Upvote</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            {/* end sort */}

            {/* question answers */}

            {solutions.length > 0 &&
              solutions.map((solution) => (
                <QuestionAnswersCard
                  key={solution._id}
                  solution={solution}
                  auth={auth}
                />
              ))}
          </Grid>

          {/* start related questions */}
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            // sx={{ display: { xs: "none", xl: "block" } }}
            order={{ xs: 1, md: 1 }}
          >
            <RelatedQuestionsCard />
          </Grid>
          {/* end related questions */}
        </Grid>
      </Container>
    </Page>
  );
}
