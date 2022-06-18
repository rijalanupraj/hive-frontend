import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Card, Typography, CardHeader, Stack, Chip, Divider, Paper } from "@mui/material";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary
}));

// ----------------------------------------------------------------------

ProfileContribution.propTypes = {
  profile: PropTypes.object
};

export default function ProfileContribution({ profile }) {
  const { contribution } = profile;

  return (
    <Card>
      <CardHeader title='Contribution' />
      <Stack direction='row' divider={<Divider orientation='vertical' flexItem />}>
        <Stack width={1} textAlign='center'>
          <Typography variant='h4'>{contribution?.totalQuestionAdded}</Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Question Asked
          </Typography>
        </Stack>

        <Stack width={1} textAlign='center'>
          <Typography variant='h4'>{contribution?.totalSolutionAdded}</Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Solution Provided
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction='row'
        sx={{ mt: 3, mb: 3 }}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Stack width={1} textAlign='center'>
          <Typography variant='h4'>{contribution?.totalQuestionUpvotes}</Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Total Question Upvotes
          </Typography>
        </Stack>

        <Stack width={1} textAlign='center'>
          <Typography variant='h4'>{contribution?.totalQuestiondownVotes}</Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Total Question Downvotes
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction='row'
        sx={{ mt: 3, mb: 3 }}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Stack width={1} textAlign='center'>
          <Typography variant='h4'>{contribution?.totalSolutionUpVotes}</Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Total Solution Upvotes
          </Typography>
        </Stack>

        <Stack width={1} textAlign='center'>
          <Typography variant='h4'>{contribution?.totalSolutiondownVotes}</Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Total Solution Downvotes
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
