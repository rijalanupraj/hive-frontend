import * as Yup from "yup";
import { useCallback, useState, useEffect } from "react";
// import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// @mui
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import {
  Grid,
  Card,
  Chip,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Paper,
  Container,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
// routes
// components
import {
  RHFSwitch,
  RHFEditor,
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from "../../components/hook-form";

import Page from "../../components/Page";

// Internal Import
import { askQuestion } from "../../redux/actions/questionActions";
import { getAllAvailableTags } from "../../redux/actions/tagActions";
import { getAllCategory } from "../../redux/actions/categoryAction";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function AskQuestion() {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const [showMetaData, setShowMetaData] = useState(false);
  const tags = useSelector((state) => state.tag);
  const category = useSelector((state) => state.category);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categoriesList, setCategoriesList] = useState([]);

  const tagsList = tags.tagsList;

  useEffect(() => {
    dispatch(getAllAvailableTags());
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category.categoryList) {
      setCategoriesList(category.categoryList);
    }
  }, [category.categoryList]);
  // const { enqueueSnackbar } = useSnackbar();

  const NewQuestionSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.array().required("Tags is required").min(1, "Tags is required"),
  });

  const defaultValues = {
    title: "",
    description: "",
    category: "",
    tags: [],
    publish: true,
    comments: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewQuestionSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      dispatch(askQuestion(values, navigate));
      reset();
      enqueueSnackbar("Question asked successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Ask Question">
      <Container component="main">
        <Paper variant="outlined" sx={{ my: { xs: 3 }, p: { xs: 3 } }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <RHFTextField name="title" label="Question Title" />

                    <RHFTextField
                      name="description"
                      label="Description"
                      multiline
                      rows={5}
                    />
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          onChange={(event, newValue) =>
                            field.onChange(newValue)
                          }
                          options={categoriesList.map((option) => option.title)}
                          renderInput={(params) => (
                            <TextField label="Category" {...params} />
                          )}
                        />
                      )}
                    />
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          multiple
                          freeSolo
                          onChange={(event, newValue) =>
                            field.onChange(newValue)
                          }
                          options={tagsList.map((option) => option)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                {...getTagProps({ index })}
                                key={option}
                                size="small"
                                label={option}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField label="Tags" {...params} />
                          )}
                        />
                      )}
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            value={showMetaData}
                            onChange={() => setShowMetaData(!showMetaData)}
                          />
                        }
                        label="Meta Data"
                      />
                    </FormGroup>

                    {showMetaData && (
                      <>
                        <RHFTextField name="metaTitle" label="Meta title" />

                        <RHFTextField
                          name="metaDescription"
                          label="Meta description"
                          fullWidth
                          multiline
                          rows={3}
                        />

                        <Controller
                          name="metaKeywords"
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              multiple
                              freeSolo
                              onChange={(event, newValue) =>
                                field.onChange(newValue)
                              }
                              options={tagsList.map((option) => option)}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    {...getTagProps({ index })}
                                    key={option}
                                    size="small"
                                    label={option}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField label="Meta keywords" {...params} />
                              )}
                            />
                          )}
                        />
                      </>
                    )}
                  </Stack>
                </Card>

                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    Ask Question
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
