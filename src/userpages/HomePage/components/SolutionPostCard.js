
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
// import { fDate } from "../../../utils/formatTime";
// import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import MyAvatar from "../../../components/MyAvatar";
import EmojiPicker from "../../../components/EmojiPicker";

// ----------------------------------------------------------------------


export default function SolutionPostCard() {
  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");


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
            {/* {fDate(post.createdAt)} */} 11 Jun 2022
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
        <Typography variant="h6" align="justify">
          What does we need to open a Bank Account?
        </Typography>

        {/* Answer */}
        <Typography variant="inherit" align="justify">
          Whether you apply for a bank account online or in person, you’ll need
          a government-issued ID and personal details, such as your Social
          Security number, on hand. You might also be asked to fund your account
          with an initial deposit. Here are details on what you need to open a
          savings account or checking account and what to expect during the
          process.
        </Typography>

        {/* image */}

        <Image
          alt="post media"
          src="https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png"
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
                
                icon={<Iconify icon={"bx:upvote"} />}
                checkedIcon={<Iconify icon={"bx:upvote"} />}
               
              />
            }
            label='23'
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/*  downvote */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                icon={<Iconify icon={"bx:downvote"} />}
                checkedIcon={<Iconify icon={"bx:downvote"} />}
              />
            }
            label="11"
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/* comment */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                icon={<Iconify icon={"fa-regular:comment"} />}
                checkedIcon={<Iconify icon={"fa-regular:comment"} />}
              />   
            }
            label="5"
            sx={{ minWidth: 72, mr: 0 }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
          </IconButton>

          <IconButton>
            <Iconify icon={"ant-design:share-alt-outlined"} width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleClickComment}>
            <Iconify
              icon={"ic:outline-report-problem"}
              width={20}
              height={20}
            />
          </IconButton>
        </Stack>

        {/* write comment */}
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
        
        {/* read Comment 1 */}
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="profile"
              src="https://i.ytimg.com/vi/CI2gyevDC6Q/maxresdefault.jpg"
            />
            <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="subtitle2">
                  {/* {comment.author.name} */} Aanya Forger
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {/* {fDate(comment.createdAt)} */} 11 Jun 2022
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {/* {comment.message} */} A valid, government-issued photo ID, such as a driver’s license or a passport.
                 
              </Typography>
            </Paper>
          </Stack>
        </Stack>

        {/* read Comment 2 */}
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="profile"
              src="https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/02/aharensanwahakarenai_pv2screenshot.png"
            />
            <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="subtitle2">
                  {/* {comment.author.name} */}Aharen-San
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {/* {fDate(comment.createdAt)} */} 11 Jun 2022
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {/* {comment.message} */} Nondrivers can get a state ID card at the Department of Motor Vehicles office.
              </Typography>
            </Paper>
          </Stack>
        </Stack>


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
