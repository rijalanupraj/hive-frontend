import PropTypes from 'prop-types';
// @mui
import { Grid, Typography } from '@mui/material';
//
import BlogPostCard from './BlogPostCard';

// ----------------------------------------------------------------------



export default function BlogPostRecent() {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={3}>
            <BlogPostCard />
          </Grid>

      </Grid>
    </>
  );
}
