import * as Yup from "yup";
import { useCallback, useState, useEffect } from "react";
// import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// @mui
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import { useSnackbar } from "notistack";

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
import { updateSolution } from "../../redux/actions/solutionActions";
import { viewSolution } from "../../redux/actions/viewSolutionActions";
import QuestionPostCard from "../../sections/cards/QuestionPostCard";

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

const categoriesList = ["Government", "Health", "Education", "Vechiles"];

// ----------------------------------------------------------------------

export default function UpdateSolution() {
  const dispatch = useDispatch();
  const { solutionId } = useParams();
  const solution = useSelector((state) => state.viewSolutions);
  const auth = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const tags = useSelector((state) => state.tag);
  const navigate = useNavigate();
  const { questionId } = useParams();

  const tagsList = tags.tagsList;

  useEffect(() => {
    dispatch(viewSolution(solutionId, navigate, enqueueSnackbar));
    dispatch(getAllAvailableTags());
  }, [dispatch]);

  // if (!solution.solution) {
  //   return <div>Loading...</div>;
  // }

  // const { enqueueSnackbar } = useSnackbar();

  const NewQuestionSchema = Yup.object().shape({
    answer: Yup.string().min(100).required("Content is required"),
    tags: Yup.array().required("Tags is required").min(1, "Tags is required"),
    cover: Yup.mixed(),
  });

  const defaultValues = {
    answer: solution?.solution?.answer || "",
    cover: null,
    tags: solution?.solution?.tags || [],
    isDraft: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: ["Logan"],
  };

  useEffect(() => {
    if (solution.solution) {
      setValue("answer", solution.solution.answer);
      setValue("tags", solution.solution.tags);
      setValue("isDraft", !solution.solution.isDraft);
    }
  }, [solution.solution]);

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
    formState: { isSubmitting, isValid, errors },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      const newValue = { ...values, isDraft: !values.isDraft };
      dispatch(updateSolution(solutionId, newValue, navigate));
      reset();
      // enqueueSnackbar("Post success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "cover",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title="Update Solution">
      <RootStyle>
        <Container
          component="main"
          sx={{ mb: 4 }}
          style={{
            marginTop: "5rem",
          }}
        >
          <Typography variant="h4" sx={{ pl: 2 }}>
            {" "}
            Update Solution{" "}
          </Typography>
          <br />
          {solution?.solution?.question && (
            <QuestionPostCard question={solution?.solution?.question} />
          )}
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 } }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <div>
                        <LabelStyle>Introduction</LabelStyle>
                        <RHFEditor name="answer" />
                      </div>

                      <div>
                        <LabelStyle>Cover</LabelStyle>
                        <RHFUploadSingleFile
                          name="cover"
                          accept="image/*"
                          maxSize={3145728}
                          onDrop={handleDrop}
                        />
                      </div>
                    </Stack>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            freeSolo
                            value={values.tags}
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
                              <TextField
                                label="Tags"
                                {...params}
                                error={errors.tags}
                                helperText={errors.tags?.message}
                              />
                            )}
                          />
                        )}
                      />

                      <div>
                        <RHFSwitch
                          name="isDraft"
                          label="Publish"
                          labelPlacement="start"
                          sx={{
                            mb: 1,
                            mx: 0,
                            width: 1,
                            justifyContent: "space-between",
                          }}
                        />
                      </div>
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
                      Update Solution
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </FormProvider>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}
