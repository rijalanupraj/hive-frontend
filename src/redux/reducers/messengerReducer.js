// Internal Import
import * as TYPES from "../types";

const initialState = {
  friends: [],
  message: [],
  mesageSendSuccess: false,
  message_get_success: false,
  themeMood: "",
  new_user_add: ""
};

export default function messengerReducer(state = initialState, { type, payload }) {
  let index;
  switch (type) {
    case "THEME_GET_SUCCESS":
    case "THEME_SET_SUCCESS":
      return {
        ...state,
        themeMood: payload.theme
      };

    case TYPES.FRIEND_GET_SUCCESS:
      return {
        ...state,
        friends: payload.friends
      };

    case TYPES.MESSAGE_GET_SUCCESS:
      return {
        ...state,
        message_get_success: true,
        message: payload.message
      };

    case TYPES.MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        mesageSendSuccess: true,
        message: [...state.message, payload.message]
      };

    case TYPES.SOCKET_MESSAGE:
      return {
        ...state,
        message: [...state.message, payload.message]
      };

    case TYPES.UPDATE_FRIEND_MESSAGE:
      index = state.friends.findIndex(
        f =>
          f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[index].msgInfo = payload.msgInfo;

      return state;

    case TYPES.MESSAGE_SEND_SUCCESS_CLEAR:
      return {
        ...state,
        mesageSendSuccess: false
      };

    case TYPES.SEEN_MESSAGE:
      index = state.friends.findIndex(
        f =>
          f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[index].msgInfo.status = "seen";
      return {
        ...state
      };

    case TYPES.DELIVARED_MESSAGE:
      index = state.friends.findIndex(
        f =>
          f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[index].msgInfo.status = "delivared";
      return {
        ...state
      };

    case TYPES.UPDATE:
      index = state.friends.findIndex(f => f.fndInfo._id === payload.id);
      if (state.friends[index].msgInfo) {
        state.friends[index].msgInfo.status = "seen";
      }
      return {
        ...state
      };

    case TYPES.MESSAGE_GET_SUCCESS_CLEAR:
      return {
        ...state,
        message_get_success: false
      };

    case TYPES.SEEN_ALL:
      index = state.friends.findIndex(f => f.fndInfo._id === payload.reseverId);
      state.friends[index].msgInfo.status = "seen";
      return {
        ...state
      };

    case "LOGOUT_SUCCESS":
      return {
        ...state,
        friends: [],
        message: [],
        mesageSendSuccess: false,
        message_get_success: false
      };

    case "NEW_USER_ADD":
      return {
        ...state,
        new_user_add: payload.new_user_add
      };

    case "NEW_USER_ADD_CLEAR":
      return {
        ...state,
        new_user_add: ""
      };

    default:
      return state;
  }
}
