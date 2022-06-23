import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
} from "@mui/material";
// routes
// import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import MyAvatar from "../../../components/MyAvatar";
import MenuPopover from "../../../components/MenuPopover";
import { IconButtonAnimate } from "../../../components/animate";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../redux/actions/authActions";
import Theme from '../../../components/settings/SettingMode'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Settings",
    linkTo: "/update-profile",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      // navigate("/", { replace: true });
      dispatch(logOutUser());

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {auth.isAuthenticated ? (
          <Avatar
            alt={auth.me.username}
            src={
              auth?.me?.profilePhoto?.hasPhoto ? auth?.me?.profilePhoto.url : ""
            }
          />
        ) : (
          <MyAvatar />
        )}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        {auth.isAuthenticated && (
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {auth.me.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {auth.me.username}
            </Typography>
          </Box>
        )}

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Theme />

        <Divider sx={{ borderStyle: "dashed" }} />

        {auth.isAuthenticated ? (
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              navigate(`/login`, { replace: true });
            }}
            sx={{ m: 1 }}
          >
            Login
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
}
