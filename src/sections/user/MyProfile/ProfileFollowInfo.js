import PropTypes from "prop-types";
// @mui
import { Card, Stack, Typography, Divider } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.shape({
    follower: PropTypes.number,
    following: PropTypes.number,
  }),
};

export default function ProfileFollowInfo({ profile }) {
  const { followers, followings } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">
            {followers ? followers.length : "0"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Follower
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">
            {followings ? followings.length : "0"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Following
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
