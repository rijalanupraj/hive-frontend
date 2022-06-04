import { capitalCase } from "change-case";
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container, Button } from "@mui/material";
// routes
// import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
// import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userAbout, _userFeeds, _userGallery, _userFollowings } from "../../_mock/_user";
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
  ProfileFollowers
} from "../../sections/user/MyProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, viewFollowers, followUnfollowUser } from "../../redux/actions/userActions";
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

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [currentTab, setCurrentTab] = useState("profile");
  const [findFollowers, setFindFollowers] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile(username, navigate));
  }, []);

  const handleChangeTab = newValue => {
    if (newValue === "followers") {
      dispatch(viewFollowers(user.profile._id));
    }
    setCurrentTab(newValue);
  };

  const handleFindFollowers = value => {
    setFindFollowers(value);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} profile={user.profile} />
    },
    {
      value: "followers",
      icon: <Iconify icon={"eva:heart-fill"} width={20} height={20} />,
      component: (
        <ProfileFollowers
          followers={user.followers}
          findFollowers={findFollowers}
          onFindFollowers={handleFindFollowers}
        />
      )
    }
  ];

  return (
    <Page title='User: Profile'>
      <Container
        maxWidth={themeStretch ? false : "lg"}
        style={{
          marginTop: "13vh"
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
            position: "relative"
          }}
        >
          <ProfileCover myProfile={_userAbout} profile={user.profile} />

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
              <FollowerButton profile={user.profile} />
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

function FollowerButton({ profile }) {
  const [toggle, setToogle] = useState();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  console.log(profile.followers);

  useEffect(() => {
    if (auth.me && profile.followers) {
      if (profile.followers.includes(auth.me._id)) {
        setToogle(true);
      } else {
        setToogle(false);
      }
    }
  }, [auth, profile]);

  const handleFollow = () => {
    dispatch(followUnfollowUser(profile._id));
  };

  if (auth.me && auth.me._id === profile._id) {
    return null;
  }

  return (
    <Button
      size='small'
      style={{
        margin: "0.5vh"
      }}
      onClick={() =>
        auth.me ? handleFollow() : navigate("/login?redirectTo=/profile/" + profile.username)
      }
      variant={toggle ? "text" : "contained"}
      color={toggle ? "primary" : "primary"}
      startIcon={toggle && <Iconify icon={"eva:checkmark-fill"} />}
    >
      {toggle ? "Followed" : "Follow"}
    </Button>
  );
}
