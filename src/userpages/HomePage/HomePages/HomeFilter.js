import React, { useState } from "react";

import { Card, ToggleButton, ToggleButtonGroup } from "@mui/material";

import Iconify from "../../../components/Iconify";

const HomeFilter = ({ currentFilter, handleFilterChange }) => {
  return (
    <>
      <Card
        variant="outlined"
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          paddingLeft: "1.2rem",
          marginTop: "1rem",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={currentFilter}
          exclusive
          onChange={handleFilterChange}
          border="none"
        >
          <ToggleButton value="preference">
            <Iconify
              icon="gis:poi-favorite-o"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Preference
          </ToggleButton>

          <ToggleButton value="best">
            <Iconify
              icon="icon-park-twotone:good-two"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Best
          </ToggleButton>
          <ToggleButton value="recent">
            <Iconify
              icon="carbon:recently-viewed"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Recent
          </ToggleButton>
          <ToggleButton value="hot">
            <Iconify
              icon="ant-design:fire-twotone"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Hot
          </ToggleButton>
          <ToggleButton value="oldest">
            <Iconify
              icon="emojione:old-man"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Oldest
          </ToggleButton>
        </ToggleButtonGroup>
      </Card>
    </>
  );
};

export default HomeFilter;