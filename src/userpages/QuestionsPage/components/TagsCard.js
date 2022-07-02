import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Chip,
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
// _mock_
import { _analyticPost } from "../../../_mock";
// components
import Iconify from "../../../components/Iconify";
import { useState } from "react";
import Tags from "../../../sections/tags/Tags";

// ----------------------------------------------------------------------

export default function TagCard() {
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader title="Tags" />

      <Stack spacing={2} sx={{ p: 3, pr: 3 }} textAlign="justify">
        {/*  start first question */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 240 }}>
            <Link href="#" color="inherit"></Link>
            <Tags />
          </Box>
        </Stack>
        {/* end first question */}
      </Stack>

      <Divider />

      <Box sx={{ p: 1, textAlign: "right" }}>
        <Button
          to="#"
          size="small"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
