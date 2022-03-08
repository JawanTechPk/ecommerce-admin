import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../util/utils";
import ActionType from "../../constants/constants";

const userCreateAction = (userName, userPassword, userNumber) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.USER_CREATE_REQUEST,
    });
    const userObj = {
      user_name: userName,
      password: userPassword,
      phone_number: `+${userNumber}`,
    };
    axios
      .post(`${baseUrl}admin/createuser`, userObj)
      .then((response) => {
        if (response.data.code) {
          toast.error(response.data.reason || response.data.message);
          dispatch({
            type: ActionType.USER_CREATE_FAIL,
            payload: response.data,
          });
        } else {
          dispatch({
            type: ActionType.USER_CREATE_SUCCESS,
            payload: response.data,
          });
          toast.success(response.data.message);
       
        }
      })
      .catch((error) => {
        dispatch({
          type: ActionType.USER_CREATE_FAIL,
          payload: error.data,
        });
      });
  };
};

const emptyCreateUserMsgAction = () => {
  return (dispatch) => {
    dispatch({
      type: ActionType.USER_CREATE_EMPTY_MESSAGE,
    });
  };
};

export { userCreateAction, emptyCreateUserMsgAction };
