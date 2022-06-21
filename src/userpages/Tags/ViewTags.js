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
import Tags from "../../sections/tags/Tags";

import { getAllAvailableTags } from "../../redux/actions/tagActions";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ViewTags() {
  const { themeStretch } = useSettings();
  // const { user } = useAuth();

  const dispatch = useDispatch();
  const tag = useSelector((state) => state.tag);
  const [findTags, setFindTags] = useState("");
  const [tagsList, setTagList] = useState([]);

  useEffect(() => {
    dispatch(getAllAvailableTags());
  }, [dispatch]);

  useEffect(() => {
    if (tag.tagsList) {
      setTagList(tag.tagsList);
    }
  }, [tag.tagsList]);

  const handleFindTags = (value) => {
    setFindTags(value);
  };

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Tags tags={tagsList} findTags={findTags} onFindTags={handleFindTags} />
      </Container>
    </Page>
  );
}
