import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// @mui
import {
  Box,
  Grid,
  Card,
  Avatar,
  Typography,
  InputAdornment,
  styled,
  Stack,
  Divider,
  Link,
} from "@mui/material";
//utils
import cssStyles from "../../utils/cssStyles";

// components
import Iconify from "../../components/Iconify";
import InputStyle from "../../components/InputStyle";
import SearchNotFound from "../../components/SearchNotFound";
import SvgIconStyle from "../../components/SvgIconStyle";
import Image from "../../components/Image";
import SocialsButton from "../../components/SocialsButton";

// ----------------------------------------------------------------------
const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
}));

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
          <Grid key={user._id} item xs={12} md={4}>
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

function UserCard({ user }) {
  const { name, username } = user;
  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: "auto",
            position: "absolute",
            color: "background.paper",
          }}
        />

        <Avatar
          alt={name}
          src={user?.profilePhoto?.hasPhoto ? user?.profilePhoto.url : ""}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />
        <OverlayStyle />
        <h1>Hell</h1>
        {/* <Image
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="cover"
          ratio="16/9"
        /> */}
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        <Link to={`/profile/${username}`} component={RouterLink}>
          {user.username}
        </Link>
      </Typography>

      <Stack alignItems="center">
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box
        sx={{ py: 3, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Follower
          </Typography>
          <Typography variant="subtitle1">{user.followers.length}</Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            XP Points
          </Typography>
          <Typography variant="subtitle1">{user?.XPpoints}</Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Level
          </Typography>
          <Typography variant="subtitle1">{user?.XPLevel}</Typography>
        </div>
      </Box>
    </Card>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      (user) => user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
