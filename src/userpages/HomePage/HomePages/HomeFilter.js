import React, { useState } from "react";

import { Card, ToggleButton, ToggleButtonGroup } from "@mui/material";

import Iconify from "../../../components/Iconify";

const HomeFilter = ({ currentFilter, handleFilterChange, auth }) => {
  return (
    <>
      <Card
        variant="outlined"
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          paddingLeft: "1.2rem",
          paddingRight: "1.2rem",
          marginTop: "1rem",
        }}
      >
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={currentFilter}
          exclusive
          onChange={handleFilterChange}
          border="none"

        >

          <ToggleButton value="best" id="bestTest">
            <Iconify
              icon="icon-park-twotone:good-two"
              width={20}
              height={20}
              sx={{ mr:1}}
               
            />
            Best
          </ToggleButton>
          <ToggleButton value="recent" id="recentTest">
            <Iconify
              icon="carbon:recently-viewed"
              width={20}
              height={20}
              sx={{ mr:1}}
            />
            Recent
          </ToggleButton>
          
          <ToggleButton value="oldest" id="oldestTest">
            <Iconify
              icon="carbon:result-old"
              width={20}
              height={20}
              sx={{ mr:1}}
            />
            oldest
          </ToggleButton>
        </ToggleButtonGroup>
      </Card>
    </>
  );
};

export default HomeFilter;
