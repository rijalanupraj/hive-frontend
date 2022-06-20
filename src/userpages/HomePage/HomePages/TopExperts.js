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
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// _mock_
import { _appAuthors } from "../../../_mock";
// components
import Iconify from "../../../components/Iconify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTopUsers } from "../../../redux/actions/usersActions";
import { useNavigate } from "react-router-dom";
import { followUnfollowAnyUser } from "../../../redux/actions/userActions";
import { style } from "@mui/system";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TopExperts({ auth }) {
  const dispatch = useDispatch();
  const { topUsers, isLoading } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTopUsers());
  }, []);

  const renderTopUsers = () => {
    if (topUsers.length === 0) {
      return <Skeleton variant="text" />;
    }
    return (
      <>
        {topUsers.slice(0, 5).map((user) => {
          return (
            <Stack
              id={user._id}
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Avatar
                alt={user?.username}
                src={user?.profilePhoto?.hasPhoto ? user.profilePhoto.url : ""}
                sx={{ mr: 1 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/profile/" + user.username);
                  }}
                >
                  {user?.username}
                </Typography>
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
                    icon={"simple-icons:fandom"}
                    sx={{ width: 16, height: 16, mr: 0.5 }}
                    color={"orange"}
                  />
                  {fShortenNumber(user?.XPpoints)}
                  <Iconify
                    icon={"icon-park:level"}
                    sx={{ width: 16, height: 16, mr: 0.5, ml: 0.5 }}
                    color={"orange"}
                  />
                  {fShortenNumber(user?.XPLevel)}
                </Typography>
              </Box>
              {auth.isAuthenticated ? (
                <FollowerButton profile={user} />
              ) : (
                <Button
                  size="small"
                  style={{
                    margin: "0.5vh",
                  }}
                  onClick={() =>
                    navigate("/login?redirectTo=/profile/" + user.username)
                  }
                  variant={"contained"}
                  color={"primary"}
                >
                  Follow
                </Button>
              )}
            </Stack>
          );
        })}
      </>
    );
  };

  return (
    <Card>
      <CardHeader title="Top Contributors" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {isLoading ? (
          <>
            <Skeleton variant="rect" animation="wave" height={40} />
            <Skeleton variant="rect" animation="wave" height={40} />
            <Skeleton variant="rect" animation="wave" height={40} />
          </>
        ) : (
          renderTopUsers()
        )}
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

function FollowerButton({ profile }) {
  const [toggle, setToogle] = useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    auth.me.followings.includes(profile._id)
      ? setToogle(true)
      : setToogle(false);
  }, [auth]);

  const handleFollow = () => {
    dispatch(followUnfollowAnyUser(profile._id));
  };

  if (auth.me && auth.me._id === profile._id) {
    return null;
  }

  return (
    <Button
      size="small"
      style={{
        margin: "0.5vh",
      }}
      onClick={() =>
        auth.me
          ? handleFollow()
          : navigate("/login?redirectTo=/profile/" + profile.username)
      }
      variant={toggle ? "text" : "contained"}
      color={toggle ? "primary" : "primary"}
      startIcon={toggle && <Iconify icon={"eva:checkmark-fill"} />}
    >
      {toggle ? "Followed" : "Follow"}
    </Button>
  );
}
