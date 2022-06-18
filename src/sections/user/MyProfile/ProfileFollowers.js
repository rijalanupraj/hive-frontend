import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { Box, Grid, Card, Button, Avatar, Typography, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import Iconify from "../../../components/Iconify";
import InputStyle from "../../../components/InputStyle";
import SearchNotFound from "../../../components/SearchNotFound";
import { useEffect } from "react";
import { viewMyFollowings } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { followUnfollowAnyUser, viewFollowers } from "../../../redux/actions/userActions";

// ----------------------------------------------------------------------

export default function ProfileFollowers({ followers, findFollowers, onFindFollowers, profile }) {
  const followerFiltered = applyFilter(followers, findFollowers);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.me) {
      dispatch(viewMyFollowings(auth.me._id));
    }
  }, []);

  useEffect(() => {
    if (profile) {
      dispatch(viewFollowers(profile._id));
    }
  }, [profile.username]);

  const isNotFound = followerFiltered.length === 0;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Followers
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findFollowers}
        onChange={event => onFindFollowers(event.target.value)}
        placeholder='Find Followers...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          )
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {followerFiltered.map(follower => (
          <Grid key={follower._id} item xs={12} md={4}>
            <FollowerCard
              follower={follower}
              auth={auth}
              navigate={navigate}
              profile={profile}
              dispatch={dispatch}
            />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFollowers} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function FollowerCard({ follower, auth, navigate, profile, dispatch }) {
  const { name, username } = follower;
  const { isAuthenticated, me } = auth;
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (isAuthenticated && me) {
      if (me.followings.includes(follower._id)) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }
  }, [me]);

  const handleFollowButtonClick = () => {
    if (isAuthenticated) {
      dispatch(followUnfollowAnyUser(follower._id));
    }
  };

  const handleUsernameClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar alt={name} src={""} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant='subtitle2' noWrap onClick={handleUsernameClick}>
          {username}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Iconify
            icon={"bxs:user-circle"}
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant='body2' sx={{ color: "text.secondary" }} noWrap>
            {name}
          </Typography>
        </Box>
      </Box>
      {isAuthenticated && me && me._id !== follower._id && (
        <Button
          size='small'
          onClick={() =>
            isAuthenticated
              ? handleFollowButtonClick()
              : navigate("/login?redirectTo=/profile/" + profile.username)
          }
          variant={followed ? "text" : "outlined"}
          color={followed ? "primary" : "inherit"}
          startIcon={followed && <Iconify icon={"eva:checkmark-fill"} />}
        >
          {followed ? "Followed" : "Follow"}
        </Button>
      )}
    </Card>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(friend => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return array;
}
