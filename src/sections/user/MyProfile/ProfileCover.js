import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// utils
import cssStyles from "../../../utils/cssStyles";
// hooks
// import useAuth from "../../../hooks/useAuth";
// components
import MyAvatar from "../../../components/MyAvatar";
import Image from "../../../components/Image";
import VerifiedIcon from "@mui/icons-material/Verified";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    ...cssStyles().bgBlur({ blur: 2 }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
};

export default function ProfileCover({ myProfile, profile }) {
  // const { user } = useAuth();

  const { position, cover } = myProfile;

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
          profile={profile}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",

            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* <Typography variant="h4">{user?.displayName}</Typography> */}
          <Typography variant="h4" display="inline">
            {" "}
            {profile.name}
          </Typography>

          {profile.isVerified && (
            <Typography display="inline">
              <VerifiedIcon sx={{ ml: 0.5, color: "#3B8AF0" }} />
            </Typography>
          )}

          <Typography sx={{ opacity: 0.72 }}>{profile.username}</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src="https://image.shutterstock.com/image-photo/abstract-concrete-texture-wall-blue-260nw-1124819579.jpg"
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}
