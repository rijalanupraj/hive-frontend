import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { Box, Grid, Card, Button, Avatar, Typography, InputAdornment } from "@mui/material";
// components
import Iconify from "../../../components/Iconify";
import InputStyle from "../../../components/InputStyle";
import SearchNotFound from "../../../components/SearchNotFound";
import SolutionPostCard from "../../../sections/cards/SolutionPostCard";

// ----------------------------------------------------------------------

MyBookmarks.propTypes = {
  bookmarks: PropTypes.array,
  findBookmarks: PropTypes.string,
  onFindBookmarks: PropTypes.func
};

export default function MyBookmarks({ bookmarks, findBookmarks, onFindBookmarks, auth }) {
  const bookmarksFiltered = applyFilter(bookmarks, findBookmarks);

  const isNotFound = bookmarksFiltered.length === 0;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Bookmarks
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findBookmarks}
        onChange={event => onFindBookmarks(event.target.value)}
        placeholder='Find Bookmarks...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          )
        }}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {bookmarksFiltered.map(solution => {
          if (!auth.me.bookmarks.includes(solution._id)) {
            return;
          }
          return (
            <Grid key={solution._id} item xs={12} md={12}>
              <SolutionPostCard solution={solution} />
            </Grid>
          );
        })}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findBookmarks} />
        </Box>
      )}
    </Box>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      solution => solution.question.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
