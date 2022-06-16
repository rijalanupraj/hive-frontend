import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, SpeedDial, Typography, SpeedDialAction } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: <Iconify icon="ant-design:instagram-filled" width={20} height={20} color="#D7336D" />,
  },
  {
    name: 'Linkedin',
    icon: <Iconify icon="eva:linkedin-fill" width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />,
  },
];

const OverlayStyle = styled('h1')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  ...theme.typography.h4,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: -5,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------



export default function QuestionSolutionHeader() {

  const isDesktop = useResponsive('up', 'sm');

  return (
    <Box sx={{ position: 'relative' }} style={{
      height: isDesktop ? '40vh' : '30vh',
      backgroundColor: '#1A2027',
    }}>
      <TitleStyle>How to open a bank account?</TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="experts" src="https://64.media.tumblr.com/99d03efc97ddb990cac5ed9966bb1a04/20cfea4bd0512deb-d7/s1280x1920/66081a68797116b4247d0c0b1cae220a0c84e4e1.png" sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              Mamba Dai
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {/* {fDate(createdAt)} */} 14 Jun 2022
            </Typography>
          </Box>
          
        </Box>

        <SpeedDial
          direction={isDesktop ? 'left' : 'up'}
          ariaLabel="Share post"
          icon={<Iconify icon="eva:share-fill" sx={{ width: 15, height: 15 }} />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          
            <SpeedDialAction
              key="facebook"
              icon={<Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />}
              tooltipTitle="Facebook"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
            <SpeedDialAction
              key="linkedin"
              icon={<Iconify icon="eva:linkedin-fill" width={20} height={20} color="#1877F2" />}
              tooltipTitle="Linkedin"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
            <SpeedDialAction
              key="twitter"
              icon={<Iconify icon="eva:twitter-fill" width={20} height={20} color="#1877F2" />}
              tooltipTitle="Twitter"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
        
        </SpeedDial>
      </FooterStyle>
      
      <OverlayStyle />
    </Box>
  );
}
