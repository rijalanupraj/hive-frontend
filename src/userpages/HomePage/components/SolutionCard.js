import React from "react";
import { Grid, Paper, Box, Typography, ButtonBase, Stack, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import moment from "moment";

// Icons
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import Avatar from "../../../components/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toggleBookmark } from "../../../redux/actions/authActions";
import { useEffect } from "react";

const SolutionCard = props => {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { solution } = props;

  return (
    <div>
      <Paper
        variant='outlined'
        style={{
          padding: "1rem",
          marginTop: "0.7rem"
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            style={{
              paddingLeft: "1.5rem"
            }}
          >
            <ButtonBase sx={{ width: 10, height: 10 }}>
              {/* profile */}
              <Avatar
                alt='profile'
                src='https://minimal-assets-api.vercel.app/assets/images/avatars/avatar-1.jpg'
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={0}>
              <Grid item xs>
                {/* username */}
                <Typography
                  variant='body1'
                  gutterBottom
                  style={{
                    paddingLeft: "0.5rem",
                    fontWeight: "bold",
                    marginTop: "-0.3rem"
                  }}
                >
                  {solution.user.username}
                </Typography>

                {/* posted on */}
                <Typography
                  variant='body2'
                  color='text.secondary'
                  style={{
                    paddingLeft: "0.5rem",
                    marginTop: "-0.5rem"
                  }}
                >
                  {moment(solution.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>

            {/* follow button */}
            <Grid item>
              <LoadingButton fullWidth size='small' type='submit' variant='contained'>
                Follow
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>

        {/* read solution */}
        <Stack
          style={{
            marginTop: "1rem"
          }}
        >
          <Stack>
            <Typography
              variant='h8'
              style={{
                fontWeight: "bold"
              }}
            >
              {solution.question.title}
            </Typography>
          </Stack>

          <Stack>
            <p
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem"
              }}
            >
              {solution.answer}
              <a
                href='\'
                style={{
                  textDecoration: "none"
                }}
              >
                {" "}
                (see more)
              </a>
            </p>
          </Stack>
        </Stack>

        {/* picture */}
        <Stack>
          <div
            style={{
              backgroundColor: "#2d2b1f",
              backgroundSize: "cover"
            }}
          >
            {/* <img
              alt="Unavailable"
              src={
                "https://business.wisc.edu/wp-content/uploads/2019/01/triumph-490x327-1.jpg"
              }
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "70%",
                backgroundSize: "cover",
              }}
            /> */}
          </div>
        </Stack>

        {/* upvote/downvote section */}
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={0}>
            <Grid item xs>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* upvote */}
                <IconButton size='large' aria-label='upvote' color='inherit'>
                  <ArrowUpwardIcon />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom"
                    }}
                  >
                    {solution.upVotes.length}
                  </Typography>
                </IconButton>

                {/* downvote */}
                <IconButton size='large' aria-label='downvote' color='inherit'>
                  <ArrowDownwardIcon />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom"
                    }}
                  >
                    {solution.downVotes.length}
                  </Typography>
                </IconButton>

                {/* comment */}
                <IconButton size='large' aria-label='comment' color='inherit'>
                  <ChatBubbleOutlineIcon />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom"
                    }}
                  >
                    {solution.comments.length}
                  </Typography>
                </IconButton>

                {/* share */}
                <IconButton size='large' aria-label='share' color='inherit'>
                  <ShareIcon />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom"
                    }}
                  >
                    0
                  </Typography>
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Grid item>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* bookmark */}
              {auth.isAuthenticated ? (
                <IconButton
                  size='large'
                  aria-label='bookmark'
                  color='inherit'
                  onClick={() => {
                    dispatch(toggleBookmark(solution._id));
                  }}
                >
                  {auth.me.bookmarks.includes(solution._id) ? (
                    <BookmarkRemoveIcon />
                  ) : (
                    <BookmarkAddOutlinedIcon />
                  )}
                </IconButton>
              ) : (
                <IconButton
                  size='large'
                  aria-label='bookmark'
                  onClick={() => {
                    navigate("/login?redirectTo=/solution/" + solution._id);
                  }}
                  color='inherit'
                >
                  <BookmarkBorderIcon />
                </IconButton>
              )}

              {/* report */}
              <IconButton size='large' aria-label='report' color='inherit'>
                <FlagIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SolutionCard;
