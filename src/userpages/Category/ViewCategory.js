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
import {
  _category,
} from "../../_mock/_user";
// components
import Page from "../../components/Page";
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import
    Category
 from "../../sections/category/Category";

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function ViewCategory() {
  const { themeStretch } = useSettings();
  // const { user } = useAuth();


  const [findCategories, setFindCategories] = useState("");


  const handleFindCategories = (value) => {
    setFindCategories(value);
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
        <Category
          categories={_category}
          findCategories={findCategories}
          onFindCategories={handleFindCategories}
        />
       
      </Container>
    </Page>
  );
}

