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
    <Card>
      <CardHeader title="Top Experts" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {/*  Author */}
        <Stack direction="row" alignItems="center" spacing={2}>
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
                icon={"bx:upvote"}
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

        {/* testing  2, 3 user remove it */}

        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt="name"
            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">Tashi</Typography>
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
                icon={"bx:upvote"}
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
              {/* {fShortenNumber(author.favourite)} */} 12k
            </Typography>
          </Box>

          <LoadingButton size="small" type="submit" variant="contained">
            Follow
          </LoadingButton>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt="name"
            src="https://w7.pngwing.com/pngs/912/392/png-transparent-jerry-mouse-tom-cat-tom-and-jerry-poster-tom-and-jerry-mammal-heroes-cat-like-mammal.png"
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">Tommy Tom</Typography>
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
                icon={"bx:upvote"}
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
              {/* {fShortenNumber(author.favourite)} */} 10.5k
            </Typography>
          </Box>

          <LoadingButton size="small" type="submit" variant="contained">
            Follow
          </LoadingButton>
        </Stack>

        {/* end testing user */}

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
