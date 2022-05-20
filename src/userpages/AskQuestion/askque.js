import { React, useState, useEffect } from "react";
import * as Yup from "yup";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, TextField } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../redux/actions/questionAction";

const theme = createTheme();

const category = ["Government", "Health", "Education", "Vechiles"];
const questiontag = [
  { title: "samadhan" },
  { title: "school" },
  { title: "college" },
  { title: "government" },
  { title: "hospital" },
  { title: "travel" },
  { title: "rules" },
  { title: "Relationship" },
  { title: "law" },
];

export default function AskQuestion() {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const navigate = useNavigate();

  useEffect(() => {
    if (question.error) {
      formik.setSubmitting(false);
    }
  }, [question.error]);

  const QuestionSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Too Short!")
      .max(70, "Too Long!")
      .required("Please choose an appropriate title for your question"),
    category: Yup.string().required("Category required"),
    tags: Yup.array().required("Tags required"),
    description: Yup.string()
      .min(6, "Too short")
      .required("Please write down descriptio for your question"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      tags: [],
      description: "",
    },
    validationSchema: QuestionSchema,
    onSubmit: () => {
      dispatch(askQuestion(formik.values, navigate));
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;
  const [value, setValue] = useState(category[-1]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(touched);
  }, [touched]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="div"
            variant="body1"
            style={{
              height: 40,
              width: "100%",
              position: "relative",
            }}
          >
            <Stack
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",

                fontSize: "1rem",
                fontWeight: "700",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: "modal",
              }}
            >
              Create New Question
            </Stack>
          </Typography>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Title"
                    type="text"
                    required
                    placeholder="Enter your title here "
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Stack>
                {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Autocomplete
                    fullWidth={true}
                    style={{
                      width: "100%",
                      fullWidth: true,
                    }}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    id=""
                    options={category}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        placeholder="search or choose category"
                      />
                    )}
                  />
                </Stack> */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Autocomplete
                    fullWidth={true}
                    style={{
                      width: "100%",
                      fullWidth: true,
                    }}
                    required
                    {...getFieldProps("category")}
                    onChange={(event, value) => {
                      setFieldValue("category", value);
                    }}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    options={category}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value.title
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        placeholder="search or choose category"
                      />
                    )}
                  />
                  {touched.category && errors.category ? (
                    <div className="error">{errors.category}</div>
                  ) : null}
                </Stack>

                {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={questiontag}
                    style={{
                      width: "100%",
                      fullWidth: true,
                    }}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[questiontag[0]]}
                    filterSelectedOptions
                    error={Boolean(touched.tags && errors.tags)}
                    helperText={touched.tags && errors.tags}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="search or choose tags"
                      />
                    )}
                  />
                </Stack> */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={questiontag}
                    style={{
                      width: "100%",
                      fullWidth: true,
                    }}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[questiontag[0]]}
                    onChange={(event, value) => {
                      // UPdate Array of tags
                      setFieldValue("tags", value);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value.title
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="search or choose tags"
                      />
                    )}
                  />
                </Stack>
                {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextareaAutosize
                    label="Description"
                    required
                    style={{
                      width: "100%",
                      fullWidth: true,
                    }}
                    minRows={4}
                    placeholder="Description"
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack> */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextareaAutosize
                    label="Description"
                    style={{
                      width: "100%",
                      fullWidth: true,
                    }}
                    minRows={4}
                    required
                    placeholder="Description"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  {touched.description && errors.description ? (
                    <div className="error">{errors.description}</div>
                  ) : null}
                </Stack>
                <Grid container>
                  <Grid item xs>
                    <Button variant="outlined" color="error">
                      Cancel
                    </Button>
                  </Grid>

                  <LoadingButton
                    xs={1}
                    size="large"
                    type="submit"
                    justifycontent="flex-end"
                    color="success"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
