// @mui

import {
  Box,
  Stack,
  Card,
  Avatar,
  CardHeader,
  Typography,
  Button,
  Divider,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// _mock_
import { _appAuthors } from "../../../_mock";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        {/*  Author */}
        <Stack direction="row" alignItems="center" spacing={3}>
          {/* footer values */}

          {/* about and privacy */}
          <Box sx={{ flexGrow: 1 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ▪ About
              </Typography>
            </Link>

            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ▪ Content Policy
              </Typography>
            </Link>
          </Box>
          {/* end about and privacy */}

          <Box sx={{ flexGrow: 1 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ▪ Career
              </Typography>
            </Link>

            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ▪ Pricacy Policy
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ▪ Terms
              </Typography>
            </Link>

            <Link href="#" color="inherit">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ▪ Press
              </Typography>
            </Link>
          </Box>
        </Stack>
        {/* end author */}
      </Stack>

      <Divider />
      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
           Samadhan © 2022. All rights reserved
        </Typography>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
