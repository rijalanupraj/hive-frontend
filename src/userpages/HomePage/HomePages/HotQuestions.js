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
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
// _mock_
import { _analyticPost } from "../../../_mock";
// components
import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";

// ----------------------------------------------------------------------

export default function HotQuestions() {
  return (
    <Card>
      <CardHeader title="Hot Questions" />

      <Stack spacing={2} sx={{ p: 3, pr: 3 }} textAlign='justify'>
        {/*  start first question */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 240 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
              How do I connect a JavaScript front-end to an SQL server through a Java backend?
              </Typography>
            </Link>
          </Box>
        </Stack>
        {/* end first question */}

        {/*  second first question */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 240 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
              How do PHD students feel when their research doesn't have the impact they were expecting?
              </Typography>
            </Link>
          </Box>
        </Stack>
        {/* end second question */}

        {/*  start third question */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 240 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                How to make a license?How to explain to a 6 years old why a
                smart-phone is not good for her?
              </Typography>
            </Link>
          </Box>
        </Stack>
        {/* end third question */}

        {/*  start fourth question */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ minWidth: 240 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                How to make a license?How to explain to a 6 years old why a
                smart-phone is not good for her?
              </Typography>
            </Link>
          </Box>
        </Stack>
        {/* end foutrh question */}
      </Stack>

      <Divider />

      <Box sx={{ p: 1, textAlign: "right" }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
