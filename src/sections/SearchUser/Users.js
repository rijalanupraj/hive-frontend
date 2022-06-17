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
import Iconify from "../../components/Iconify";
import InputStyle from "../../components/InputStyle";
import SearchNotFound from "../../components/SearchNotFound";

// ----------------------------------------------------------------------

UserSearch.propTypes = {
  Users: PropTypes.array,
  findUsers: PropTypes.string,
  onFindUsers: PropTypes.func,
};

export default function UserSearch({ Users, findUsers, onFindUsers }) {
  const userFiltered = applyFilter(Users, findUsers);

  const isNotFound = userFiltered.length === 0;
  return (
    <Box sx={{ mt: -7 }}>
      <Typography variant="h4" sx={{ mb: 3, justify: "centre" }}>
        Users
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findUsers}
        onChange={(event) => onFindUsers(event.target.value)}
        placeholder="Find Users.."
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
        {userFiltered.map((user) => (
          <Grid key={user.id} item xs={12} md={4}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findUsers} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------
UserCard.propTypes = {
  user: PropTypes.object,
};

function UserCard() {
  // const { name, country, avatarUrl, isFollowed } = category;

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar
        alt="government"
        src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
        sx={{ width: 48, height: 48 }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          Samir Thapaliya
        </Typography>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          <Iconify
            icon={"akar-icons:circle-plus"}
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            noWrap
          ></Typography>
        </Box> */}
      </Box>
      <Button size="small" variant={"outlined"} color={"primary"}>
        Follow
      </Button>
    </Card>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      (friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
