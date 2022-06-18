import { capitalCase } from "change-case";
import React, { useState } from "react";

// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  AccountGeneral,
  AccountChangePassword,
  AccountIntrestedCategory,
} from "./components";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    marginTop: "8vh",
  },
}));

export default function UpdateUserProfile() {
  const [currentTab, setCurrentTab] = useState("general");

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: "change_password",
      icon: <Iconify icon={"ic:round-vpn-key"} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
    {
      value: "Favorite categories",
      icon: <Iconify icon={"dashicons:category"} width={20} height={20} />,
      component: <AccountIntrestedCategory />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <RootStyle>
        <Container>
          <HeaderBreadcrumbs
            heading="Account"
            links={[
              { name: "Dashboard", href: "" },
              { name: "User", href: "" },
              { name: "Account Settings" },
            ]}
          />

          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
        /
      </RootStyle>
    </Page>
  );
}
