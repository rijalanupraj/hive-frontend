import { useRef, useState } from "react";

// @mui
import {
  Box,
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Avatar,
  Link,
  Paper,

} from "@mui/material";
// routes

import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import Iconify from "../../components/Iconify";
import useSettings from "../../hooks/useSettings";




export default function QuestionSolutionComment() {
  const { themeStretch } = useSettings();

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");
  return (
    <Box sx={{ py: 3 }}>
      {/* write comment */}
      <Stack direction="row" alignItems="center">
        <MyAvatar />
        <TextField
          fullWidth
          size="small"
          value={message}
          inputRef={commentInputRef}
          placeholder="Write a comment…"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
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
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
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
              {/* {comment.message} */} A valid, government-issued photo ID,
              such as a driver’s license or a passport.
            </Typography>
          </Paper>
        </Stack>
      </Stack>

      {/* read Comment 2 */}
      <Stack spacing={1.5} sx={{ mt: 3 }}>
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
              {/* {comment.message} */} Nondrivers can get a state ID card at
              the Department of Motor Vehicles office.
            </Typography>
          </Paper>
        </Stack>
      </Stack>

      {/* view more comment */}
      <Stack direction="row" alignItems="center" sx={{ mt: 3, ml: 3 }}>
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
    </Box>
  );
}
