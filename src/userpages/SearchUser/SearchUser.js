import { capitalCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container } from "@mui/material";
// routes
// import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
// import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userCards } from "../../_mock/_user";
// components
import Page from "../../components/Page";
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Category from "../../sections/category/Category";
import UserSearch from "../../sections/SearchUser/Users";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/usersActions";
import fi from "date-fns/esm/locale/fi/index.js";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SearchUser() {
  const { themeStretch } = useSettings();
  // const { user } = useAuth();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [usersList, setUsersList] = useState([]);
  const [findUsers, setFindUsers] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsersList(users.users);
  }, [users.users]);

  const handleFindUsers = (value) => {
    setFindUsers(value);
  };

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="User: Profile">
      <Container
        maxWidth={themeStretch ? false : "lg"}
        style={{
          marginTop: "13vh",
        }}
      >
        <UserSearch
          Users={usersList}
          findUsers={findUsers}
          onFindUsers={handleFindUsers}
        />
      </Container>
    </Page>
  );
}
