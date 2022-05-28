// External Dependencies
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Page from '../../components/Page';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import { getAllQuestion } from '../../redux/actions/questionActions';

const QuestionsPage = () => {
  const question = useSelector(state => state.question);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [questionFilter, setQuestionFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllQuestion());
  }, [dispatch]);

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
