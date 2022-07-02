import React from "react";
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
  Collapse,
} from "@mui/material";

import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";

const CommentCard = () => {
  return (
    <>
      <Paper>
        {/* write comment */}
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
          <MyAvatar />
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment…"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <Iconify
                      icon={"ic:round-send"}
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
          <input type="file" style={{ display: "none" }} />
        </Stack>

        {/* read Comment 1 */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
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
                {/* {comment.message} */} A valid, government-issued photo ID,
                such as a driver’s license or a passport.
              </Typography>
            </Paper>
          </Stack>
        </Stack>

        {/* read Comment 2 */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
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
        <Stack direction="row" alignItems="center" sx={{ mb: 2, pl: 2 }}>
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
      </Paper>
    </>
  );
};

export default CommentCard;
