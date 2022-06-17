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
  FormHelperText
} from "@mui/material";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";
import { getFriends } from "../../redux/actions/messengerActions";

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
  color: theme.palette.text.secondary
}));

function HomePage() {
  const { themeStretch } = useSettings();
  const auth = useSelector(state => state.auth);
  const solution = useSelector(state => state.solution);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllSolutionHome());
    dispatch(getFriends());
  }, []);

  return (
    <Page title='Home'>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Grid container spacing={3}>
          {/* left */}

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            order={{ xs: 3, md: 1 }}
            sx={{ display: { xs: "none", xl: "block" } }}
          >
            <TopExperts />
          </Grid>

          {/* center posts */}

          <Grid item xs={12} lg={6} order={{ xs: 2, md: 1 }}>
            {/* question header */}

            <Paper
              variant='outlined'
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "1.2rem"
              }}
            >
              {/* profile pic and ask question */}
              <Grid container spacing={3}>
                {/* header */}
                <Grid item md={1} mt={0.5}>
                  <Avatar
                    alt='profile'
                    src='https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg'
                  />
                </Grid>

                {/* ask question */}
                <Grid item lg={8.5}>
                  <Link href='/ask-question'>
                    <FormControl fullWidth>
                      <OutlinedInput
                        startAdornment={<InputAdornment>Ask Question</InputAdornment>}
                      />
                    </FormControl>
                  </Link>
                </Grid>

                <Grid item mt={1.5}>
                  <Iconify icon='akar-icons:image' width={25} height={25} />
                </Grid>
                <Grid item mt={1.5}>
                  <Iconify icon='akar-icons:link-chain' width={25} height={25} />
                </Grid>
              </Grid>
            </Paper>

            {solution.homeSolutions &&
              solution.homeSolutions.map(post => (
                <SolutionPostCard key={post._id} solution={post} />
              ))}
          </Grid>

          {/* right */}
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sx={{ display: { xs: "none", xl: "block" } }}
            order={{ xs: 1, md: 1 }}
          >
            <TopExperts />
          </Grid>
        </Grid>

        <div
          style={{
            margin: "20vh",
            backgroundColor: "#fff",
            textAlign: "center"
          }}
        >
          This is Home Page
          {auth.isAuthenticated ? <p>You are logged in</p> : <p>You are not logged in</p>}
          {auth.isAuthenticated ? (
            <button onClick={() => dispatch(logOutUser(navigate))}>Log Out</button>
          ) : (
            <button onClick={() => navigate("/login")}>Log In</button>
          )}
        </div>
      </Container>
    </Page>
  );
}

export default HomePage;
