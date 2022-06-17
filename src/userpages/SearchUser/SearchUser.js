import { capitalCase } from "change-case";
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container } from "@mui/material";
// routes
// import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
// import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userCards } from "../../_mock/_user";
// components
import Page from "../../components/Page";
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Category from "../../sections/category/Category";
import UserSearch from "../../sections/SearchUser/Users";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SearchUser() {
  const { themeStretch } = useSettings();
  // const { user } = useAuth();

  const [findUsers, setFindUsers] = useState("");

  const handleFindUsers = (value) => {
    setFindUsers(value);
  };

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
        <UserSearch
          Users={_userCards}
          findUsers={findUsers}
          onFindUsers={handleFindUsers}
        />
      </Container>
    </Page>
  );
}
