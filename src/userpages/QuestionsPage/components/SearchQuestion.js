import { useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Paper,
  TextField,
  InputAdornment,
  Autocomplete,
  Button,
  Grid,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Item = styled(Paper)(({ theme }) => ({

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SearchQuestion = () => {
  const category = useSelector((state) => state.category);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (category.categoryList) {
      setCategoriesList(category.categoryList);
    }
  }, [category.categoryList]);

  const NewQuestionSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(15, "Title must be at least 15 characters")
      .max(400, "Title must be less than 400 characters"),
    description: Yup.string(),
    category: Yup.string().required("Category is required"),
    tags: Yup.array().required("Tags is required").min(1, "Tags is required"),
  });

  const defaultValues = {
    title: "",
    description: "",
    category: "",
    tags: [],
    publish: true,
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
    formState: { isSubmitting, isValid, errors },
  } = methods;
  return (
    <>
      <Paper>
        {/* write comment */}
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Item>
              <TextField
                fullWidth
                size="medium"
                placeholder="Search Question"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button size="medium" variant="outlined">
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mt: 2,
                  ml: 1,
                  mr: 5,
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: (theme) =>
                      `${theme.palette.grey[500_32]} !important`,
                  },
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>
              <Controller
                name="category"
                fullWidth
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={categoriesList.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        label="Category"
                        {...params}
                        error={errors.category}
                        helperText={errors.category?.message}
                        sx={{
                          mt: 2,
                          "& fieldset": {
                            borderWidth: `1px !important`,
                            borderColor: (theme) =>
                              `${theme.palette.grey[500_32]} !important`,
                          },
                        }}
                      />
                    )}
                  />
                )}
              />
            </Item>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SearchQuestion;
