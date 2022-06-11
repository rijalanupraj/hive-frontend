import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";

// utils
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import MyAvatar from "../../../components/MyAvatar";
import EmojiPicker from "../../../components/EmojiPicker";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  chat: getIcon("ic_chat"),
};

SolutionPostCard.propTypes = {
  post: PropTypes.object,
};

export default function SolutionPostCard({ post }) {
  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isLiked, setLiked] = useState(post.isLiked);

  const [likes, setLikes] = useState(post.personLikes.length);

  const [message, setMessage] = useState("");

  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value) => {
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
        border: "2px solid #e0e0e0",
        marginTop: "1rem",
      }}
    >
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            Mamba
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
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
        <Typography variant="h6" align="justify">
          {post.question}
        </Typography>

        <Typography variant="inherit" align="justify">
          Not a medical doctor. This is not the type of thing one can get an
          on-line degree for or mail away for a diploma. To be a medical doctor
          one must do the work and do the time in training.
          <br />
          However, one can be awarded an Honorary Doctorate (PhD) for doing
          something, or being somehow, outstanding.
        </Typography>

        {/* image */}

        <Image
          alt="post media"
          src={post.media}
          ratio="16/9"
          sx={{ borderRadius: 1 }}
        />

        <Stack direction="row" alignItems="center">
          {/* upvote  */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={"bxs:upvote"} />}
                checkedIcon={<Iconify icon={"bxs:upvote"} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/*  downvote */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                icon={<Iconify icon={"bxs:downvote"} />}
                checkedIcon={<Iconify icon={"bxs:downvote"} />}
              />
            }
            label="11"
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/* comment */}
          <FormControlLabel
            control={
              <IconButton onClick={handleClickComment}>
                <Iconify icon={"fa-solid:comment"} width={20} height={20} />
              </IconButton>
            }
            label="5"
            sx={{ minWidth: 72, mr: 0 }}
          />

          {/* <AvatarGroup
            max={4}
            sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}
          >
            {post.personLikes.map((person) => (
              <Avatar
                key={person.name}
                alt={person.name}
                src={person.avatarUrl}
              />
            ))}
          </AvatarGroup> */}
          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            <Iconify icon={"el:share-alt"} width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleClickComment}>
            <Iconify
              icon={"ic:baseline-report-problem"}
              width={20}
              height={20}
            />
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center">
          <MyAvatar />
          <TextField
            fullWidth
            size="small"
            value={message}
            inputRef={commentInputRef}
            placeholder="Write a comment…"
            onChange={(event) => handleChangeMessage(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClickAttach}>
                    <Iconify
                      icon={"ic:round-add-photo-alternate"}
                      width={24}
                      height={24}
                    />
                  </IconButton>
                  <EmojiPicker />
                </InputAdornment>
              ),
            }}
            sx={{
              ml: 2,
              mr: 1,
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: (theme) =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <IconButton>
            <Iconify icon={"ic:round-send"} width={24} height={24} />
          </IconButton>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} />
        </Stack>

        {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar
                  alt="profile"
                  src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar-1.jpg"
                />
                <Paper
                  sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">
                      {comment.author.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.disabled" }}
                    >
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )}
        
        {/* view more comment */}
        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Link href="/" sx={{ color: "text.secondary" }}>
                View more comments
              </Link>
            }
          />
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel
            control={
              <Typography href="/" sx={{ color: "text.secondary" }}>
                2 of 5
              </Typography>
            }
          />
        </Stack>
      </Stack>
    </Card>
  );
}
