import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import "./css/Homepage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { logOutUser } from "../../redux/actions/authActions";
import {
  Grid,
  Paper,
  Box,
  styled,
  Typography,
  Link,
  Container,
  Avatar,
} from "@mui/material";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";

import SolutionPostCard from "./components/SolutionPostCard";
import useSettings from "../../hooks/useSettings";

import { _userFeeds } from "../../_mock/_user";

// const RootStyle = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   }
// }));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function HomePage() {
  const { themeStretch } = useSettings();
  const auth = useSelector((state) => state.auth);
  const solution = useSelector((state) => state.solution);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllSolutionHome());
  }, [auth]);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : "md"}>
        <Paper>
          {/* ======================================================================================================================= */}
          {/* Left */}

          {/* ====================================================================================================================== */}
          {/* Center */}

          <Grid
            item
            xs={6}
            style={{
              height: "100%",
            }}
          >
            {/* question header */}
            <div>
              <Paper
                variant="outlined"
                style={{
                  padding: "1rem",
                  border: "2px solid #e0e0e0",
                }}
              >
                {/* profile pic and ask question */}
                <Grid container spacing={2}>
                  <Grid item xs={1.5}>
                    <Box
                      style={{
                        paddingLeft: "2rem",
                      }}
                    >
                      <Avatar
                        alt="profile"
                        src="https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg"
                      />
                    </Box>
                  </Grid>

                  {/* ask question */}
                  <Grid item xs={10}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "#e3e3e3",
                        "&:hover": {
                          opacity: [0.9, 0.8, 0.7],
                        },
                        borderRadius: "10px",
                      }}
                    >
                      <p
                        style={{
                          padding: "0.5rem",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        <Link href="/ask-question">What's Your Question?</Link>
                      </p>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </div>

            {/* {posts.map((post) => (
              <SolutionPostCard key={post.id} post={post} />
            ))} */}

            {/* solution card */}

            <SolutionPostCard />
          </Grid>
          {/* ============================================================================================================================== */}

          {/* Right */}
        </Paper>

        <div
          style={{
            margin: "20vh",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          This is Home Page
          {auth.isAuthenticated ? (
            <p>You are logged in</p>
          ) : (
            <p>You are not logged in</p>
          )}
          {auth.isAuthenticated ? (
            <button onClick={() => dispatch(logOutUser(navigate))}>
              Log Out
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Log In</button>
          )}
        </div>
      </Container>
    </Page>
  );
}

export default HomePage;
