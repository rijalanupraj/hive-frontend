import PropTypes from "prop-types";
// @mui
import {
  Card,
  CardHeader,
  Typography,
  Stack,
  LinearProgress,
} from "@mui/material";
// utils
import { fPercent, fCurrency } from "../../../utils/formatNumber";
// _mock_
import { _ecommerceSalesOverview } from "../../../_mock";

// ----------------------------------------------------------------------

export default function UserXpLevelview({ profile }) {
  return (
    <Card>
      <CardHeader title={`Level ${profile.XPLevel}`} />
      <Stack spacing={4} sx={{ p: 3 }}>
        <ProgressItem profile={profile} />
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

function ProgressItem({ profile }) {
  let point =
    profile.XPpoints < 100 ? profile.XPpoints : profile.XPpoints / 100;
  console.log(point);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          Progress
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {fPercent(point)}
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={point}
        color="success"
        style={{
          height: 8,
        }}
      />
    </Stack>
  );
}
