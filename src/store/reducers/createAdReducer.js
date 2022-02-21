import ActionType from "../constants/constants";

const INITIAL_STATE = {
  //USER AUTH
  isLoading: false,
  message: "",
};

const createAdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.USER_CREATEAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.LOADING_STOPS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_AD_UPLOAD_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_AD_UPLOAD_SUCCESS:
      return { ...state, isLoading: false, message: "Post Added Successfully" };
    case ActionType.USER_AD_UPDATING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.USER_AD_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_AD_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export { createAdReducer };
