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
  Container
} from "@mui/material";
// routes
// components
import {
  RHFSwitch,
  RHFEditor,
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile
} from "../../components/hook-form";
import { BACKEND_API_URL } from "../../constants";

import Page from "../../components/Page";

// Internal Import
import { askQuestion } from "../../redux/actions/questionActions";
import { getAllAvailableTags } from "../../redux/actions/tagActions";
import { postSolution } from "../../redux/actions/solutionActions";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const categoriesList = ["Government", "Health", "Education", "Vechiles"];

// ----------------------------------------------------------------------

export default function AskQuestion1() {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tag);
  const navigate = useNavigate();
  const { questionId } = useParams();

  const tagsList = tags.tagsList;

  useEffect(() => {
    const checkQuestionIdIsValid = async () => {
      if (questionId) {
        const response = await fetch(`${BACKEND_API_URL}/question/id/${questionId}`);
        if (response.status === 200) {
        } else {
          navigate("/404");
        }
      }
    };
    checkQuestionIdIsValid();
  }, [questionId]);

  useEffect(() => {
    dispatch(getAllAvailableTags());
  }, [dispatch]);

  // const { enqueueSnackbar } = useSnackbar();

  const NewQuestionSchema = Yup.object().shape({
    answer: Yup.string().min(100).required("Content is required"),
    cover: Yup.mixed()
  });

  const defaultValues = {
    answer: "",
    cover: null,
    tags: ["Logan"],
    isDraft: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: ["Logan"]
  };

  const methods = useForm({
    resolver: yupResolver(NewQuestionSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newValue = { ...values, isDraft: !values.isDraft };
      console.log(newValue);
      dispatch(postSolution(questionId, newValue, navigate));
      //   reset();
      // enqueueSnackbar("Post success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "cover",
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title='Post Solution'>
      <RootStyle>
        <Container
          component='main'
          sx={{ mb: 4 }}
          style={{
            marginTop: "5rem"
          }}
        >
          <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 } }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <div>
                        <LabelStyle>Content</LabelStyle>
                        <RHFEditor name='answer' />
                      </div>

                      <div>
                        <LabelStyle>Cover</LabelStyle>
                        <RHFUploadSingleFile
                          name='cover'
                          accept='image/*'
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
                        name='tags'
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            freeSolo
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={tagsList.map(option => option)}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  key={option}
                                  size='small'
                                  label={option}
                                />
                              ))
                            }
                            renderInput={params => <TextField label='Tags' {...params} />}
                          />
                        )}
                      />

                      <RHFTextField name='metaTitle' label='Meta title' />

                      <RHFTextField
                        name='metaDescription'
                        label='Meta description'
                        fullWidth
                        multiline
                        rows={3}
                      />

                      <Controller
                        name='metaKeywords'
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            freeSolo
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={tagsList.map(option => option)}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  key={option}
                                  size='small'
                                  label={option}
                                />
                              ))
                            }
                            renderInput={params => <TextField label='Meta keywords' {...params} />}
                          />
                        )}
                      />
                      <div>
                        <RHFSwitch
                          name='isDraft'
                          label='Publish'
                          labelPlacement='start'
                          sx={{ mb: 1, mx: 0, width: 1, justifyContent: "space-between" }}
                        />
                      </div>
                    </Stack>
                  </Card>

                  <Stack direction='row' spacing={1.5} sx={{ mt: 3 }}>
                    <LoadingButton
                      fullWidth
                      type='submit'
                      variant='contained'
                      size='large'
                      loading={isSubmitting}
                    >
                      Post Solution
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
