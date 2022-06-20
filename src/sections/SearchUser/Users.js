import PropTypes from "prop-types";
import { useState } from "react";

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

// function UserCard() {
//   // const { name, country, avatarUrl, isFollowed } = category;

//   return (
//     <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
//       <Avatar
//         alt="government"
//         src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
//         sx={{ width: 48, height: 48 }}
//       />
//       <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
//         <Typography variant="subtitle2" noWrap>
//           Samir Thapaliya
//         </Typography>
//         {/* <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Iconify
//             icon={"akar-icons:circle-plus"}
//             sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
//           />
//           <Typography
//             variant="body2"
//             sx={{ color: "text.secondary" }}
//             noWrap
//           ></Typography>
//         </Box> */}
//       </Box>
//       <Button size="small" variant={"outlined"} color={"primary"}>
//         Follow
//       </Button>
//     </Card>
//   );
// }

function UserCard({ user }) {
  const { name, country, avatarUrl, isFollowed } = user;
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
          src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
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
        <Image
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="cover"
          ratio="16/9"
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {/* <Link href={PATH_DASHBOARD.user.root}>{name}</Link> */}Samir
        Thapaliya
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
          <Typography variant="subtitle1">
            {/* {fShortenNumber(follower)} */}0
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Following
          </Typography>
          <Typography variant="subtitle1">
            {/* {fShortenNumber(following)} */}2
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Total Solutions
          </Typography>
          <Typography variant="subtitle1">100</Typography>
        </div>
      </Box>
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
