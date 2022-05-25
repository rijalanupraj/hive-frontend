// External Dependencies
import * as Yup from 'yup';
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}></Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }
            }}
          ></Box>

          <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
            <LoadingButton type='submit' variant='contained' loading={false}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
