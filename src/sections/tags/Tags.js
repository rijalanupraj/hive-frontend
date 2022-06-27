import React from "react";
import PropTypes from "prop-types";

import { capitalCase } from "change-case";

// @mui
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";

// components
import Iconify from "../../components/Iconify";
import InputStyle from "../../components/InputStyle";
import SearchNotFound from "../../components/SearchNotFound";

// ----------------------------------------------------------------------

Tags.propTypes = {
  tags: PropTypes.array,
  findTags: PropTypes.string,
  onFindTags: PropTypes.func,
};

export default function Tags({ tags, findTags, onFindTags }) {
  const tagFiltered = applyFilter(tags, findTags);

  const isNotFound = tagFiltered.length === 0;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Tags
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findTags}
        onChange={(event) => onFindTags(event.target.value)}
        placeholder="Find Tags..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {tagFiltered.map((tag) => (
          <Grid key={tag._id} item xs={12} md={4}>
            <TagCard tag={tag} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findTags} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------
TagCard.propTypes = {
  tag: PropTypes.object,
};

function TagCard({ tag }) {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {capitalCase(tag)}
        </Typography>
      </Box>
      <Button size="small" variant={"outlined"} color={"primary"}>
        Explore
      </Button>
    </Card>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      (tag) => tag.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
