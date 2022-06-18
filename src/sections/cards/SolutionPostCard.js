import { useState, useRef, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Markdown from "../../components/Markdown";

// utils
import { fDate } from "../../utils/formatTime";
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";

import { toggleBookmark } from "../../redux/actions/authActions";
import { upVoteAnySolution, downVoteAnySolution } from "../../redux/actions/solutionActions";

// ----------------------------------------------------------------------

export default function SolutionPostCard({ solution }) {
  const auth = useSelector(state => state.auth);
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(solution.upVotes.length);
  const [downVoteCount, setDownVoteCount] = useState(solution.downVotes.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth.me) {
      if (
        auth.me.solutionUpVotes.includes(solution._id) &&
        solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(solution.upVotes.length);
      } else if (
        auth.me.solutionUpVotes.includes(solution._id) &&
        !solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(true);
        setUpVoteCount(solution.upVotes.length + 1);
      } else if (
        !auth.me.solutionUpVotes.includes(solution._id) &&
        solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(solution.upVotes.length - 1);
      } else if (
        !auth.me.solutionUpVotes.includes(solution._id) &&
        !solution.upVotes.includes(auth.me._id)
      ) {
        setIsUpVote(false);
        setUpVoteCount(solution.upVotes.length);
      } else {
        setIsUpVote(false);
        setUpVoteCount(solution.upVotes.length);
      }

      if (
        auth.me.solutionDownVotes.includes(solution._id) &&
        solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(solution.downVotes.length);
      } else if (
        auth.me.solutionDownVotes.includes(solution._id) &&
        !solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(true);
        setDownVoteCount(solution.downVotes.length + 1);
      } else if (
        !auth.me.solutionDownVotes.includes(solution._id) &&
        solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(solution.downVotes.length - 1);
      } else if (
        !auth.me.solutionDownVotes.includes(solution._id) &&
        !solution.downVotes.includes(auth.me._id)
      ) {
        setIsDownVote(false);
        setDownVoteCount(solution.downVotes.length);
      } else {
        setIsDownVote(false);
        setDownVoteCount(solution.downVotes.length);
      }
    }
  }, [auth.me]);

  const handleChangeMessage = value => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card
      style={{
        marginTop: "1rem"
      }}
    >
      <CardHeader
        disableTypography
        avatar={
          solution?.user?.profilePhoto?.hasPhoto ? (
            <Avatar src={solution?.user.profilePhoto.url} alt={solution?.user?.username} />
          ) : (
            <MyAvatar />
          )
        }
        title={
          <Link
            to={"/profile/" + solution?.user?.username}
            variant='subtitle2'
            color='text.primary'
            component={RouterLink}
          >
            {solution?.user?.username}
          </Link>
        }
        subheader={
          <Typography variant='caption' sx={{ display: "block", color: "text.secondary" }}>
            {fDate(solution?.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        }
        // action={
        //   <LoadingButton
        //     fullWidth
        //     size="small"
        //     type="submit"
        //     variant="contained"
        //   >
        //     Follow
        //   </LoadingButton>
        // }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant='h6' align='justify'>
          {solution?.question?.title}
        </Typography>

        {/* Answer */}
        <Markdown children={solution?.answer.slice(0, 100) || ""} />
        <Link
          to={"/solution/" + solution?._id}
          variant='body1'
          color='text.secondary'
          component={RouterLink}
        >
          Continue Reading
        </Link>

        {/* image */}

        <Image
          alt='post media'
          src='https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png'
          ratio='2/1'
          sx={{ borderRadius: 1 }}
        />
   

        {/* status */}
        <Divider />
        <Stack direction='row' alignItems='center'>
          {/* upvote  */}
          <IconButton
            onClick={() => {
              dispatch(upVoteAnySolution(solution._id));
            }}
          >
            <Iconify icon={isUpVote ? "bxs:upvote" : "bx:upvote"} width={20} height={20} />
          </IconButton>
          <Typography variant='caption'>{upVoteCount}</Typography>

          <IconButton
            onClick={() => {
              dispatch(downVoteAnySolution(solution._id));
            }}
          >
            <Iconify icon={isDownVote ? "bxs:downvote" : "bx:downvote"} width={20} height={20} />
          </IconButton>
          <Typography variant='caption'>{downVoteCount}</Typography>
          {/* comment */}
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                color='error'
                icon={<Iconify icon={"fa-regular:comment"} />}
                checkedIcon={<Iconify icon={"fa-regular:comment"} />}
              />
            }
            label='5'
            sx={{ minWidth: 72, mr: 0, ml: 1 }}
          />

          <Box sx={{ flexGrow: 1 }} />

          {!auth.isAuthenticated ? (
            <IconButton
              onClick={() => {
                navigate("/login?redirectTo=/solution/" + solution._id);
              }}
            >
              <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                dispatch(toggleBookmark(solution._id));
              }}
            >
              <Iconify
                icon={
                  auth.me.bookmarks.includes(solution._id)
                    ? "bi:bookmark-dash-fill"
                    : "bi:bookmark-check"
                }
                width={20}
                height={20}
              />
            </IconButton>
          )}

          <IconButton>
            <Iconify icon={"ant-design:share-alt-outlined"} width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleClickComment}>
            <Iconify icon={"ic:outline-report-problem"} width={20} height={20} />
          </IconButton>
        </Stack>

        {/* write comment */}
        <Stack direction='row' alignItems='center'>
          <MyAvatar />
          <TextField
            fullWidth
            size='small'
            value={message}
            inputRef={commentInputRef}
            placeholder='Write a comment…'
            onChange={event => handleChangeMessage(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton size='small' onClick={handleClickAttach}>
                    <Iconify icon={"ic:round-add-photo-alternate"} width={24} height={24} />
                  </IconButton>
                  <EmojiPicker />
                </InputAdornment>
              )
            }}
            sx={{
              ml: 2,
              mr: 1,
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: theme => `${theme.palette.grey[500_32]} !important`
              }
            }}
          />
          <IconButton>
            <Iconify icon={"ic:round-send"} width={24} height={24} />
          </IconButton>
          <input type='file' ref={fileInputRef} style={{ display: "none" }} />
        </Stack>

        {/* read Comment 1 */}
        <Stack spacing={1.5}>
          <Stack direction='row' spacing={2}>
            <Avatar alt='profile' src='https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg' />
            <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent='space-between'
                sx={{ mb: 0.5 }}
              >
                <Typography variant='subtitle2'>
                  {/* {comment.author.name} */} Aanya Forger
                </Typography>
                <Typography variant='caption' sx={{ color: "text.disabled" }}>
                  {/* {fDate(comment.createdAt)} */} 11 Jun 2022
                </Typography>
              </Stack>
              <Typography variant='body2' sx={{ color: "text.secondary" }}>
                {/* {comment.message} */} A valid, government-issued photo ID, such as a driver’s
                license or a passport.
              </Typography>
            </Paper>
          </Stack>
        </Stack>

        {/* read Comment 2 */}
        <Stack spacing={1.5}>
          <Stack direction='row' spacing={2}>
            <Avatar
              alt='profile'
              src='https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/02/aharensanwahakarenai_pv2screenshot.png'
            />
            <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent='space-between'
                sx={{ mb: 0.5 }}
              >
                <Typography variant='subtitle2'>{/* {comment.author.name} */}Aharen-San</Typography>
                <Typography variant='caption' sx={{ color: "text.disabled" }}>
                  {/* {fDate(comment.createdAt)} */} 11 Jun 2022
                </Typography>
              </Stack>
              <Typography variant='body2' sx={{ color: "text.secondary" }}>
                {/* {comment.message} */} Nondrivers can get a state ID card at the Department of
                Motor Vehicles office.
              </Typography>
            </Paper>
          </Stack>
        </Stack>

        {/* view more comment */}
        <Stack direction='row' alignItems='center'>
          <FormControlLabel
            control={
              <Link href='/' sx={{ color: "text.secondary" }}>
                View more comments
              </Link>
            }
          />
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel
            control={
              <Typography href='/' sx={{ color: "text.secondary" }}>
                2 of 5
              </Typography>
            }
          />
        </Stack>
      </Stack>
    </Card>
  );
}
