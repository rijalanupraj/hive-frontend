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
  Button,
  Chip,
} from "@mui/material";
import handleViewport from "react-in-viewport";
import { useSearchParams } from "react-router-dom";

import QuestionPostCard from "../../sections/cards/QuestionPostCard";
import {
  getAllQuestion,
  searchQuestion,
  scrollLoadingQuestions,
} from "../../redux/actions/questionActions";
import { getAllCategory } from "../../redux/actions/categoryAction";
import InputStyle from "../../components/InputStyle";
import Iconify from "../../components/Iconify";

import useSettings from "../../hooks/useSettings";

import FilterQuestion from "./components/FilterQuestion";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchQuestion from "./components/SearchQuestion";

const Block = (props: { inViewport: boolean }) => {
  const { inViewport, forwardedRef } = props;
  return (
    <div className="viewport-block" ref={forwardedRef}>
      <div style={{ width: "400px", height: "100px" }} />
    </div>
  );
};

const ViewportBlock = handleViewport(Block);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#161c24" : "#fafafa",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const QuestionsPage = () => {
  const { themeStretch } = useSettings();
  const question = useSelector((state) => state.question);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  // useEffect(() => {
  //   dispatch(getAllQuestion());
  // }, [dispatch]);

  useEffect(() => {
    onViewPortEnter();
  }, []);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      scrollLoadingQuestions(1, searchParams.get("q") || "", selectedCategory)
    );
  };

  const onViewPortEnter = () => {
    if (!question.allLoaded) {
      if (question.pageNumber === null) {
        dispatch(
          scrollLoadingQuestions(
            1,
            searchParams.get("q") || "",
            selectedCategory
          )
        );
      } else {
        dispatch(
          scrollLoadingQuestions(
            question.pageNumber + 1,
            searchParams.get("q") || "",
            selectedCategory
          )
        );
      }
    }
  };

  useEffect(() => {
    let ques = question.questions ? [...question.questions] : [];
    if (currentFilter === "unanswered") {
      setQuestions(ques.filter((q) => q.answers.length === 0));
    } else if (currentFilter === "answered") {
      setQuestions(ques.filter((q) => q.answers.length > 0));
    } else if (currentFilter === "newest") {
      setQuestions(
        ques.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } else {
      setQuestions(ques);
    }
  }, [currentFilter, question.questions]);

  return (
    <Page title="Questions">
      
          <Grid container spacing={2}>
            {/* start left */}
            <Grid item xs={3}>
              <Item></Item>
            </Grid>
            {/* end left */}

            {/* center question body */}
            <Grid item xs={6}>
              <Item sx={{ mt: 2 }}>
                {/* start question filter */}

                {/* <FilterQuestion
                  currentFilter={currentFilter}
                  handleFilterChange={handleFilterChange}
                /> */}

                <SearchQuestion
                  onSearchSubmit={onSearchSubmit}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                />
                {/* end question filter */}
                <Grid item>
                  {questions &&
                    questions.map((q) => (
                      <QuestionPostCard key={q._id} question={q} />
                    ))}
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
                {question.questions.length === 0 &&
                  !question.scrollLoading &&
                  !question.allLoaded && (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        mt: 3,
                      }}
                    >
                      No questions found
                    </Typography>
                  )}

                {!question.isLoading && question.questions.length > 0 && (
                  <ViewportBlock
                    onEnterViewport={() => onViewPortEnter()}
                    onLeaveViewport={() => console.log("leave")}
                  />
                )}
              </Item>
            </Grid>

            {/*  end question body */}

            {/* start left */}
            <Grid item xs={3}>
              
            </Grid>
            {/* end left */}
          </Grid>
    </Page>
  );
};

export default QuestionsPage;
