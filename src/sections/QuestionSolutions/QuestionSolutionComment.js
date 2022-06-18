import { useRef, useState } from "react";
import * as Yup from "yup";

// @mui
import {
  Box,
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Avatar,
  Link,
  Paper,
} from "@mui/material";
// routes

import MyAvatar from "../../components/MyAvatar";
import EmojiPicker from "../../components/EmojiPicker";
import Iconify from "../../components/Iconify";
import useSettings from "../../hooks/useSettings";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import { addComment } from "../../redux/actions/viewSolutionActions";
import moment from "moment";
import UpdateSolutionCommentSection from "../../userpages/ViewSolution/components/UpdateComment.Section";

export default function QuestionSolutionComment({ solution }) {
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

  const { themeStretch } = useSettings();

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");
  return (
    <Box sx={{ py: 3 }}>
      {/* write comment */}
      <FormikProvider value={formik}>
        <Form>
          <Stack direction="row" alignItems="center">
            <MyAvatar />

            <TextField
              fullWidth
              size="small"
              value={message}
              inputRef={commentInputRef}
              placeholder="Write a comment…"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <Iconify
                        icon={"ic:round-add-photo-alternate"}
                        width={24}
                        height={24}
                      />
                    </IconButton>
                    <EmojiPicker />
                  </InputAdornment>
                ),
              }}
              sx={{
                ml: 2,
                mr: 1,
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: (theme) =>
                    `${theme.palette.grey[500_32]} !important`,
                },
              }}
              {...formik.getFieldProps("text")}
              helperText={formik.touched.text && formik.errors.text}
              error={formik.touched.text && !!formik.errors.text}
            />
            <IconButton type="submit">
              <Iconify icon={"ic:round-send"} width={24} height={24} />
            </IconButton>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} />
          </Stack>
        </Form>
      </FormikProvider>

      {/* read Comment 1 */}
      <Stack spacing={1.5}>
        {solution.comments.map((comment) => (
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Avatar alt="profile" src={user.profileImage} />
            <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="subtitle2">
                  {/* {comment.author.name} */} {comment.user.username}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {moment(comment.createdAt).fromNow()}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {/* {comment.message} */}
                {comment.text}
              </Typography>
              {auth.me._id === comment.user._id && (
                <UpdateSolutionCommentSection
                  comment={comment}
                  solutionId={solution._id}
                />
              )}
            </Paper>
          </Stack>
        ))}
      </Stack>

      {/* view more comment */}
      <Stack direction="row" alignItems="center" sx={{ mt: 3, ml: 3 }}>
        <FormControlLabel
          control={
            <Link href="/" sx={{ color: "text.secondary" }}>
              View more comments
            </Link>
          }
        />
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel
          control={
            <Typography href="/" sx={{ color: "text.secondary" }}>
              2 of 5
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
}
