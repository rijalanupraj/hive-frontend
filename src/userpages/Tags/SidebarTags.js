import { capitalCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Tab,
  Box,
  Card,
  Tabs,
  Container,
  CardHeader,
  Stack,
  Divider,
  Button,
  Typography,
} from "@mui/material";
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
import ChipTag from "../../sections/tags/ChipTag";

import { getAllAvailableTags } from "../../redux/actions/tagActions";
import { Link } from "react-router-dom";
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SidebarTags() {
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
    // <Card>
    //   <CardHeader title="Tags" />

    // <Stack spacing={2} sx={{ p: 3, pr: 3 }} textAlign="justify">
    //   {/*  start first question */}
    //   <Stack direction="row" alignItems="center" spacing={1}>
    //     <Box sx={{ minWidth: 240 }}>
    //       <ChipTag
    //         tags={tagsList}
    //         findTags={findTags}
    //         onFindTags={handleFindTags}
    //       />
    //     </Box>
    //   </Stack>
    //   {/* end first question */}
    // </Stack>

    // <Divider />

    // <Box sx={{ p: 1, textAlign: "right" }}>
    //   <Button
    //     component={Link}
    //     to="/tags"
    //     size="small"
    //     endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
    //   >
    //     View all
    //   </Button>
    // </Box>
    // </Card>

    <>

        <Typography variant="h6" sx={{ mb: 2, ml: 3, mt: 2 }}>
          Related Tags
        </Typography>

        {/* {question?.tags.map((tag) => (
                  <Chip label={tag} variant="outlined" size="small" clickable />
                ))} */}

        {/* main body */}
        {tagsList.map((tag) => (
          <>
            <Button size="small" sx={{ mb: 2, ml: 3 }} style={{
              backgroundColor:"#a8b2bc",
              color:"#101014",
            }}>
              {tag}
            </Button>
            <Button disabled sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ ml: 1, mt: 0.5 }}>
                    x
                  </Typography>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    22
                  </Typography>
                </Button>
            <br />
            
          </>
        ))}
    </>
  );
}
