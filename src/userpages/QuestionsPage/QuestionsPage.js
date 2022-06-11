// External Dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Page from "../../components/Page";
import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Typography,
  Paper,
  Container,
} from "@mui/material";

import QuestionPostCard from "./components/QuestionPostCard";
import {
  getAllQuestion,
  searchQuestion,
} from "../../redux/actions/questionActions";
import InputStyle from "../../components/InputStyle";
import Iconify from "../../components/Iconify";

import useSettings from "../../hooks/useSettings";

const QuestionsPage = () => {
  const { themeStretch } = useSettings();
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [questionFilter, setQuestionFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllQuestion());
  }, [dispatch]);

  const onFindQuestion = (e) => {
    if (e.target.value === "") {
      dispatch(getAllQuestion());
    } else {
      dispatch(searchQuestion(e.target.value));
    }
  };

  useEffect(() => {
    let ques = question.questions ? [...question.questions] : [];
    if (questionFilter === "unanswered") {
      setQuestions(ques.filter((q) => q.answers.length > 0));
    } else if (questionFilter === "newest") {
      setQuestions(
        ques.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } else {
      setQuestions(ques);
    }
  }, [questionFilter, question.questions]);

  return (
    <Page title="Questions">
     <Container maxWidth={themeStretch ? false : 'sm'}>
 
        <Typography variant="h4" sx={{ mb: 2 }}>
          Question
        </Typography>

        <InputStyle
          stretchStart={240}
          onChange={onFindQuestion}
          placeholder="Find Question..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ color: "text.disabled", width: 30, height: 20}}
                  
                />
                
              </InputAdornment>
              
            )
          }}
          
        />

        <ToggleButtonGroup
          color="primary"
          value={questionFilter}
          exclusive
          onChange={(event, value) => {
            setQuestionFilter(value);
          }}
          style={{
            border: "1.5px solid #e0e0e0",
          }}
          sx={{
            ml: 3,
          }}
        >
          <ToggleButton value="unanswered">Unanswered</ToggleButton>
          <ToggleButton value="newest">Newest</ToggleButton>
        </ToggleButtonGroup>
        <Grid item>
          <QuestionPostCard />
          {/* {questions &&
            questions.map((q) => <QuestionPostCard key={q._id} question={q} />)} */}
        </Grid>


      </Container>
    </Page>
  );
};

export default QuestionsPage;
