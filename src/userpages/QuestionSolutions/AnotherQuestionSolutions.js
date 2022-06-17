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
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
// routes

import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import Iconify from "../../components/Iconify";

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
// ----------------------------------------------------------------------

export default function AnotherQuestionSolutions() {
  const { themeStretch } = useSettings();

  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Page title="Question Solutions">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} order={{ xs: 2, md: 1 }}>

            {/*  seleceted question card */}
            <SelectedQuestionCard />
            
            {/* start sort */}
            <Stack direction="row" alignItems="center" sx={{pt:2}} >
              {/* upvote  */}
              <Typography variant="h6">Solutions (2)</Typography>

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

            <QuestionAnswersCard />

            <QuestionAnswersCard />

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
