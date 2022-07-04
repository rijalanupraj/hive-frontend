import { useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Autocomplete,
  Divider,
  Collapse,
  Button,
} from "@mui/material";

import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import MyAvatar from "../../../components/MyAvatar";
import EmojiPicker from "../../../components/EmojiPicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



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
        <Stack direction="row" alignItems="center" sx={{ mb: 2, mt: 3 }}>
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
              ml: 2,
              mr: 5,
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: (theme) =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          
          <Controller
            name="category"
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
                  />
                )}
              />
            )}
          />

          {/* <IconButton>
            <Iconify icon={"charm:search"} width={24} height={24} />
          </IconButton> */}
          <input type="file" style={{ display: "none" }} />
        </Stack>
      </Paper>
    </>
  );
};

export default SearchQuestion;
