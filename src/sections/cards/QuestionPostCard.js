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
import { useNavigate } from "react-router-dom";
// utils
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from "../../utils/formatNumber";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import SvgIconStyle from "../../components/SvgIconStyle";
import ReportQuestion from "../../userpages/QuestionsPage/components/ReportQuestion";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  chat: getIcon("ic_chat"),
};
const Item = styled(Paper)(({ theme }) => ({
  margin: "auto",
  transition: "0.3s",
  textAlign: "center",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
}));

export default function QuestionPostCard({ question }) {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        border: "2px solid #e0e0e0",
        marginTop: "1rem",
      }}
    >
      <CardHeader
        disableTypography
        avatar={
          question?.user?.profilePhoto?.hasPhoto ? (
            <Avatar
              src={question?.user.profilePhoto.url}
              alt={question?.user?.username}
            />
          ) : (
            <MyAvatar />
          )
        }
        title={
          <Link
            to={"/profile/" + question?.user?.username}
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {question?.user?.username}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(question?.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={0.5} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant="h6" align="justify">
          {question?.title}
        </Typography>

        <Typography variant="caption" align="justify">
          {question?.answers?.length}
        </Typography>

        {/* image */}

        <Stack direction="row" alignItems="center">
          {/* write  */}
          <FormControlLabel
            control={
              <Link href={"/post-solution/" + question._id}>
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
            <Iconify
              icon={"ant-design:share-alt-outlined"}
              width={20}
              height={20}
            />
          </IconButton>
          
          <IconButton>
            <ReportQuestion />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
