import * as React from "react";
import * as Yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, TextField } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const theme = createTheme();
export default function AskQuestion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* stack for image and title */}
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 0,
              width: "100%",
              height: "10%",
            },
          }}
        >
          <Paper elevation={0} />
          <Box
            component="img"
            alt="The house from the offer."
            src="https://i.ibb.co/grnLWrt/cover.png"
          />
          <Paper />
        </Box>
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              mx: 5,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
            component="div"
            gutterBottom
          >
            How to pay to foreign services from nepal?
          </Typography>
          <Typography
            sx={{ fontWeight: "bold", typography: "body2", mx: 6 }}
            component="div"
            gutterBottom
          >
            Easy way to pay for foreign services
            <Chip
              label="posted 2 month ago"
              variant="outlined"
              sx={{ mx: 4 }}
            />
          </Typography>
        </Stack>
      </Stack>
      {/* stack for main content */}
      <Card sx={{ maxWidth: 150, mx: 5, borderRadius: 5 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{}}
              src="/public/favicon.ico"
              aria-label="recipe"
            ></Avatar>
          }
          title="Mamba"
        />
      </Card>
      <Card sx={{ maxWidth: 150, mx: 5, my: 3, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 0 }}>
          <IconButton style={{ color: "green", fontWeight: 25, fontSize: 20 }}>
            <ArrowUpwardIcon />
            11
          </IconButton>

          <IconButton style={{ color: "red", fontWeight: 25, fontSize: 20 }}>
            <ArrowDownwardIcon />5
          </IconButton>
        </Box>
      </Card>
      <Grid container>
        <Grid item xs={8}>
          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                mx: 5,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", my: 2 }}
              component="div"
              gutterBottom
            >
              Introduction
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam
              dignissimoslaborum fugiat deleniti? Eum quasi quidem quibusdam.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam
              dignissimoslaborum fugiat deleniti? Eum quasi quidem
              quibusdam.Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
              inventore consectetur, neque doloribus, cupiditate numquam
              dignissimoslaborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", my: 2 }}
              component="div"
              gutterBottom
            >
              Solution
            </Typography>
            <Stack direction="row" spacing={1} sx={{ my: 12 }}>
              <Chip label="School" variant="outlined" />
              <Chip label="Government" variant="outlined" />
              <Chip label="Government" variant="outlined" />
            </Stack>
          </Stack>
        </Grid>

        <Grid item sx={{ justifyContent: "end" }}>
          ...asdsssssssssssssssssssssssssss
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
