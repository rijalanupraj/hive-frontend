import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@mui/material';
// utils
import { fPercent, fCurrency } from '../../../utils/formatNumber';
// _mock_
import { _ecommerceSalesOverview } from '../../../_mock';

// ----------------------------------------------------------------------

export default function UserXpLevelview() {
  return (
    <Card>
      <CardHeader title="Level 1" />
      <Stack spacing={4} sx={{ p: 3 }}> 
          <ProgressItem />
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

function ProgressItem() {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          Progress
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          74%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value="74"
        color='success'
        style={{
          height: 8,
        }}
      />
    </Stack>
  );
}
