// @mui
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

const InputStyle = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'stretchStart',
})(({ stretchStart, theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    ...(stretchStart && {
      width: stretchStart,
      '&.Mui-focused': {
        [theme.breakpoints.up('sm')]: {
          width: stretchStart + 60,
        },
      },
    }),
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default InputStyle;
