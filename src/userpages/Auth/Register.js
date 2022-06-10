import { Link as RouterLink, Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// import Logo from '../components/Logo';
// sections
import RegisterForm from './auth-forms/RegisterForm';
import AuthSocial from './auth-forms/AuthSocial';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  }
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 120,
  zIndex: 9,
  lineHeight: 0,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '85vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function Register() {
  const auth = useSelector(state => state.auth);

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  if (auth.isAuthenticated) return <Navigate to='/' />;

  return (
    <Page title='Register'>
      <RootStyle>
        <HeaderStyle>
          {/* <Logo /> */}
          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: 8 } }}>
              Already have an account? {''}
              <Link variant='subtitle2' component={RouterLink} to='/login'>
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Join Samadhan Now
            </Typography>
            <img alt='register' src='/static/illustrations/online_discussion.png' />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant='h4' gutterBottom>
              Get started
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Get started by creating an account
            </Typography>

            <AuthSocial />

            <RegisterForm />

            <Typography variant='body2' align='center' sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to Samdhan&nbsp;
              {/* <Link underline='always' color='text.primary' href='#'>
                Terms of Service
              </Link>
              {''}and{''}
              <Link underline='always' color='text.primary' href='#'>
                Privacy Policy
              </Link> */}
              .
            </Typography>

            {!smUp && (
              <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant='subtitle2' to='/login' component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
