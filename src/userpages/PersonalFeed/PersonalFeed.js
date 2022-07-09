import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { logOutUser } from "../../redux/actions/authActions";
import { Grid, Paper, Box, styled, Typography, Container } from "@mui/material";
import useSettings from "../../hooks/useSettings";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";
import SolutionCard from "./components/SolutionCard";
import axios from "axios";
import SolutionPostCard from "../../sections/cards/SolutionPostCard";
import QuestionPostCard from "../../sections/cards/QuestionPostCard";
import { getPersonalFeed } from "../../redux/actions/authActions";
import FilterFeed from "./components/FilterFeed";
import handleViewport from "react-in-viewport";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Block = (props: { inViewport: boolean }) => {
  const { inViewport, forwardedRef } = props;
  return (
    <div className="viewport-block" ref={forwardedRef}>
      <div style={{ width: "400px", height: "100px" }} />
    </div>
  );
};

const ViewportBlock = handleViewport(Block);

function PersonalFeed() {
  const { themeStretch } = useSettings();
  const auth = useSelector((state) => state.auth);
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState("recent");

  const handleFilterChange = (event, newValue) => {
    setCurrentFilter(newValue);
  };

  useEffect(() => {
    dispatch(getPersonalFeed(1, currentFilter));
  }, [currentFilter]);

  const onViewPortEnter = () => {
    if (!auth.feedAllLoaded) {
      if (auth.feedPageNumber === null) {
        dispatch(getPersonalFeed(1, currentFilter));
      } else {
        dispatch(getPersonalFeed(auth.feedPageNumber + 1, currentFilter));
      }
    }
  };

  return (
    <Page title="Personal Feed">
      <Container maxWidth={themeStretch ? false : "md"}>
        <Grid item>
          <FilterFeed
            currentFilter={currentFilter}
            handleFilterChange={handleFilterChange}
          />
          {/* Solution */}
          {auth.feed.length === 0 && (
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

          {auth.feed &&
            auth.feed.length > 0 &&
            auth.feed.map((feed, index) =>
              feed.title ? (
                <QuestionPostCard key={feed._id} question={feed} />
              ) : (
                <SolutionPostCard key={feed._id} solution={feed} />
              )
            )}
          {auth.feed.length > 0 && (
            <ViewportBlock
              onEnterViewport={() => onViewPortEnter()}
              onLeaveViewport={() => console.log("leave")}
            />
          )}
        </Grid>
        {/* ============================================================================================================================== */}
      </Container>
    </Page>
  );
}

export default PersonalFeed;
