import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  ButtonBase,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import moment from "moment";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Paper
        variant="outlined"
        style={{
          padding: "1rem",
          marginTop: "0.7rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            style={{
              paddingLeft: "1.5rem",
            }}
          >
            <ButtonBase sx={{ width: 10, height: 10 }}>
              {/* profile */}
              <img
                alt="complex"
                src={
                  "http://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png"
                }
                style={{
                  borderRadius: "50%",
                  width: "400%",
                }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
                {/* username */}
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    paddingLeft: "0.5rem",
                    fontWeight: "bold",
                    marginTop: "-0.3rem",
                  }}
                >
                  {question.user.username}
                </Typography>

                {/* posted on */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    paddingLeft: "0.5rem",
                    marginTop: "-0.5rem",
                  }}
                >
                  {moment(question.createdAt).fromNow()}
                </Typography>
              </Grid>
              {/* follow button */}
            </Grid>
            <Grid item>
              <Button
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/post-solution/${question._id}`);
                }}
              >
                Answer
              </Button>
            </Grid>
          
          </Grid>
        </Grid>

        {/* read solution */}
        <Stack
          style={{
            marginTop: "1rem",
          }}
        >
          <Stack>
            <Typography
              variant="h8"
              style={{
                fontWeight: "bold",
              }}
            >
              {question.title}
            </Typography>
          </Stack>

          <Stack>
            <p>
              {question.description}
              <a
                href="\"
                style={{
                  textDecoration: "none",
                }}
              >
                {" "}
                (see more)
              </a>
            </p>
          </Stack>
        </Stack>

        {/* upvote/downvote section */}
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={0}>
            <Grid item xs>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* upvote */}
                <IconButton size="large" aria-label="upvote" color="inherit">
                  <ArrowUpwardIcon />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom",
                    }}
                  >
                    {/* {solution.upVotes.length} */}
                  </Typography>
                </IconButton>

                {/* downvote */}
                <IconButton size="large" aria-label="downvote" color="inherit">
                  <ArrowDownwardIcon />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom",
                    }}
                  >
                    {/* {solution.downVotes.length} */}
                  </Typography>
                </IconButton>

                {/* comment */}
                <IconButton size="large" aria-label="comment" color="inherit">
                  <ChatBubbleOutlineIcon />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom",
                    }}
                  >
                    {/* {solution.comments.length} */}
                  </Typography>
                </IconButton>

                {/* share */}
                <IconButton size="large" aria-label="share" color="inherit">
                  <ShareIcon />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      paddingLeft: "0.3rem",
                      marginTop: "auto",
                      marginBottom: "bottom",
                    }}
                  >
                    0
                  </Typography>
                </IconButton>

                {/* Answer Icon */}
              </Box>
            </Grid>
          </Grid>

          <Grid item>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* bookmark */}
              <IconButton size="large" aria-label="bookmark" color="inherit">
                <BookmarkBorderIcon />
              </IconButton>

              {/* report */}
              <IconButton size="large" aria-label="report" color="inherit">
                <FlagIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default QuestionCard;
