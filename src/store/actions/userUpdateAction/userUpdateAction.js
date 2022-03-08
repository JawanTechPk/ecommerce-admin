import axios from "axios";
import ActionType from "../../constants/constants";
import { baseUrl } from "../../../util/utils";
import { toast } from "react-toastify";

const userUpdateAction = (newNumber, newPassword, newUserName, userId) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.USER_UPDATE_REQUEST,
    });

    let userObj = {
      userId,
    };
    if (newNumber) {
      userObj.phone_number = `+${newNumber}`;
    }
    if (newPassword) {
      userObj.password = newPassword;
    }
    if (newUserName) {
      userObj.user_name = newUserName;
    }

    axios
      .post(`${baseUrl}admin/userupdate`, userObj)
      .then((response) => {
        if (response.data.code) {
          //   alert("error");
          toast.error(response.data.reason || response.data.message);
          dispatch({
            type: ActionType.USER_UPDATE_FAIL,
            payload: response.data,
          });
        } else {
          dispatch({
            type: ActionType.USER_UPDATE_SUCCESS,
            payload: response.data,
          });
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        dispatch({
          type: ActionType.USER_UPDATE_FAIL,
          payload: error.data,
        });
      });
  };
};

const emptyUserUpdateMsgAction = () => {
  return (dispatch) => {
    dispatch({
      type: ActionType.USER_UPDATE_EMPTY_MESSAGE,
    });
  };
};

export { userUpdateAction, emptyUserUpdateMsgAction };
