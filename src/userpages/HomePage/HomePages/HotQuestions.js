import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// @mui
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Skeleton,
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
// _mock_
import { _analyticPost } from "../../../_mock";
// components
import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import { BACKEND_API_URL } from "../../../constants";
import axios from "axios";

// ----------------------------------------------------------------------

export default function HotQuestions() {
  const [hotQuestions, setHotQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`${BACKEND_API_URL}/question/hot`);
      if (res.data.success) {
        setHotQuestions(res.data.questions);
        setLoading(false);
      } else {
        setHotQuestions([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader title="Hot Questions" />

      <Stack spacing={2} sx={{ p: 3, pr: 3 }} textAlign="justify">
        {/*  start first question */}
        {loading ? (
          <>
            <Skeleton variant="rect" animation="wave" height={40} />
            <Skeleton variant="rect" animation="wave" height={40} />
            <Skeleton variant="rect" animation="wave" height={40} />
          </>
        ) : (
          hotQuestions.map((question) => {
            return (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                key={question._id}
              >
                <Box sx={{ minWidth: 240 }}>
                  <Link
                    to={`/question/${question.slug}`}
                    color="inherit"
                    component={RouterLink}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {question.title}
                    </Typography>
                  </Link>
                </Box>
              </Stack>
            );
          })
        )}

        {/* end foutrh question */}
      </Stack>

      <Divider />

      <Box sx={{ p: 1, textAlign: "right" }}>
        <Button
          onClick={() => {
            navigate("/questions");
          }}
          size="small"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
