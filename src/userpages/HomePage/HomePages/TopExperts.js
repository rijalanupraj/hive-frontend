
// @mui

import {
  Box,
  Stack,
  Card,
  Avatar,
  CardHeader,
  Typography,
  Button,
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

export default function TopExperts() {

  return (
    <Card
      style={{
        border: "1px solid #e0e0e0",
      }}
    >
      <CardHeader title="Top Experts" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {/*  Author */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>1</Typography>
          <Avatar
            alt="name"
            src="https://cdn.anime-planet.com/characters/primary/keyaru-1-190x266.jpg?t=1626012218"
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">Mamba</Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <Iconify
                icon={"eva:heart-fill"}
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
              {/* {fShortenNumber(author.favourite)} */} 13.5k
            </Typography>
          </Box>

          <LoadingButton size="small" type="submit" variant="contained">
            Follow
          </LoadingButton>
        </Stack>
        {/* end author */}
        <Button
          variant="outlined"
          size="large"
          color='inherit'
          style={{
            backgroundColor: "#f5f5f5",
          }}
        >
          View All
        </Button>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
