
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

// _mock_
import { _analyticPost } from "../../_mock";
// components

import Iconify from "../../components/Iconify";


// ----------------------------------------------------------------------

export default function RelatedQuestionsCard() {
  return (
    <Card>
      <CardHeader title="Question You May Like" />

      <Stack spacing={2} sx={{ p: 3, pr: 3 }} textAlign="justify">
        {/*  start first question */}
        <Stack direction="row" alignItems="center" spacing={1} >
          <Box sx={{ minWidth: 240 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
               I hard a new passport has lunched. Is there any changes in the process of obtaining a passport?
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
                How do students feel when their research doesn't have the impact they were expecting?
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
                How can i get a license within the next 3 months? Is there any alternative procedure to get a license?
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
                How can i get a license within the next 3 months? Is there any alternative procedure to get a license?
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
          Ask Question
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
