import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Avatar,
  SpeedDial,
  Typography,
  SpeedDialAction,
} from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// utils
import { fDate } from "../../utils/formatTime";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import { useSelector } from "react-redux";
import moment from "moment";

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: "Facebook",
    icon: (
      <Iconify
        icon="eva:facebook-fill"
        width={20}
        height={20}
        color="#1877F2"
      />
    ),
  },
  {
    name: "Instagram",
    icon: (
      <Iconify
        icon="ant-design:instagram-filled"
        width={20}
        height={20}
        color="#D7336D"
      />
    ),
  },
  {
    name: "Linkedin",
    icon: (
      <Iconify
        icon="eva:linkedin-fill"
        width={20}
        height={20}
        color="#006097"
      />
    ),
  },
  {
    name: "Twitter",
    icon: (
      <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />
    ),
  },
];

const OverlayStyle = styled("h1")(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
}));

const TitleStyle = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  top: 0,
  zIndex: 10,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(5),
  },
}));

const TitleStyle1 = styled("h1")(({ theme }) => ({
  ...theme.typography.body2,
  top: 60,
  zIndex: 10,
  width: "100%",
  alignContent: "justify",
  position: "absolute",
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(5),
  },
}));

const FooterStyle = styled("div")(({ theme }) => ({
  bottom: -5,
  zIndex: 10,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "flex-end",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    alignItems: "center",
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

export default function QuestionSolutionHeader({ que }) {
  const isDesktop = useResponsive("up", "sm");

  return (
    <Box
      sx={{ position: "relative" }}
      style={{
        height: isDesktop ? "40vh" : "40vh",
        backgroundColor: "#1A2027",
      }}
    >
      <TitleStyle>{que?.title} </TitleStyle>

      <TitleStyle1 sx={{ mt: 3 }}>{que?.description}</TitleStyle1>

      <FooterStyle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="profile" src={que?.user?.profilePhoto?.url} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: "common.white" }}>
              Questioned By:
            </Typography>
            <Typography variant="button" sx={{ color: "common.white" }}>
              {que?.user?.username}
            </Typography>
            <Typography variant="caption" sx={{ ml: 1, color: "grey.500" }}>
              {moment(que?.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

        <SpeedDial
          direction={isDesktop ? "left" : "up"}
          ariaLabel="Share post"
          icon={
            <Iconify icon="eva:share-fill" sx={{ width: 15, height: 15 }} />
          }
          sx={{ "& .MuiSpeedDial-fab": { width: 37, height: 37 } }}
        >
          <SpeedDialAction
            key="facebook"
            icon={
              <Iconify
                icon="eva:facebook-fill"
                width={20}
                height={20}
                color="#1877F2"
              />
            }
            tooltipTitle="Facebook"
            tooltipPlacement="top"
            FabProps={{ color: "default" }}
          />
          <SpeedDialAction
            key="linkedin"
            icon={
              <Iconify
                icon="eva:linkedin-fill"
                width={20}
                height={20}
                color="#1877F2"
              />
            }
            tooltipTitle="Linkedin"
            tooltipPlacement="top"
            FabProps={{ color: "default" }}
          />
          <SpeedDialAction
            key="twitter"
            icon={
              <Iconify
                icon="eva:twitter-fill"
                width={20}
                height={20}
                color="#1877F2"
              />
            }
            tooltipTitle="Twitter"
            tooltipPlacement="top"
            FabProps={{ color: "default" }}
          />
        </SpeedDial>
      </FooterStyle>

      <OverlayStyle />
    </Box>
  );
}
