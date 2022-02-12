import ActionType from "../constants/constants";

const INITIAL_STATE = {
  //USER AUTH
  isLoading: false,
  isUserLoggedin: false,
  user: {},
  credentialClear:false,
  
};



const userLoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        credentialClear:true
      };
    case ActionType.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case ActionType.USER_LOGIN_EMPTY_MESSAGE:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_LOGIN_CRED_INVALID:
      return {
        ...state,
        isLoading: false,
      }
      case ActionType.USER_LOGOUT_FAIL:
        return{
          ...state,
          isLoading:false
        }
        case ActionType.GET_USER_DATA:
          return{
            ...state,
            user:action.payload,

          }
          case ActionType.USER_LOGOUT_START:
            return {
              ...state,
              isLoading:true
            }
          case ActionType.USER_LOGOUT_SUCCESS:
            return {
              ...state,
              isLoading: false,
              user: {},
            } 
            case ActionType.USER_LOGOUT_FAIL:
              return {
                ...state,
                isLoading: false,
              } 
    default:
      return state;
  }
};




export {  userLoginReducer };
