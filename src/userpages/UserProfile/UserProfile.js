import { capitalCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container, Button } from "@mui/material";
// routes
// import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
// import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// _mock_
import {
  _userAbout,
  _userFeeds,
  _userGallery,
  _userFollowers,
  _userFollowings,
} from "../../_mock/_user";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFollowings,
  ProfileGallery,
  ProfileFollowers,
} from "../../sections/user/MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../redux/actions/usersActions";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  justifyContent: "center",

  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const dispatch = useDispatch();
  const follow = useSelector((state) => state.follow);
  const auth = useSelector((state) => state.auth);

  const { themeStretch } = useSettings();
  // const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState("profile");

  const [findFollowers, setFindFollowers] = useState("");

  const [findFollowings, setFindFollowings] = useState("");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindFollowings = (value) => {
    setFindFollowings(value);
  };

  const handleFindFollowers = (value) => {
    setFindFollowers(value);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container
        maxWidth={themeStretch ? false : "lg"}
        style={{
          marginTop: "13vh",
        }}
      >
        {/* <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: '/' },
            { name: "User", href: '/' },
            { name: 'YourName', href: '/' },
          ]}
        /> */}
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover myProfile={_userAbout} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
              <FollowerButton />
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

function FollowerButton() {
  const [toggle, setToogle] = useState();
  const dispatch = useDispatch();

  return (
    <Button
      size="small"
      style={{
        margin: "0.5vh",
      }}
      onClick={() => dispatch(followUser("628cbcb3602badafbc3a4f7a"))}
      // onClick={console.log("clicked")}
      variant={toggle ? "text" : "contained"}
      color={toggle ? "primary" : "primary"}
      startIcon={toggle && <Iconify icon={"eva:checkmark-fill"} />}
    >
      {toggle ? "Followed" : "Follow"}
    </Button>
  );
}
