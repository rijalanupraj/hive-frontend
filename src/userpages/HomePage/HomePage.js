import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import "./css/Homepage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MyAvatar from "../../components/MyAvatar";
import handleViewport from "react-in-viewport";

import { getAllSolutionHome } from "../../redux/actions/solutionActions";

import SolutionPostCard from "../../sections/cards/SolutionPostCard";
import useSettings from "../../hooks/useSettings";

import { _userFeeds } from "../../_mock/_user";
import TopExperts from "./HomePages/TopExperts";
import HotQuestions from "./HomePages/HotQuestions";

import HomeFilter from "./HomePages/HomeFilter";

import Footer from "./HomePages/Footer";
import TagCard from "../QuestionsPage/components/TagsCard";
import ViewTags from "../Tags/ViewTags";
import SidebarTags from "../Tags/SidebarTags";

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

const Block = (props: { inViewport: boolean }) => {
  const { inViewport, forwardedRef } = props;
  return (
    <div className="viewport-block" ref={forwardedRef}>
      <div style={{ width: "400px", height: "100px" }} />
    </div>
  );
};

const ViewportBlock = handleViewport(Block);

function HomePage() {
  const { themeStretch } = useSettings();
  const auth = useSelector((state) => state.auth);
  const solution = useSelector((state) => state.solution);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState("recent");

  const handleFilterChange = (event, newValue) => {
    setCurrentFilter(newValue);
  };

  const onViewPortEnter = () => {
    if (!solution.homeAllLoaded) {
      if (solution.homePageNumber === null) {
        dispatch(getAllSolutionHome(1, currentFilter));
      } else {
        dispatch(
          getAllSolutionHome(solution.homePageNumber + 1, currentFilter)
        );
      }
    }
  };

  // Only on filter change
  useEffect(() => {
    dispatch(getAllSolutionHome(1, currentFilter));
  }, [currentFilter]);

  return (
    <Page title="Home">
      <Container maxWidth="full">
        <Grid container spacing={3}>
          {/* left */}

          <Grid
            item
            xs={2}
            md={4}
            lg={3}
            order={{ xs: 3, md: 1 }}
            sx={{ display: { xs: "none", xl: "block" } }}
          >
            <TopExperts auth={auth} />
            <br />
            <Footer />
          </Grid>

          {/* center posts */}

          <Grid item xs={12} mb={3} lg={6} order={{ xs: 2, md: 1 }}>
            {/* start question header */}

            <Card
              variant="outlined"
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "1.2rem",
              }}
            >
              {/* start profile pic and ask question */}
              <Grid container spacing={3}>
                {/* header */}
                <Grid item md={1} mt={0.5}>
                  {auth.isAuthenticated ? (
                    <Avatar
                      alt={auth.me.username}
                      src={
                        auth?.me?.profilePhoto?.hasPhoto
                          ? auth?.me?.profilePhoto.url
                          : ""
                      }
                    />
                  ) : (
                    <MyAvatar />
                  )}
                </Grid>

                {/* start ask question */}
                <Grid item lg={10} fullWidth>
                  <Link to="/ask-question" component={RouterLink}>
                    <FormControl lg={10} fullWidth>
                      <OutlinedInput
                        startAdornment={
                          <InputAdornment lg={10} fullWidth>
                            What's on your mind
                            {auth.isAuthenticated ? (
                              <p>,&nbsp;{auth.me.username}?</p>
                            ) : (
                              <p>?</p>
                            )}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Link>
                </Grid>

                {/* end ask questions */}
              </Grid>

              {/* end profile and ask question */}
            </Card>

            {/* start filter */}

            <HomeFilter
              currentFilter={currentFilter}
              handleFilterChange={handleFilterChange}
              auth={auth}
             
            />

            {/* end filter */}

            {/* end question header */}

            {solution.homeSolutions &&
              solution.homeSolutions.map((post) => (
                <SolutionPostCard key={post._id} solution={post} />
              ))}
            {solution.homeSolutions.length > 0 && (
              <ViewportBlock
                onEnterViewport={() => onViewPortEnter()}
                onLeaveViewport={() => console.log("leave")}
              />
            )}
          </Grid>

          {/* right */}
          <Grid
            item
            xs={2}
            md={4}
            lg={3}
            sx={{ mb: 2, display: { xs: "none", xl: "block" } }}
            order={{ xs: 1, md: 1 }}
          >
            <HotQuestions />
            <br />
            {/* <SidebarTags /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default HomePage;
