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
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

export default function QuestionPostCard() {
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
            {/* {fDate(post.createdAt)} */} 11 June 2020
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

      <Stack spacing={0.5} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant="h6" align="justify">
          How to make a passport?
        </Typography>

        <Typography variant="caption" align="justify">
          5 Answers
        </Typography>

        {/* image */}

        <Stack direction="row" alignItems="center">
          {/* write  */}
          <FormControlLabel
            control={
              <Link href="/">
                <IconButton>
                  <Iconify icon={"jam:write-f"} width={20} height={20} />
                </IconButton>
              </Link>
            }
            label="answer"
            sx={{ minWidth: 72, mr: 2 }}
          />
          {/* upvote */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                icon={<Iconify icon={"bx:upvote"} />}
                checkedIcon={<Iconify icon={"bx:upvote"} />}
              />
            }
            label="3"
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

          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
          </IconButton>

          <IconButton>
            <Iconify icon={"ant-design:share-alt-outlined"} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify
              icon={"ic:outline-report-problem"}
              width={20}
              height={20}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
