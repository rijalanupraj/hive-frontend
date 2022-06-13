import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import "./css/Homepage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
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
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  FormHelperText,

} from "@mui/material";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";

import SolutionPostCard from "../../sections/cards/SolutionPostCard";
import useSettings from "../../hooks/useSettings";

import { _userFeeds } from "../../_mock/_user";
import TopExperts from "./HomePages/TopExperts"; 

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
  }, []);

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={4} lg={3.5} >
            <TopExperts />
          </Grid>

          {/* posts */}
          <Grid item xs={12} lg={7}>
            {/* question header */}

            <Paper
              variant="outlined"
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "1.2rem",
                border: "2px solid #e0e0e0",
              }}
            >
              {/* profile pic and ask question */}
              <Grid container spacing={3}>
                {/* header */}
                <Grid item md={1} mt={0.5}>
                  <Avatar
                    alt="profile"
                    src="https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg"
                  />
                </Grid>

                {/* ask question */}
                <Grid item lg={8.5}>
                  <Link href="/ask-question">
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        style={{
                          backgroundColor: "#f5f5f5",
                        }}
                        startAdornment={
                          <InputAdornment>Ask Question</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Link>
                </Grid>

                <Grid item mt={1.5} >
                <Iconify icon="akar-icons:image" width={25} height={25} />
                </Grid>
                <Grid item mt={1.5} >
                <Iconify icon="akar-icons:link-chain" width={25} height={25} />
                </Grid>
              </Grid>
            </Paper>

            {solution.homeSolutions &&
              solution.homeSolutions.map((post) => (
                <SolutionPostCard key={post._id} solution={post} />
              ))}
          </Grid>

          {/* <Grid
            item
            xs={12}
            md={4}
            ml={4}
            lg={3}
            style={{
              backgroundColor: "blue",
            }}
          >
            <Typography>Hello</Typography>
          </Grid> */}
        </Grid>

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
