import React from "react";
import PropTypes from "prop-types";

import { capitalCase } from "change-case";

// @mui
import { Grid, Stack, Chip } from "@mui/material";

// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

ChipTags.propTypes = {
  tags: PropTypes.array,
  findTags: PropTypes.string,
  onFindTags: PropTypes.func,
};

export default function ChipTags({ tags, findTags, onFindTags }) {
  const tagFiltered = applyFilter(tags, findTags);

  const isNotFound = tagFiltered.length === 0;

  return (
    <Grid container spacing={3}>
      {tagFiltered.map((tag) => (
        <Grid key={tag._id} item>
          <TagCard tag={tag} />
        </Grid>
      ))}
    </Grid>
  );
}

// ----------------------------------------------------------------------
TagCard.propTypes = {
  tag: PropTypes.object,
};

function TagCard({ tag }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={tag}
        avatar={<Iconify icon={"ic:tag"} width={24} height={24} />}
        variant="outline"
        size="small"
        clickable
        // sx={{width:'10%'}}
      >
        {capitalCase(tag)}
      </Chip>
    </Stack>
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
