import * as React from "react";
import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Card,
  Typography,
  CardHeader,
  Stack,
  Button,
} from "@mui/material";
// components
import Iconify from "../../../components/Iconify";
import ReportUser from "./ProfileReport";
import { useSelector } from "react-redux";
import RequestVerification from "./RequestVerification";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { bio } = profile;
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{bio}</Typography>

        <Stack direction="row">
          <IconStyle icon={"material-symbols:supervised-user-circle"} />
          <Typography variant="body2">
            &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile.name}
            </Link>
          </Typography>
        </Stack>

        {auth.isAuthenticated && auth.me._id !== profile._id && (
          <Stack direction="row">
            <Link component="span" variant="subtitle2" color="text.primary">
              <ReportUser profile={profile} auth={auth} />
            </Link>
          </Stack>
        )}

        {auth.isAuthenticated && auth.me._id === profile?._id && (
          <Stack direction="row">
            <Link component="span" variant="subtitle2" color="text.primary">
              <RequestVerification />
            </Link>
          </Stack>
        )}

        {/* <Stack direction='row'>
          <IconStyle icon={"eva:email-fill"} />
          <Typography variant='body2'>{""}</Typography>
        </Stack>

        <Stack direction='row'>
          <IconStyle icon={"ic:round-business-center"} />
          <Typography variant='body2'>
            {""} at &nbsp;
            <Link component='span' variant='subtitle2' color='text.primary'>
              {""}
            </Link>
          </Typography>
        </Stack>

        <Stack direction='row'>
          <IconStyle icon={"ic:round-business-center"} />
          <Typography variant='body2'>
            Studied at &nbsp;
            <Link component='span' variant='subtitle2' color='text.primary'>
              {""}
            </Link>
          </Typography>
        </Stack> */}
      </Stack>
    </Card>
  );
}
