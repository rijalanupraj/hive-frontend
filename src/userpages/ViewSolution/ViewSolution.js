import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Markdown from "../../components/Markdown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import moment from "moment";
import { viewSolution } from "../../redux/actions/viewSolutionActions";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "./components/CommentSection";
import { red } from "@mui/material/colors";
import {
  upVoteAnySolution,
  downVoteAnySolution,
} from "../../redux/actions/solutionActions";

import Iconify from "../../components/Iconify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import SharesolutionButton from "./components/shareButton";
import EditDeleteButoon from "./components/EditDeleteButton";
import ReportSolution from "./components/ReportSolution";
const theme = createTheme();

export default function ViewSolution() {
  const dispatch = useDispatch();
  const { solutionId } = useParams();
  const solution = useSelector((state) => state.viewSolutions);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(viewSolution(solutionId));
  }, []);

  useEffect(() => {
    let sol = solution.solution;
    if (auth.me && sol) {
      setUpVoteCount(solution.solution.upVoteCount);
      setDownVoteCount(solution.solution.downVoteCount);
      if (
        auth.me.solutionUpVotes.includes(sol._id) &&
        sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(sol.upVotes.length);
      } else if (
        auth.me.solutionUpVotes.includes(sol._id) &&
        !sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(sol.upVotes.length + 1);
      } else if (
        !auth.me.solutionUpVotes.includes(sol._id) &&
        sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(sol.upVotes.length - 1);
      } else if (
        !auth.me.solutionUpVotes.includes(sol._id) &&
        !sol.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(sol.upVotes.length);
      } else {
        setIsUpVote(false);
        setUpVoteCount(sol.upVotes.length);
      }

      if (
        auth.me.solutionDownVotes.includes(sol._id) &&
        sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(sol.downVotes.length);
      } else if (
        auth.me.solutionDownVotes.includes(sol._id) &&
        !sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(sol.downVotes.length + 1);
      } else if (
        !auth.me.solutionDownVotes.includes(sol._id) &&
        sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(sol.downVotes.length - 1);
      } else if (
        !auth.me.solutionDownVotes.includes(sol._id) &&
        !sol.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(sol.downVotes.length);
      } else {
        setIsDownVote(false);
        setDownVoteCount(sol.downVotes.length);
      }
    }
  }, [auth.me, solution.solution]);

  if (!solution.solution) {
    return <div>Loading...</div>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    margin: "auto",
    transition: "0.3s",
    textAlign: "center",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* stack for image and title */}
      <Grid sx={{ justifyContent: "flex" }}>
        <Box sx={{ flexGrow: 1, m: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={2} sx={{ display: "block", mx: "auto" }}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={solution?.solution?.user?.profilePhoto}
                      ></Avatar>
                    }
                    title={solution?.solution?.user?.username}
                  />
                </Card>
              </Item>

              <Item
                sx={{
                  mt: 2,
                }}
              >
                {auth.isAuthenticated && (
                  <Card style={{ border: "none", boxShadow: "none" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        pl: 2,
                        pb: 0,
                      }}
                    >
                      <Stack direction="row" alignItems="center">
                        {/* upvote  */}
                        <IconButton
                          onClick={() => {
                            dispatch(upVoteAnySolution(solution.solution._id));
                          }}
                        >
                          <Iconify
                            icon={isUpVote ? "bxs:upvote" : "bx:upvote"}
                            width={20}
                            height={20}
                          />
                        </IconButton>
                        <Typography variant="caption">{upVoteCount}</Typography>

                        <IconButton
                          onClick={() => {
                            dispatch(
                              downVoteAnySolution(solution.solution._id)
                            );
                          }}
                        >
                          <Iconify
                            icon={isDownVote ? "bxs:downvote" : "bx:downvote"}
                            width={20}
                            height={20}
                          />
                        </IconButton>
                        <Typography variant="caption">
                          {downVoteCount}
                        </Typography>
                      </Stack>
                    </Box>
                  </Card>
                )}
              </Item>

              {auth.me.id === solution?.solution?.user?.id && (
                <Item sx={{ mt: 2 }}>
                  <EditDeleteButoon solution={solution} />
                </Item>
              )}
              <Item>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Share
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Share this solution"}
                  </DialogTitle>
                  <SharesolutionButton solution={solution} />
                </Dialog>
              </Item>
              {auth.me._id !== solution?.solution?.user?._id && (
                <Item>
                  <ReportSolution solution={solution?.solution}  />
                </Item>
              )}
            </Grid>
            <Grid item xs={7}>
              <Item
                sx={{
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  border: " solid #fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      m: 1,
                      width: "100%",
                      height: "10%",
                    },
                  }}
                >
                  <Paper elevation={0} />
                  <Box
                    component="img"
                    alt="The house from the offer."
                    src="https://i.ibb.co/zQfhxnq/question-question-mark-symbol-140746-1920x1080.jpg"
                    sx={{
                      maxHeight: "250px",
                    }}
                  />
                  <Paper />
                </Box>
                <Stack
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {},
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    {solution?.solution?.question?.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      typography: "body2",
                      color: "#858585",
                      ml: 5,
                    }}
                    component="div"
                    gutterBottom
                  >
                    {solution?.solution?.question?.category}

                    <Chip
                      label={` ${moment(
                        solution?.solution?.question?.updatedAt
                      ).fromNow()}`}
                      variant="outlined"
                      sx={{
                        border: "none",
                        typography: "body2",
                        color: "#858585",
                      }}
                    />
                  </Typography>
                </Stack>
              </Item>
              <Item
                sx={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  border: " solid #fff",
                  mt: 2,
                }}
              >
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
                  <Markdown children={solution?.solution?.answer || ""} />
                  <Stack direction="row" spacing={1} sx={{ my: 10 }}>
                    {solution?.solution?.tags.map((tag) => (
                      <Chip label={tag} variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </Item>
              <Item
                sx={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,

                  borderBottomRightRadius: 16,
                  mt: 2,
                  mb: 5,
                }}
              >
                {auth.isAuthenticated && (
                  <CommentSection solution={solution?.solution} />
                )}
                {!auth.isAuthenticated && (
                  <Typography variant="body2" gutterBottom>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate(
                          "/login?redirectTo=" + window.location.pathname
                        );
                      }}
                    >
                      Login to comment
                    </Button>
                  </Typography>
                )}
              </Item>
            </Grid>
            <Grid item xs>
              <Item
                sx={{
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  border: " solid #fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", my: 2 }}
                  component="div"
                  gutterBottom
                >
                  Related Solution
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
