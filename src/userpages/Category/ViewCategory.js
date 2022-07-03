import { capitalCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// routes
// import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
// import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// _mock_
import { _category } from "../../_mock/_user";
// components
import Page from "../../components/Page";
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Category from "../../sections/category/Category";

import { getAllCategory } from "../../redux/actions/categoryAction";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ViewCategory() {
  const { themeStretch } = useSettings();
  // const { user } = useAuth();

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [findCategories, setFindCategories] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category.categoryList) {
      setCategoriesList(category.categoryList);
    }
  }, [category.categoryList]);

  const handleFindCategories = (value) => {
    setFindCategories(value);
  };

  return (
    <Page title="User: Profile">
      <Container
        maxWidth={themeStretch ? false : "lg"}
      >
        {/* <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: '/' },
            { name: "User", href: '/' },
            { name: 'YourName', href: '/' },
          ]}
        /> */}
        <Category
          categories={categoriesList}
          findCategories={findCategories}
          onFindCategories={handleFindCategories}
        />
      </Container>
    </Page>
  );
}
