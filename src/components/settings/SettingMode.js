// @mui
import { styled } from '@mui/material/styles';
import { Grid, RadioGroup, CardActionArea, FormControlLabel, Radio } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
//
import Iconify from '../Iconify';
import PropTypes from 'prop-types';


// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function SettingMode() {
  const { themeMode, onChangeMode } = useSettings();

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      
      <Grid dir="ltr" container>
        {['light', 'dark'].map((mode, index) => {
          const isSelected = themeMode === mode;

          return (

            <Grid key={mode} item xs={2} sx={{mb:2}} >
              <BoxStyle
                sx={{
                  bgcolor: mode === 'light' ? 'common.white' : 'grey.800',
                  ...(isSelected && {
                    color: 'primary.main',
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                  ml:3,
                  mr:3
                }}
                style={{
                  width:'90%',
                  height:'130%',
                }}

              >
                <Iconify icon={index === 0 ? 'ph:sun-duotone' : 'ph:moon-duotone'} width={18} height={18} />
                <BoxMask value={mode} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}

BoxMask.propTypes = {
  value: PropTypes.string,
};

export function BoxMask({ value }) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}
