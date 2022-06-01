import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Typography,
  InputAdornment,
} from "@mui/material";
// components
import Iconify from "../../../components/Iconify";
import InputStyle from "../../../components/InputStyle";
import SearchNotFound from "../../../components/SearchNotFound";

// ----------------------------------------------------------------------

ProfileFollowings.propTypes = {
  followings: PropTypes.array,
  findFollowings: PropTypes.string,
  onFindFollowings: PropTypes.func,
};

export default function ProfileFollowings({
  followings,
  findFollowings,
  onFindFollowings,
}) {
  const followingFiltered = applyFilter(followings, findFollowings);

  const isNotFound = followingFiltered.length === 0;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Followers
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findFollowings}
        onChange={(event) => onFindFollowings(event.target.value)}
        placeholder="Find Followers..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {followingFiltered.map((following) => (
          <Grid key={following.id} item xs={12} md={4}>
            <FollowingCard following={following} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFollowings} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowingCard.propTypes = {
  following: PropTypes.object,
};

function FollowingCard({ following }) {
  const { name, country, avatarUrl, isFollowing } = following;

  const [toggle, setToogle] = useState(isFollowing);
  if(isFollowing) {
    return (
    
      <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
       
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
          <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Iconify
                icon={"eva:pin-fill"}
                sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                {country}
              </Typography>
            </Box>
          </Box>
        
        
        <Button
          size="small"
          onClick={() => setToogle(!toggle)}
          variant={toggle ? "text" : "outlined"}
          color={toggle ? "primary" : "inherit"}
          startIcon={toggle && <Iconify icon={"eva:checkmark-fill"} />}
        >
          {toggle ? "Followed" : "Follow"}
        </Button>
      </Card>
    );
  }

  
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      (following) => following.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
