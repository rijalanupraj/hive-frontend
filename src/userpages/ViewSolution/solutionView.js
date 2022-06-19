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
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} order={{ xs: 2, md: 1 }}>
            <Card>
              {/* cover */}
              <QuestionSolutionHeader que={solution?.solution?.question} />
              {/* end cover */}

              <Box sx={{ p: { xs: 3, md: 5 }, mb: 1 }}>
                <Box sx={{ my: 2, mt: -2 }}>
                  <Divider />
                  <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar
                      alt="experts"
                      src={solution?.solution?.user?.profilePhoto}
                      sx={{ width: 42, height: 42 }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">Answered By:</Typography>
                      <Typography variant="button">
                        {solution?.solution?.user?.username}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: "grey.500" }}
                      >
                        {moment(solution?.solution?.createdAt).fromNow()}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "auto" }}>
                      {auth.me.id === solution?.solution?.user?.id && (
                        <EditDeleteButon solution={solution} />
                      )}
                    </Box>
                  </Box>
                  <Divider />
                </Box>

                {/* start body description */}

                <Markdown children={solution?.solution?.answer || ""} />
                {/* end body description */}

                {/* start image */}
                <Image
                  alt="post media"
                  src="https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png"
                  ratio="16/9"
                  sx={{ borderRadius: 1, mt: 4 }}
                />
                {/* end image */}

                {/* start upVote/downvote */}

                <Box sx={{ my: 5 }}>
                  <Divider />

                  <QuestionSolutionReview />

                  <Divider />
                </Box>

                {/* end upVote/downVote */}

                {/* start comment */}

                <Box sx={{ my: 3 }}>
                  <QuestionSolutionComment solution={solution?.solution} />
                </Box>

                {/* end comment */}
              </Box>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            // sx={{ display: { xs: "none", xl: "block" } }}
            order={{ xs: 1, md: 1 }}
          >
            <SimilarSolutionsPost />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
