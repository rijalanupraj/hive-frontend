import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
// @mui
import {
  Card,
  CardHeader,
  Typography,
  Stack,
  LinearProgress,
  Grid,
} from "@mui/material";
import Iconify from "../../../components/Iconify";
import Avatar from "../../../components/Avatar";

// utils
import { fPercent, fCurrency } from "../../../utils/formatNumber";
// _mock_
import { _ecommerceSalesOverview } from "../../../_mock";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

export default function UserBadges({ profile }) {
  return (
    <Card>
      <CardHeader title="Achievement" />

      <Grid>
      <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 3, mt: 2 }}>
        <Avatar
          alt="Remy Sharp"
          src="https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/master//images/galaxy-brain-default.png"
          sx={{ width: 100, height: 100 }}
        />
        <Avatar
          alt="Remy Sharp"
          src="https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/master//images/pull-shark-default.png"
          sx={{ width: 100, height: 100 }}
        />

        <Avatar
          alt="Remy Sharp"
          src="https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/master//images/pull-shark-default.png"
          sx={{ width: 100, height: 100 }}
        />

      </Stack>
      </Grid>

      
    </Card>
  );
}

// ----------------------------------------------------------------------
