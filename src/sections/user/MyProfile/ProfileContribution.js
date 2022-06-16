import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Card,
  Typography,
  CardHeader,
  Stack,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
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

      <Stack spacing={3} direction="row" sx={{ p: 3 }}>
        <Item>
          <Typography variant="body2">{Contribution}</Typography>
          <Typography variant="h4">
            {/* {followers ? followers.length : "0"} 0 */}0
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Questions Asked
          </Typography>
        </Item>
        <Divider orientation="vertical" variant="middle" flexItem />

        <Item>
          <Typography variant="body2">{Contribution}</Typography>
          <Typography variant="h4">
            {/* {followers ? followers.length : "0"} 0 */}0
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Solution Provided
          </Typography>
        </Item>
      </Stack>
    </Card>
  );
}
