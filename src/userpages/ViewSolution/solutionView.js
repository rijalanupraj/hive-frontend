import { useEffect } from "react";
import { useParams } from "react-router-dom";

// @mui
import {
  Box,
  Card,
  Grid,
  Divider,
  Container,
  Typography,
  Avatar,
  Stack,
  Chip,
  CardHeader,
  Link
} from "@mui/material";

// components
import Page from "../../components/Page";
import Markdown from "../../components/Markdown";
// sections
import {
  QuestionSolutionHeader,
  QuestionSolutionComment,
  QuestionSolutionReview,
  SimilarSolutionsPost,
} from "../../sections/QuestionSolutions";
import Image from "../../components/Image";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------
import { viewSolution } from "../../redux/actions/viewSolutionActions";
import moment from "moment";
import EditDeleteButon from "./components/EditDeleteButton";

export default function SolutionView() {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const auth = useSelector((state) => state.auth);
  const { solutionId } = useParams();
  const solution = useSelector((state) => state.viewSolutions);

  useEffect(() => {
    dispatch(viewSolution(solutionId));
  }, []);

  if (!solution.solution) {
    return <div>Loading...</div>;
  }

  return (
    <Page title={solution?.solution?.question?.title}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12} order={{ xs: 2, md: 1 }}>
            {/* cover */}
            <QuestionSolutionHeader
              question={solution?.solution?.question}
              auth={auth}
            />
            {/* end cover */}

            {/* start solution */}
            <Card sx={{ mt: 3 }}>
              <Box sx={{ p: { xs: 2, md: 4 }, mb: 1 }}>
                
                  <CardHeader
                    disableTypography
                    avatar={
                      <Avatar
                        alt="experts"
                        src={solution?.solution?.user?.profilePhoto}
                        sx={{ width: 42, height: 42 }}
                      />
                    }
                    title={
                      <Link href="#" variant="subtitle2" color="text.primary">
                        {solution?.solution?.user?.username}
                      </Link>
                    }
                    subheader={
                      <Typography
                        variant="caption"
                        sx={{ display: "block", color: "text.secondary" }}
                      >
                        {moment(solution?.solution?.createdAt).fromNow()}
                      </Typography>
                    }
                    sx={{mt:-3, mb:3, ml:-3}}
                  />
                

                {/* start body description */}

                <Markdown
                  children={solution?.solution?.answer || ""}
                  align="justify"
                />
                {/* end body description */}

                <Stack direction="row" spacing={1} sx={{pt:1, pb:1}}>
                  {solution?.solution?.tags.map((tag) => (
                    <Chip
                      label={tag}
                      variant="outlined"
                      size="small"
                      clickable
                    />
                  ))}
                </Stack>

                {/* start upVote/downvote */}

                <Box sx={{ my: 5, mt: 1 }}>
                  <Divider sx={{ mb: -2 }} />

                  <QuestionSolutionReview />

                  <Divider sx={{ mb: -5, mt: -2 }} />
                </Box>

                {/* end upVote/downVote */}

                {/* start comment */}

                <Box sx={{ my: 3, mt: -2 }}>
                  <QuestionSolutionComment
                    solution={solution?.solution}
                    auth={auth}
                  />
                </Box>

                {/* end comment */}
              </Box>
            </Card>
            {/* end solution */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
