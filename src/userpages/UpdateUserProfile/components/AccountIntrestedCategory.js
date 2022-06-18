import * as Yup from "yup";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Card,
  Chip,
  Stack,
  TextField,
  Autocomplete,
  Paper,
  Container,
} from "@mui/material";

// components
import { FormProvider } from "../../../components/hook-form";

// Internal Import
import { chooseInterestedCategory } from "../../../redux/actions/authActions";
import { getAllCategory } from "../../../redux/actions/categoryAction";

// ----------------------------------------------------------------------

export default function AccountIntrestedCategory() {
  const dispatch = useDispatch();
  const [categoriesList, setcategoryList] = useState([]);
  const category = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    //convert array object to string
    console.log(category.categoryList);
    const categoriesl = category.categoryList.map((category) => {
      return category.title;
    });
    setcategoryList(categoriesl);
  }, [category.categoryList]);

  const defaultValues = {
    categories: auth?.me?.interestedCategories || [],
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    control,

    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      dispatch(chooseInterestedCategory(values, enqueueSnackbar));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main">
      <Paper variant="outlined" sx={{ my: { xs: 3 } }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        value={values.categories}
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={categoriesList.map((option) => option)}
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
                          <TextField label="Interested Category" {...params} />
                        )}
                      />
                    )}
                  />
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    Choose Category
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Paper>
    </Container>
  );
}
