import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { logOutUser } from "../../redux/actions/authActions";
import { Grid, Paper, Box, styled, Typography } from "@mui/material";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";
import SolutionCard from "./components/SolutionCard";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

function PersonalFeed() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [solutions, setSolutions] = React.useState([]);

  useEffect(() => {
    const getPersonalFeed = async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/solution/personal/feed`, {
        headers: {
          "x-auth-token": `${auth.token}`
        }
      });

      const { data } = response;

      setSolutions(data.solutions);
    };
    getPersonalFeed();
  }, [auth]);

  return (
    <Page title='Personal Feed'>
      <Paper
        style={{
          width: "100%",
          backgroundColor: "#f1f2f2",
          boxShadow: "none"
        }}
      >
        <Grid
          container
          spacing={5}
          style={{
            marginTop: "2rem",
            padding: "1.5rem"
          }}
        >
          {/* ======================================================================================================================= */}
          {/* Left */}
          <Grid item xs='3'></Grid>
          {/* ====================================================================================================================== */}
          {/* Center */}

          <Grid
            item
            xs={6}
            style={{
              height: "100%"
            }}
          >
            {/* question header */}
            <div>
              <Paper
                variant='outlined'
                style={{
                  padding: "1rem"
                }}
              >
                {/* profile pic and ask question */}
                <Grid container spacing={2}>
                  {/* ask question */}
                  <Grid item xs={10}></Grid>
                </Grid>
              </Paper>
            </div>

            {/* home tranding, new post, best post */}

            <Paper
              variant='outlined'
              style={{
                padding: "1rem",
                marginTop: "0.7rem"
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}></Grid>
              </Grid>
            </Paper>
           
            {/* Solution */}
            {solutions &&
              solutions.map((sol, index) => <SolutionCard key={index} solution={sol} />)}
          </Grid>
          {/* ============================================================================================================================== */}

          {/* Right */}
          <Grid item xs='3'></Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default PersonalFeed;
