import { capitalCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
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
  _userFollowings
} from "../../_mock/_user";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  MyProfileFollowings,
  ProfileFollowers,
  ProfileGallery
} from "../../sections/user/MyProfile";

import { getMyFollowers, getMyFollowings, getMyBookmarks } from "../../redux/actions/authActions";
import MyBookmarks from "../../sections/user/MyProfile/MyBookmarks";
import { getTimeLinePosts } from "../../redux/actions/userActions";

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
    justifyContent: "center"
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

export default function MyProfile() {
  const { themeStretch } = useSettings();
  // const { user } = useAuth();
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [currentTab, setCurrentTab] = useState("profile");
  const [findFollowers, setFindFollowers] = useState("");
  const [findFollowings, setFindFollowings] = useState("");
  const [findBookmarks, setFindBookmarks] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getTimeLinePosts(auth.me.username));
  }, [auth.me.username]);

  useEffect(() => {
    if (user.profile) {
      setTimelinePosts(user.timelinePosts);
    }
  }, [user.timelinePosts]);

  const handleChangeTab = newValue => {
    if (newValue === "followings") {
      dispatch(getMyFollowings());
    } else if (newValue === "followers") {
      dispatch(getMyFollowers());
    } else if (newValue === "bookmarks") {
      dispatch(getMyBookmarks());
    }
    setCurrentTab(newValue);
  };

  const handleFindFollowings = value => {
    setFindFollowings(value);
  };

  const handleFindFollowers = value => {
    setFindFollowers(value);
  };

  const handleFindBookmarks = value => {
    setFindBookmarks(value);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} profile={auth.me} posts={timelinePosts} />
    },
    {
      value: "followers",
      icon: <Iconify icon={"eva:heart-fill"} width={20} height={20} />,
      component: (
        <ProfileFollowers
          followers={auth.me.expandedFollowers || []}
          findFollowers={findFollowers}
          onFindFollowers={handleFindFollowers}
          profile={auth.me}
        />
      )
    },
    {
      value: "followings",
      icon: <Iconify icon={"eva:people-fill"} width={20} height={20} />,
      component: (
        <MyProfileFollowings
          followings={auth.me.expandedFollowings || []}
          findFollowings={findFollowings}
          onFindFollowings={handleFindFollowings}
          auth={auth}
        />
      )
    },
    {
      value: "bookmarks",
      icon: <Iconify icon={"eva:bookmark-fill"} width={20} height={20} />,
      component: (
        <MyBookmarks
          bookmarks={auth.me.expandedBookmarks || []}
          findBookmarks={findBookmarks}
          onFindBookmarks={handleFindBookmarks}
          auth={auth}
        />
      )
    }
    // {
    //   value: "Questions",
    //   icon: <Iconify icon={"ic:round-perm-media"} width={20} height={20} />,
    //   component: <ProfileGallery gallery={_userGallery} />
    // }
  ];

  return (
    <Page title='User: Profile'>
      <Container maxWidth={themeStretch ? false : "lg"}>
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
            position: "relative"
          }}
        >
          <ProfileCover myProfile={_userAbout} profile={auth.me} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons='auto'
              variant='scrollable'
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map(tab => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map(tab => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
