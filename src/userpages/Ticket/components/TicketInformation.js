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
import { useSnackbar } from "notistack";

// Internal Import
import {
  createUserTicket,
  getUserTickets,
} from "../../../redux/actions/userActions";

// ----------------------------------------------------------------------

export default function TicketInformation() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getUserTickets());
  }, []);

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
      dispatch(createUserTicket(formik.values, enqueueSnackbar));
      formik.resetForm();
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
            {user.tickets.map((ticket) => (
              <ListItem key={ticket._id} alignItems="flex-start">
                <ListItemText
                  primary={ticket.request}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        align="right"
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {ticket.description}
                        <CircleIcon color="success" sx={{ pt: 2 }} />
                        {ticket.status}
                      </Typography>
                      <Typography
                        sx={{ display: "inline", ml: 1 }}
                        component="span"
                        variant="body2"
                      >
                        {ticket.createdAt.split("T")[0]}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}

            <Divider />
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
