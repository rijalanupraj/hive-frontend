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
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
// _mock_
import { _notifications } from "../../../_mock";
// components
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import MenuPopover from "../../../components/MenuPopover";
import { IconButtonAnimate } from "../../../components/animate";
import {
  getAllNotifications,
  markAllNotificationsAsRead,
} from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const totalUnRead = notifications.filter(
    (item) => item.opened === false
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
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
    <>
      <IconButtonAnimate
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={25} height={25} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButtonAnimate color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 4).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            <a href="/allnotification" style={{color:"#3971f1"}}>View All</a>
          </Button>
        </Box>
      </MenuPopover>
    </>
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

  // if (notification.type === "order_placed") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // if (notification.type === "order_shipped") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // if (notification.type === "mail") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // if (notification.type === "chat_message") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
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
