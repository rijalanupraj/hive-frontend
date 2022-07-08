import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Card,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
// utils
import { fToNow } from "../../utils/formatTime";
// _mock_
import { _notifications } from "../../_mock";
// components
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import MenuPopover from "../../components/MenuPopover";
import { IconButtonAnimate } from "../../components/animate";
import {
  getAllNotifications,
  markAllNotificationsAsRead,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../components/Page";
import { Container } from "@mui/system";

// ----------------------------------------------------------------------

export default function ViewNotification() {
  const [notifications, setNotifications] = useState([]);
  const [alignment, setAlignment] = useState("All");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const totalUnRead = notifications.filter(
    (item) => item.opened === false
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getAllNotifications());
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (auth.notifications) {
      setNotifications(auth.notifications);
    }
  }, [auth.notifications]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  return (
    <Page title="Notification">
      <Container maxWidth="full">
        <Grid container spacing={3}>
          {/* Start left */}
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            order={{ xs: 3, md: 1 }}
            sx={{ display: { xs: "none", xl: "block" } }}
            alignSelf={"start"}
            position={"sticky"}
          ></Grid>
          {/* end left */}

          {/* start notification body */}
          <Grid item xs={12} mb={3} lg={6} order={{ xs: 2, md: 1 }}>
            <Card>
              <Box
                sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Notifications</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    You have {totalUnRead} unread messages
                  </Typography>
                </Box>

                {totalUnRead > 0 && (
                  <Tooltip title=" Mark all as read">
                    <IconButtonAnimate
                      color="primary"
                      onClick={handleMarkAllAsRead}
                    >
                      <Iconify
                        icon="eva:done-all-fill"
                        width={20}
                        height={20}
                      />
                    </IconButtonAnimate>
                  </Tooltip>
                )}
              </Box>

              <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
                <ToggleButtonGroup
                  fullWidth
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                >
                  <ToggleButton value="All">All</ToggleButton>
                  <ToggleButton value="Unread">Unread</ToggleButton>
                </ToggleButtonGroup>
                <List>
                  {notifications.slice(0, 2).map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  ))}
                </List>

                <List>
                  {notifications.slice(2, 4).map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  ))}
                </List>
              </Scrollbar>

              <Divider sx={{ borderStyle: "dashed" }} />
            </Card>
          </Grid>
          {/* end notification body */}

          {/* Right */}
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sx={{ mb: 2, display: { xs: "none", xl: "block" } }}
            order={{ xs: 1, md: 1 }}
          ></Grid>
          {/* end right */}
        </Grid>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.opened && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.userFrom.username}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp;{" "}
        {noCase(
          notification.notificationType === "follow"
            ? "started following you"
            : "liked your post"
        )}
      </Typography>
    </Typography>
  );

  return {
    avatar: notification.userFrom.profilePhoto.hasPhoto ? (
      <img
        alt={notification.userFrom.username}
        src={notification.userFrom.profilePhoto.url}
      />
    ) : null,
    title,
  };
}
