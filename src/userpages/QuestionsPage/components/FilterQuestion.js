import React, { useState } from "react";

import { Card, ToggleButton, ToggleButtonGroup } from "@mui/material";

import Iconify from "../../../components/Iconify";

const FilterQuestion = ({ currentFilter, handleFilterChange }) => {
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

          <ToggleButton value="unanswered">
            <Iconify
              icon="material-symbols:pending-outline"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Unanswered
          </ToggleButton>
          <ToggleButton value="answered">
            <Iconify
              icon="ri:question-answer-line"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Answered
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
          <ToggleButton value="newest">
            <Iconify
              icon="el:file-new"
              width={20}
              height={20}
              ml={1}
              mr={1}
            />
            Newest
          </ToggleButton>
          <ToggleButton value="oldest">
            <Iconify
              icon="carbon:result-old"
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

export default FilterQuestion;
