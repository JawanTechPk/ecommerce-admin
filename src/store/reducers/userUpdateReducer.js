import ActionType from "../constants/constants";

const INITIAL_STATE = {
  userUpdateData: {},
  userUpdateMessage: "",
  userUpdateError: "",
  userUpdateLoading: false,
};

const userUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.USER_UPDATE_REQUEST:
      return {
        ...state,
        userUpdateLoading: true,
      };
    case ActionType.USER_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateData: action.payload,
        userUpdateMessage: action.payload.message,
      };
    case ActionType.USER_UPDATE_FAIL:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateData: null,
        userUpdateMessage: action.payload.message,
        getChatsError: action.payload.message,
      };

    case ActionType.USER_UPDATE_EMPTY_MESSAGE:
      return {
        ...state,
        userUpdateMessage: "",
        userUpdateError: "",
      };

    default:
      return state;
  }
};

export { userUpdateReducer };
