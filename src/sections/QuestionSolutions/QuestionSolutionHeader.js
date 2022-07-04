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
} from "@mui/material";


import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";

import ReportQuestion from "../../userpages/QuestionsPage/components/ReportQuestion";

import {
  upVoteAnyQuestion,
  downVoteAnyQuestion,
} from "../../redux/actions/questionActions";
import { toggleAnswerLater } from "../../redux/actions/authActions";

// ----------------------------------------------------------------------

export default function QuestionSolutionHeader({ question, auth }) {

  
  return (
    <Card maxWidth="sm">
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link href="#" variant="subtitle2" color="text.primary">
            {question.user.username}
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
