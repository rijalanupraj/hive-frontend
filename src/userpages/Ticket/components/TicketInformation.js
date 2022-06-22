// External Dependencies
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Box, Grid, Card, Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";

//mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircleIcon from "@mui/icons-material/Circle";

// Internal Import
import {  userTicket } from "../../../redux/actions/userActions";

// ----------------------------------------------------------------------

export default function TicketInformation() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isLoading) {
      formik.setSubmitting(false);
    } else {
      formik.setSubmitting(true);
    }
  }, [user.isLoading]);

  const TicketSchema = Yup.object().shape({
    request: Yup.string()
      .required("Provide your ticket request title")
      .min(5, "Request must be at least 5 characters"),

    description: Yup.string().required(
      "Provide your ticket request description"
    ),
  });

  const formik = useFormik({
    initialValues: {
      request: "",
      description: "",
    },
    validationSchema: TicketSchema,
    onSubmit: (values) => {
      dispatch(userTicket(formik.values));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 2, px: 3, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Your Tickets
          </Typography>
          <List
            sx={{
              width: "100%",

              bgcolor: "background.paper",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="#1111 solution page is not loading"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      align="right"
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <CircleIcon color="success" sx={{ pt: 2 }} />
                      Open
                    </Typography>
                    <Typography
                      sx={{ display: "inline", ml: 12 }}
                      component="span"
                      variant="body2"
                    >
                      1 Week Ago
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="#1112 Question page is not loading"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      align="right"
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <CircleIcon color="info" sx={{ pt: 2 }} />
                      Resolved
                    </Typography>
                    <Typography
                      sx={{ display: "inline", ml: 12 }}
                      component="span"
                      variant="body2"
                    >
                      1 Week Ago
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <TextField
              fullWidth
              disabled
              label="Full Name"
              value={auth.me.name || ""}
            />

            <TextField
              fullWidth
              disabled
              label="Email"
              type="email"
              value={auth.me.email || ""}
            />
          </Box>
        </Card>
        <Card sx={{ p: 3, mt: 3, mb: 3 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box>
                <TextField
                  fullWidth
                  autoComplete="Request"
                  type="text"
                  label="Request"
                  {...getFieldProps("request")}
                  error={Boolean(touched.request && errors.request)}
                  helperText={touched.request && errors.request}
                />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  label="Description"
                  {...getFieldProps("description")}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={false}
                >
                  Create Ticket
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
