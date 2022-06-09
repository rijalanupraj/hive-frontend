import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Stack,
  TextField,
  Typography,
  Grid,
  Avatar,
  Paper,
  CardHeader,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import moment from "moment";

import CardContent from "@mui/material/CardContent";

// Internal Import
import { addComment } from "../../../redux/actions/viewSolutionActions";
import UpdateSolutionCommentSection from "./UpdateComment.Section";
import { styled } from "@mui/system";

const CommentSection = ({ solution }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const commentSchema = Yup.object().shape({
    text: Yup.string()
      .required("Comment is required")
      .min(10, "Comment must be at least 10 characters long")
      .max(1000, "Comment must be less than 1000 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addComment(solution._id, values));
      formik.resetForm();
    },
  });

  const { text } = formik.values;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,

    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Grid
      item
      sx={{
        justifyContent: "flex",
      }}
    >
      {/* View Comment */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold" }}
        component="div"
        gutterBottom
      >
        Comments ({solution.comments.length})
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          sx={{
            width: "1",
          }}
        >
          <Item style={{ border: "none", boxShadow: "none" }}>
            <Divider sx={{ width: "10px" }} variant="middle" />

            {solution.comments.map((comment) => (
              <Card
                sx={{
                  color: "#001E3C",

                  width: "1",
                  mt: 2,
                }}
                style={{ border: "none", boxShadow: "none" }}
              >
                <CardContent>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Profile Photo" src={user.profileImage} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {/* {comment.user} */}
                        {comment.user}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.text}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {moment(comment.createdAt).fromNow()}
                      </p>

                      {auth.me._id === comment.user && (
                        <UpdateSolutionCommentSection />
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Item>
        </Grid>
      </Grid>

      {/* View Comment Ends */}

      <Stack spacing={3}>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                name="text"
                placeholder="Write your comment here."
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                rowsMax={4}
                sx={{
                  mb: 3,
                  "& > *": {
                    width: "100%",
                  },
                }}
                {...formik.getFieldProps("text")}
                helperText={formik.touched.text && formik.errors.text}
                error={formik.touched.text && !!formik.errors.text}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mb: 3,
                  "& > *": {
                    width: "100%",
                  },
                }}
              >
                Post
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Stack>
    </Grid>
  );
};

export default CommentSection;
