import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// hooks
import useAuth from "../../../hooks/useAuth";
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from "../../../components/MyAvatar";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const auth = useSelector((state) => state.auth);
  // const { user } = useAuth();

  return (
    <Link underline="none" color="inherit" component={RouterLink} to={"/"}>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: "transparent",
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          {auth.isAuthenticated && (
            <>
              <Typography variant="subtitle2" noWrap>
                {auth?.me?.username}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                sx={{ color: "text.secondary" }}
              >
                {auth?.me?.name}
              </Typography>
            </>
          )}
        </Box>
      </RootStyle>
    </Link>
  );
}
