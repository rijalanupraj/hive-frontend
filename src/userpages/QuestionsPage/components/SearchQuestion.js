import { useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  Stack,
  Paper,
  TextField,
  InputAdornment,
  Autocomplete,
  FormControl,
  Button,
  Grid,
  MenuItem,
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

const SearchQuestion = ({ onSearchSubmit, searchParams, setSearchParams }) => {
  const category = useSelector((state) => state.category);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (category.categoryList) {
      setCategoriesList([...category.categoryList]);

      // Check if selected category is in the list
      if (
        !category.categoryList.find(
          (category) => category.title === searchParams.get("c")
        )
      ) {
        setSearchParams({
          ...searchParams,
          q: searchParams.get("q") || "",
          c: "all",
        });
      }
    }
  }, [category.categoryList]);

  return (
    <>
      <Paper>
        {/* write comment */}
        <form onSubmit={onSearchSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <Item>
                <TextField
                  fullWidth
                  size="medium"
                  value={searchParams.get("q") || ""}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      q: e.target.value,
                      c: searchParams.get("c") || "all",
                    })
                  }
                  placeholder="Search Question"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button type="submit" size="medium" variant="outlined">
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ml: 1,
                    mt: -1,
                    mr: 5,
                    mb: 1,
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: (theme) =>
                        `${theme.palette.grey[500_32]} !important`,
                    },
                  }}
                />
              </Item>
            </Grid>

            {categoriesList.length > 0 && (
              <Grid item xs={6} md={4}>
                <TextField
                  id="business-type-select"
                  label="Category"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchParams.get("c") || "all"}
                  sx={{
                    mt: 1,
                    pr:2,
                  }}
                  onChange={(e) => {
                    setSearchParams({
                      ...searchParams,
                      c: e.target.value,
                      q: searchParams.get("q") || "",
                    });
                  }}
                  select
                >
                  <MenuItem value="all">All</MenuItem>,
                  {categoriesList.length > 0 &&
                    categoriesList.map((type) => {
                      
                      return [
                        <MenuItem value={type.title}>{type.title}</MenuItem>,
                      ];
                    })}
                </TextField>
              </Grid>
            )}

          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default SearchQuestion;
