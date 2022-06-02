import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { Box, Grid, Card, Button, Avatar, Typography, InputAdornment } from "@mui/material";
// components
import Iconify from "../../components/Iconify";
import InputStyle from "../../components/InputStyle";
import SearchNotFound from "../../components/SearchNotFound";

// ----------------------------------------------------------------------


Category.propTypes = {
    categories: PropTypes.array,
    findCategories: PropTypes.string,
    onFindCategories: PropTypes.func,
};


export default function Category({ categories, findCategories, onFindCategories }) {
  const categoryFiltered = applyFilter(categories, findCategories);

  const isNotFound = categoryFiltered.length === 0;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Categories
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findCategories}
        onChange={event => onFindCategories(event.target.value)}
        placeholder='Find Category...'
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
        {categoryFiltered.map(category => (
          <Grid key={category.id} item xs={12} md={4}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findCategories} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------
CategoryCard.propTypes = {
    category: PropTypes.object,
  };
  
  function CategoryCard({ category }) {
    // const { name, country, avatarUrl, isFollowed } = category;
  
    return (
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar alt="government" src="http://survedmonton.ca/wp-content/uploads/2015/10/office-icon-350x350.png" sx={{ width: 48, height: 48 }} />
        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
          <Typography variant="subtitle2" noWrap>
            Government
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon={'akar-icons:circle-plus'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              200 questions
            </Typography>
          </Box>
        </Box>
        <Button
          size="small"
          variant={'outlined'}
          color={ 'primary'}
        >
          Explore
        </Button>
      </Card>
    );
  }

function applyFilter(array, query) {
  if (query) {
    return array.filter(friend => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return array;
}
