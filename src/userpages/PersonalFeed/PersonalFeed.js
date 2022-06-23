import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { logOutUser } from "../../redux/actions/authActions";
import { Grid, Paper, Box, styled, Typography } from "@mui/material";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";
import SolutionCard from "./components/SolutionCard";
import axios from "axios";
import SolutionPostCard from "../../sections/cards/SolutionPostCard";
import QuestionPostCard from "../../sections/cards/QuestionPostCard";
import { getPersonalFeed } from "../../redux/actions/authActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PersonalFeed() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [solutions, setSolutions] = React.useState([]);
  const [feedList, setFeedList] = React.useState([]);

  useEffect(() => {
    dispatch(getPersonalFeed());
  }, []);

  useEffect(() => {
    if (auth.feed) {
      setFeedList(auth.feed);
    }
  }, [auth.feed]);

  return (
    <Page title="Personal Feed">
      <Paper
        style={{
          width: "100%",

          boxShadow: "none",
        }}
      >
        <Grid
          container
          spacing={5}
          style={{
            padding: "1.5rem",
          }}
        >
          {/* ======================================================================================================================= */}
          {/* Left */}
          <Grid item xs="3"></Grid>
          {/* ====================================================================================================================== */}
          {/* Center */}

          <Grid item xs={6}>
            {/* Solution */}
            {feedList.length === 0 && (
              <Paper>
                <Typography gutterBottom align="center" variant="subtitle1">
                  Not found
                </Typography>
                <Typography variant="body2" align="center">
                  No results found &nbsp;
                  <strong>&quot;Follow&quot;</strong> some user to see their
                  solutions and questions here.
                </Typography>
              </Paper>
            )}

            {feedList.length > 0 &&
              feedList.map((feed, index) =>
                feed.title ? (
                  <QuestionPostCard key={feed._id} question={feed} />
                ) : (
                  <SolutionPostCard key={feed._id} solution={feed} />
                )
              )}
          </Grid>
          {/* ============================================================================================================================== */}

          {/* Right */}
          <Grid item xs="3"></Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default PersonalFeed;
