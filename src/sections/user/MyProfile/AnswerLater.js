import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Typography,
  InputAdornment,
  Container,
} from "@mui/material";
// components
import Iconify from "../../../components/Iconify";
import InputStyle from "../../../components/InputStyle";
import SearchNotFound from "../../../components/SearchNotFound";
import SolutionPostCard from "../../../sections/cards/SolutionPostCard";
import QuestionPostCard from "../../cards/QuestionPostCard";
import Image from "../../../components/Image";

// ----------------------------------------------------------------------

AnswerLater.propTypes = {
  answerLater: PropTypes.array,
  findAnswerLater: PropTypes.string,
  onFindAnswerLater: PropTypes.func,
};

export default function AnswerLater({
  answerLater,
  findAnswerLater,
  onFindAnswerLater,
  auth,
}) {
  const questionFiltered = applyFilter(answerLater, findAnswerLater);

  const isNotFound = questionFiltered.length === 0;
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }} alignItem="center">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Answer Later
        </Typography>

        <InputStyle
          stretchStart={240}
          value={findAnswerLater}
          onChange={(event) => onFindAnswerLater(event.target.value)}
          placeholder="Find your answer later..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 5 }}
        />

        <Grid container spacing={3}>
          {questionFiltered.map((question) => {
            if (!auth.me.answerLater.includes(question._id)) {
              return;
            }
            return (
              <Grid key={question._id} item xs={12} md={12}>
                <QuestionPostCard question={question} />
              </Grid>
            );
          })}
        </Grid>

        {isNotFound && (
          <Box sx={{ mt: 5 }}>
            <SearchNotFound searchQuery={findAnswerLater} />
            <Image
              src={require("../../../assets/images/notfound.png")}
              sx={{
                width: 500,
                margin: "auto",
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      (question) =>
        question.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        question.description.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        question.user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
