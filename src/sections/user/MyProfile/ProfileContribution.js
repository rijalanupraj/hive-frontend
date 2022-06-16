import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Card, Typography, CardHeader, Stack, Chip } from "@mui/material";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileContribution.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileContribution({ profile }) {
  const { Contribution } = profile;

  return (
    <Card>
      <CardHeader title="Contribution" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{Contribution}</Typography>

        <Stack direction="row" spacing={1}>
          <Chip label="6 solution" size="small" />
          <Chip color="info" label="5 questions" size="small" />
        </Stack>
      </Stack>
    </Card>
  );
}
