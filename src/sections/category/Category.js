import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { capitalCase } from "change-case";

// @mui
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Typography,
  InputAdornment,
  Autocomplete,
  Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// components
import Iconify from "../../components/Iconify";
import InputStyle from "../../components/InputStyle";
import SearchNotFound from "../../components/SearchNotFound";
import { Controller } from "react-hook-form";
import { suggestNewCategory } from "../../redux/actions/categoryAction";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

Category.propTypes = {
  categories: PropTypes.array,
  findCategories: PropTypes.string,
  onFindCategories: PropTypes.func,
};

export default function Category({
  categories,
  findCategories,
  onFindCategories,
}) {
  const categoryFiltered = applyFilter(categories, findCategories);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isNotFound = categoryFiltered.length === 0;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (auth.isAuthenticated) {
      setOpen(true);
    } else {
      navigate(`/login?redirectTo=${window.location.pathname}`);
      enqueueSnackbar("You must log in to suggest a category", {
        variant: "error",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const NewCategorySchema = Yup.object().shape({
    title: Yup.string().required("Category Title is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: NewCategorySchema,
    onSubmit: (values) => {
      dispatch(suggestNewCategory(values, enqueueSnackbar));
      formik.resetForm();
      handleClose();
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Box>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Dialog open={open} onClose={handleClose}>
          
          <DialogTitle sx={{mb:1}}>Suggest New Category</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{mb:3}}>
              You can only suggest categories which are not available.
            </DialogContentText>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="text"
                  label="Title"
                  variant="outlined"
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{mb:2}}
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{mb:2}}
                >
                  Suggest Category
                </LoadingButton>
              </Form>
            </FormikProvider>
          </DialogContent>
        </Dialog>
      </Box>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Categories
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findCategories}
        onChange={(event) => onFindCategories(event.target.value)}
        placeholder="Find Category..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      />

      <Button variant="contained" onClick={handleClickOpen} sx={{ml:3, p:1.7}}>
        Suggest Category
      </Button>

      <Grid container spacing={3}>
        {categoryFiltered.map((category) => (
          <Grid key={category._id} item xs={12} md={4}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findCategories} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------
CategoryCard.propTypes = {
  category: PropTypes.object,
};

function CategoryCard({ category }) {
  // const { name, country, avatarUrl, isFollowed } = category;

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar
        alt={category.title}
        src="http://survedmonton.ca/wp-content/uploads/2015/10/office-icon-350x350.png"
        sx={{ width: 48, height: 48 }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {capitalCase(category.title)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Iconify
            icon={"akar-icons:circle-plus"}
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {category?.questionCount} questions
          </Typography>
        </Box>
      </Box>
      <Button size="small" variant={"outlined"} color={"primary"}>
        Explore
      </Button>
    </Card>
  );
}

function applyFilter(array, query) {
  if (query) {
    return array.filter(
      (category) =>
        category.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
