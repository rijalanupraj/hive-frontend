import { capitalCase } from "change-case";
import React, { useState } from "react";

// @mui
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import TicketInformation from "./components/TicketInformation";
// sections

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export default function OpenTicket() {
  const [currentTab, setCurrentTab] = useState("Ticket");

  const ACCOUNT_TABS = [
    {
      value: "Ticket",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <TicketInformation />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <RootStyle>
        <Container>
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
