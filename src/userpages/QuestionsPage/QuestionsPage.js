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

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

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
      <div style={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* start left */}
            <Grid item xs={2.5}>
              <Item></Item>
            </Grid>
            {/* end left */}

            {/* center question body */}
            <Grid item xs={6.5}>
              <Item sx={{ mt: -3 }}>
                {/* start question filter */}
                <FilterQuestion
                  currentFilter={currentFilter}
                  handleFilterChange={handleFilterChange}
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
              <Item sx={{ ml: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Related Tags
                </Typography>

                {/* {question?.tags.map((tag) => (
                  <Chip label={tag} variant="outlined" size="small" clickable />
                ))} */}
                
                {/* main body */}
                <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                  School
                </Button>
                <Button disabled sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ ml: 1, mt: 0.5 }}>
                    x
                  </Typography>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    22
                  </Typography>
                </Button>
                <br />
                {/* end main body */}
                <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                  Hospital
                </Button>
                <Button disabled sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ ml: 1, mt: 0.5 }}>
                    x
                  </Typography>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    81
                  </Typography>
                </Button>
                <br />
                <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                  Government
                </Button>
                <Button disabled sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ ml: 1, mt: 0.5 }}>
                    x
                  </Typography>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    200
                  </Typography>
                </Button>
                <br />
                <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                  Transportation
                </Button>
                <br />
                <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                  Exam
                </Button>
              </Item>
            </Grid>
            {/* end left */}
          </Grid>
        </Box>
      </div>
    </Page>
  );
};

export default QuestionsPage;
