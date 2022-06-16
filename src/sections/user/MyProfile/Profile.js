import PropTypes from "prop-types";
// @mui
import { Grid, Stack } from "@mui/material";
//
import ProfileAbout from "./ProfileAbout";
import ProfilePostCard from "./ProfilePostCard";
import ProfilePostInput from "./ProfilePostInput";
import ProfileFollowInfo from "./ProfileFollowInfo";
import ProfileSocialInfo from "./ProfileSocialInfo";
import SolutionPostCard from "../../cards/SolutionPostCard";
import QuestionPostCard from "../../cards/QuestionPostCard";
import ProfileContribution from "./ProfileContribution";

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile, posts, profile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileContribution profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {/* <ProfilePostInput /> */}
          {posts.map((post) => {
            if (post.answer) {
              return <SolutionPostCard key={post._id} solution={post} />;
            } else if (post.title) {
              return <QuestionPostCard key={post._id} question={post} />;
            }
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
