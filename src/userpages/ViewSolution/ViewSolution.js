import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, TextField, Button } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";
import {
  viewSolution,
  upVoteSolution,
  downVoteSolution,
} from "../../redux/actions/viewSolutionActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "./components/CommentSection";
const theme = createTheme();
export default function AskQuestion() {
  const dispatch = useDispatch();
  const { solutionId } = useParams();
  const solution = useSelector((state) => state.viewSolutions);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(viewSolution(solutionId));
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!solution.solution) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* stack for image and title */}
      <Paper sx={{ justifyContent: "flex" }}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 0,
                width: "100%",
                height: "10%",
              },
            }}
          >
            <Paper elevation={0} />
            <Box
              component="img"
              alt="The house from the offer."
              src="https://i.ibb.co/grnLWrt/cover.png"
            />
            <Paper />
          </Box>
          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                mx: 5,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              component="div"
              gutterBottom
            >
              {solution?.solution?.question?.title}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", typography: "body2", padding: "1rem" }}
              component="div"
              gutterBottom
            >
              {solution?.solution?.question?.category}
              <Chip
                label={`posted on: ${
                  solution?.solution?.question?.createdAt.split("T")[0]
                }`}
                variant="outlined"
                sx={{ mx: 4 }}
              />
            </Typography>
          </Stack>
        </Stack>
        {/* stack for main content */}
        <Card sx={{ maxWidth: 200, mx: 5, borderRadius: 5 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{}}
                // src={solution?.solution?.user?.profilePhoto}
                src={user.profile.profilePhoto}
                aria-label="recipe"
              ></Avatar>
            }
            title={solution?.solution?.user?.username}
            subheader={`followers: ${solution?.solution?.user?.followers.length}`}
          />
        </Card>
        {auth.isAuthenticated && (
          <Card sx={{ maxWidth: 150, mx: 5, my: 3, borderRadius: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 0 }}>
              <IconButton
                style={{ color: "green", fontWeight: 25, fontSize: 20 }}
                onClick={() =>
                  dispatch(upVoteSolution(solution?.solution?._id))
                }
              >
                <ArrowUpwardIcon />
                {solution?.solution?.upVotes.length}
              </IconButton>

              <IconButton
                style={{ color: "red", fontWeight: 25, fontSize: 20 }}
                onClick={() =>
                  dispatch(downVoteSolution(solution?.solution?._id))
                }
              >
                <ArrowDownwardIcon />
                {solution?.solution?.downVotes.length}
              </IconButton>
            </Box>
          </Card>
        )}

        {!auth.isAuthenticated && (
          <Card sx={{ maxWidth: 150, mx: 5, my: 3, borderRadius: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 0 }}>
              <IconButton
                style={{ color: "green", fontWeight: 25, fontSize: 20 }}
                onClick={() => {
                  navigate("/login?redirectTo=" + window.location.pathname);
                }}
              >
                <ArrowUpwardIcon />
                {solution?.solution?.upVotes.length}
              </IconButton>

              <IconButton
                style={{ color: "red", fontWeight: 25, fontSize: 20 }}
                onClick={() => {
                  navigate("/login?redirectTo=" + window.location.pathname);
                }}
              >
                <ArrowDownwardIcon />
                {solution?.solution?.downVotes.length}
              </IconButton>
            </Box>
          </Card>
        )}

        <Grid container>
          <Grid item xs={8} sx={{ my: 8 }}>
            <Stack
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  mx: 5,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", my: 2 }}
                component="div"
                gutterBottom
              >
                Introduction
              </Typography>
              <Typography variant="body2" gutterBottom>
                {solution?.solution?.answer}
              </Typography>
              {/* <Typography
              variant="h6"
              sx={{ fontWeight: "bold", my: 2 }}
              component="div"
              gutterBottom
            >
              Solution
            </Typography> */}
              <Stack direction="row" spacing={1} sx={{ my: 10 }}>
                {solution?.solution?.tags.map((tag) => (
                  <Chip label={tag} variant="outlined" />
                ))}
              </Stack>
              {auth.isAuthenticated && (
                <CommentSection solution={solution?.solution} />
              )}
              {!auth.isAuthenticated && (
                <Typography variant="body2" gutterBottom>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate("/login?redirectTo=" + window.location.pathname);
                    }}
                  >
                    Login to comment
                  </Button>
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* <Grid item sx={{ justifyContent: "end" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mx: 5 }}
              component="div"
              gutterBottom
            >
              Other Solutions
            </Typography>
          </Grid> */}
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
