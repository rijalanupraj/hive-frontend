import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
  Tooltip,
  Avatar,
} from "@mui/material";

import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";

import ReportQuestion from "../../userpages/QuestionsPage/components/ReportQuestion";

import {
  upVoteAnyQuestion,
  downVoteAnyQuestion,
} from "../../redux/actions/questionActions";
import { toggleAnswerLater } from "../../redux/actions/authActions";
import VerifiedIcon from "@mui/icons-material/Verified";

// ----------------------------------------------------------------------

export default function QuestionSolutionHeader({ question, auth }) {
  return (
    <Card maxWidth="sm">
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            alt={question?.user?.username}
            src={question?.user?.profilePhoto.url}
          />
        }
        title={
          <Link href="#" variant="subtitle2" color="text.primary">
            {question.user.username}
            {question.user.isVerified && (
              <Typography display="inline">
                <VerifiedIcon
                  sx={{
                    ml: 0.5,
                    fontSize: "small",
                    color: "#3B8AF0",
                    verticalAlign: "baseline",
                  }}
                />
              </Typography>
            )}
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
      />

      <Stack spacing={0.5} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant="h6" align="justify">
          {question.title}
        </Typography>

        <Typography variant="body1" align="justify">
          {question.description}
        </Typography>

        {/* image */}
      </Stack>
    </Card>
  );
}
