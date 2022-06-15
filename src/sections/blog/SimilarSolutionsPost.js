import PropTypes from 'prop-types';
// @mui
import { Grid, Typography } from '@mui/material';
//
import SimilarSolutionsCard from './SimilarSolutionsCard';

// ----------------------------------------------------------------------



export default function SimilarSolutionsPost() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, ml:4 }}>
        Alternative Solutions
      </Typography>

      <Grid container direction="column" spacing={3} sx={{ml:1}}>

          <Grid item xs={12} sm={6} md={3}>
            <SimilarSolutionsCard />
          </Grid>

      </Grid>
    </>
  );
}
