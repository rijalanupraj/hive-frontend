// External Dependencies
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Page from '../../components/Page';
import { Grid, ToggleButton, ToggleButtonGroup, InputAdornment, Typography  } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import { getAllQuestion, searchQuestion } from '../../redux/actions/questionActions';
import InputStyle from "../../components/InputStyle";
import Iconify from "../../components/Iconify";

const QuestionsPage = () => {
  const question = useSelector(state => state.question);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [questionFilter, setQuestionFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllQuestion());
  }, [dispatch]);

  const onFindQuestion = (e) => {
    if(e.target.value==='') {
      dispatch(getAllQuestion());
    }else{
      dispatch(searchQuestion(e.target.value));
    }
  
  }

  useEffect(() => {
    let ques = question.questions ? [...question.questions] : [];
    if (questionFilter === 'unanswered') {
      setQuestions(ques.filter(q => q.answers.length > 0));
    } else if (questionFilter === 'newest') {
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
    <Page title='Questions'>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Question
      </Typography>

      <InputStyle
        stretchStart={240}
        
        onChange={onFindQuestion}
        placeholder='Find Question...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          )
        }}
        sx={{ mb: 5 }}
      />
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{
          marginTop: '70px'
        }}
      >
        <ToggleButtonGroup
          color='primary'
          value={questionFilter}
          exclusive
          onChange={(event, value) => {
            setQuestionFilter(value);
          }}
        >
          <ToggleButton value='unanswered'>Unanswered</ToggleButton>
          <ToggleButton value='newest'>Newest</ToggleButton>
        </ToggleButtonGroup>
        <Grid item xs='4'>
          {questions && questions.map(q => <QuestionCard key={q._id} question={q} />)}
        </Grid>
      </Grid>
    </Page>
  );
};

export default QuestionsPage;
