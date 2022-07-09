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

      <Grid container spacing={3}>
        {profile?.badges?.length < 1 && (
          <Grid item xs={12}>
            <Typography variant="h7" sx={{p:3, mb:3, mt:3}}>No badges yet.</Typography>
          </Grid>
        )}
        {profile?.badges?.map((badge) => {
          return (
            <Grid item xs={12} md={6}>
              <Avatar
                alt="badge?.title"
                src={badge?.image?.url}
                sx={{ width: 75, height: 75 }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
}

// ----------------------------------------------------------------------
