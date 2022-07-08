// Internal Import
import * as TYPES from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  me: null,
  error: null,
  appLoaded: false,
  notifications: [],
  // Feed
  feed: [],
  feedPageNumber: null,
  feedAllLoaded: false,
  feedScrollLoading: false,
  feedTotalPage: null,
};

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ME_LOADING:
      return {
        ...state,
        isLoading: true,
        appLoaded: false,
        error: null,
      };
    case TYPES.LOGIN_WITH_EMAIL_LOADING:
    case TYPES.LOGIN_WITH_OAUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TYPES.LOGIN_WITH_EMAIL_SUCCESS:
    case TYPES.LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        me: payload.me,
        error: null,
      };
    case TYPES.ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        me: payload.me,
        error: null,
        appLoaded: true,
      };

    case TYPES.VIEW_MY_FOLLOWINGS_LOADING:
      return {
        ...state,
        followingLoading: true,
      };

    case TYPES.VIEW_MY_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        followingLoading: false,
        me: {
          ...state.me,
          followingsObject: payload.followings,
        },
      };
    case TYPES.VIEW_MY_FOLLOWINGS_FAIL:
    case TYPES.ME_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        followingLoading: false,
        me: null,
        error: null,
        appLoaded: true,
      };
    case TYPES.FOLLOW_UNFOLLOW_ANY_USER_SUCCESS:
      const followingsArray = payload.mineFollowers.followings;
      console.log(followingsArray);
      return {
        ...state,
        me: {
          ...state.me,
          followings: followingsArray,
        },
      };

    case TYPES.TOGGLE_BOOKMARK_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          bookmarks: payload.me.bookmarks,
        },
      };
    case TYPES.TOGGLE_ANSWER_LATER_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          answerLater: payload.me.answerLater,
        },
      };

    case TYPES.GET_MY_FOLLOWERS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedFollowers: payload.followers,
        },
      };

    case TYPES.GET_MY_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedFollowings: payload.followings,
        },
      };

    case TYPES.GET_MY_BOOKMARKS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedBookmarks: payload.bookmarks,
        },
      };

    case TYPES.GET_MY_ANSWER_LATER_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedAnswerLater: payload.answerLater,
        },
      };

    case TYPES.DOWNVOTE_SOLUTION_ANY_SUCCESS:
      const solutionId = payload.solutionId;
      const downVote = payload.downVote;
      let updatedSolutionUpVote = [];
      let updatedSolutionDownVote = [];
      if (downVote) {
        updatedSolutionUpVote = state.me.solutionUpVotes.filter(
          (solution) => solution !== solutionId
        );
        updatedSolutionDownVote = [...state.me.solutionDownVotes, solutionId];
      } else {
        updatedSolutionDownVote = state.me.solutionDownVotes.filter(
          (solution) => solution !== solutionId
        );
      }
      return {
        ...state,
        me: {
          ...state.me,
          solutionUpVotes: updatedSolutionUpVote,
          solutionDownVotes: updatedSolutionDownVote,
        },
      };
    case TYPES.UPVOTE_SOLUTION_ANY_SUCCESS:
      const solutionIdUpVote = payload.solutionId;
      const upVote = payload.upVote;
      let updatedSolutionUpVote1 = [];
      let updatedSolutionDownVote1 = [];
      if (upVote) {
        updatedSolutionUpVote1 = [
          ...state.me.solutionUpVotes,
          solutionIdUpVote,
        ];
        updatedSolutionDownVote1 = state.me.solutionDownVotes.filter(
          (solution) => solution !== solutionIdUpVote
        );
      } else {
        updatedSolutionUpVote1 = state.me.solutionUpVotes.filter(
          (solution) => solution !== solutionIdUpVote
        );
      }
      return {
        ...state,
        me: {
          ...state.me,
          solutionUpVotes: updatedSolutionUpVote1,
          solutionDownVotes: updatedSolutionDownVote1,
        },
      };

    // Question Upvote & Downvote
    case TYPES.DOWNVOTE_QUESTION_ANY_SUCCESS:
      const questionId = payload.questionId;
      const downVoteQuestion = payload.downVote;
      let updatedQuestionUpvote = [];
      let updatedQuestionDownvote = [];
      if (downVoteQuestion) {
        updatedQuestionUpvote = state.me.questionUpVotes.filter(
          (question) => question !== questionId
        );
        updatedQuestionDownvote = [...state.me.questionDownVotes, questionId];
      } else {
        updatedQuestionDownvote = state.me.questionDownVotes.filter(
          (question) => question !== questionId
        );
      }
      return {
        ...state,
        me: {
          ...state.me,
          questionUpVotes: updatedQuestionUpvote,
          questionDownVotes: updatedQuestionDownvote,
        },
      };
    case TYPES.UPVOTE_QUESTION_ANY_SUCCESS:
      const questionIdUpvote = payload.questionId;
      const questionUpVote = payload.upVote;
      let updatedQuestionUpvote1 = [];
      let updatedQuestionDownvote1 = [];
      if (questionUpVote) {
        updatedQuestionUpvote1 = [
          ...state.me.questionUpVotes,
          questionIdUpvote,
        ];
        updatedQuestionDownvote1 = state.me.solutionDownVotes.filter(
          (solution) => solution !== questionIdUpvote
        );
      } else {
        updatedQuestionUpvote1 = state.me.questionUpVotes.filter(
          (solution) => solution !== questionIdUpvote
        );
      }
      return {
        ...state,
        me: {
          ...state.me,
          questionUpVotes: updatedQuestionUpvote1,
          questionDownVotes: updatedQuestionDownvote1,
        },
      };

    case TYPES.CHOOSE_INTERESTED_CATEGORY_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          interestedCategories: payload.user.interestedCategories,
        },
      };

    case TYPES.GET_PERSONAL_FEED_LOADING:
      return {
        ...state,
        feedScrollLoading: true,
      };

    case TYPES.GET_PERSONAL_FEED_SUCCESS:
      let newFeed;
      if (payload.page === 1) {
        newFeed = payload.feed;
      } else {
        newFeed = [...state.feed, ...payload.feed];
      }
      return {
        ...state,
        feed: newFeed,
        error: null,
        feedScrollLoading: false,
        feedTotalPage: payload.pages,
        feedPageNumber: payload.page,
        feedAllLoaded: payload.pages === payload.page,
      };

    //==============================================Notifications====================================================

    case TYPES.GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
      };

    case TYPES.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
      };

    //==============================================Notifications Ends====================================================

    case TYPES.LOGOUT_SUCCESS:
    case TYPES.LOGIN_WITH_EMAIL_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        me: null,
        isAuthenticated: false,
        isLoading: false,
        error: payload.error ? payload.error : null,
      };
    default:
      return state;
  }
}
