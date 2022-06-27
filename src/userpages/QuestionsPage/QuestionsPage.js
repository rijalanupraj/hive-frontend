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
  CircularProgress,
} from "@mui/material";
import handleViewport from "react-in-viewport";

import QuestionPostCard from "../../sections/cards/QuestionPostCard";
import {
  getAllQuestion,
  searchQuestion,
  scrollLoadingQuestions,
} from "../../redux/actions/questionActions";
import InputStyle from "../../components/InputStyle";
import Iconify from "../../components/Iconify";

import useSettings from "../../hooks/useSettings";

import FilterQuestion from "./components/FilterQuestion";

const Block = (props: { inViewport: boolean }) => {
  const { inViewport, forwardedRef } = props;
  return (
    <div className="viewport-block" ref={forwardedRef}>
      <div style={{ width: "400px", height: "100px" }} />
    </div>
  );
};

const ViewportBlock = handleViewport(Block);

const QuestionsPage = () => {
  const { themeStretch } = useSettings();
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(false);

  // useEffect(() => {
  //   dispatch(getAllQuestion());
  // }, [dispatch]);

  useEffect(() => {
    onViewPortEnter();
  }, []);

  const handleFilterChange = (event, newValue) => {
    setCurrentFilter(newValue);
  };

  const onFindQuestion = (e) => {
    if (e.target.value === "") {
      dispatch(getAllQuestion());
    } else {
      dispatch(searchQuestion(e.target.value));
    }
  };

  const onViewPortEnter = () => {
    if (!question.allLoaded) {
      if (question.pageNumber === null) {
        dispatch(scrollLoadingQuestions(1));
      } else {
        dispatch(scrollLoadingQuestions(question.pageNumber + 1));
      }
    }
  };

  useEffect(() => {
    let ques = question.questions ? [...question.questions] : [];
    if (currentFilter === "unanswered") {
      setQuestions(ques.filter((q) => q.answers.length === 0));
    } 
    else if (currentFilter === "answered") {
      setQuestions(ques.filter((q)=>q.answers.length > 0 ) );
    }
    else if (currentFilter === "newest") {
      setQuestions(
        ques.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    }
    else {
      setQuestions(ques);
    }
  }, [currentFilter, question.questions]);

  return (
    <Page title="Questions">
      <Container maxWidth={themeStretch ? false : "md"}>
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
                  sx={{ color: "text.disabled", width: 30, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />
        <ToggleButtonGroup
          color="primary"
          value={currentFilter}
          exclusive
          onChange={(event, value) => {
            setCurrentFilter(value);
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
        <FilterQuestion 
          currentFilter={currentFilter}
          handleFilterChange = {handleFilterChange}
        />
        <Grid item>
          {questions &&
            questions.map((q) => <QuestionPostCard key={q._id} question={q} />)}
        </Grid>
        {question.scrollLoading && <CircularProgress size={30} />}
        {question.allLoaded && (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 3,
            }}
          >
            All questions are loaded
          </Typography>
        )}
        {!question.isLoading && question.questions.length > 0 && (
          <ViewportBlock
            onEnterViewport={() => onViewPortEnter()}
            onLeaveViewport={() => console.log("leave")}
          />
        )}
      </Container>
    </Page>
  );
};

export default QuestionsPage;
