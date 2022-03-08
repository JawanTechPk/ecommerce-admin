import ActionType from "../constants/constants";

const INITIAL_STATE = {
  userCreateData: {},
  userCreateMessage: "",
  userCreateError: "",
  userCreateLoading: false,
};

const createUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.USER_CREATE_REQUEST:
      return {
        ...state,
        userCreateLoading: true,
      };
    case ActionType.USER_CREATE_SUCCESS:
      return {
        ...state,
        userCreateLoading: false,
        userCreateData: action.payload,
        userCreateMessage: action.payload.message,
      };
    case ActionType.USER_CREATE_FAIL:
      return {
        ...state,
        userCreateLoading: false,
        userCreateData: null,
        userCreateMessage: action.payload.message,
        getChatsError: action.payload.message,
      };

    case ActionType.USER_CREATE_EMPTY_MESSAGE:
      return {
        ...state,
        userCreateMessage: "",
        userCreateError: "",
      };

    default:
      return state;
  }
};

export { createUserReducer };
