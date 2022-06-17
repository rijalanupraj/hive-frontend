// Internal Import
import * as TYPES from "../types";

const initialState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
  message_get_success: false,
  themeMood: "",
  new_user_add: ""
};

export default function messengerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.MESSENGER_GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload.friends
      };

    case TYPES.MESSENGER_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        message: [...state.message, payload.message],
        messageSendSuccess: true
      };

    case TYPES.MESSENGER_GET_MESSAGES_SUCCESS:
      return {
        ...state,
        message: payload.message
      };

    default:
      return state;
  }
}
