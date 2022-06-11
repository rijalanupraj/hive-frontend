// External Import
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography, Snackbar } from "@mui/material";

// Hooks
import useResponsive from "../../hooks/useResponsive";

// components
import Page from "../../components/Page";

// sections
import LoginForm from "./auth-forms/LoginForm";
import AuthSocial from "./auth-forms/AuthSocial";
import { resetEmailSuccess } from "../../redux/actions/registerActions";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",

  }
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 120,
  zIndex: 9,
  lineHeight: 0,
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "85vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column"
}));

// ----------------------------------------------------------------------

export default function Login() {
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  useEffect(() => {
    if (register.success) {
      setIsSnackBarOpen(true);

      setTimeout(() => {
        setIsSnackBarOpen(false);
        dispatch(resetEmailSuccess());
      }, 5000);
    }
  }, []);

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <Page title='Login'>
      <RootStyle>
        <HeaderStyle>
          {/* <Logo /> */}

          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: 8 } }}>
              Don’t have an account? {""}
              <Link variant='subtitle2' component={RouterLink} to='/register'>
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src='/static/illustrations/online_discussion.png' alt='login' />
          </SectionStyle>
        )}

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={isSnackBarOpen}
          message={register.success}
          key='topcenter'
        />
        <Container maxWidth='sm'>
          <ContentStyle>
            <Typography variant='h4' gutterBottom>
              Sign in to Samadhan
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Enter your details below.
            </Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && (
              <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link variant='subtitle2' component={RouterLink} to='/register'>
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
