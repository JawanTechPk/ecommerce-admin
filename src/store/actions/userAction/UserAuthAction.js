import ActionType from "../../constants/constants";
import { baseUrl } from '../../../util/utils';
import { toast } from 'react-toastify';
import axios from 'axios'



const getUserData = () => {
  return async (dispatch) => {
    let userData = await JSON.parse(localStorage.getItem('adminData'))
    dispatch({
      type: ActionType.GET_USER_DATA,
      payload: userData
    })
  }
}



const UserLoginAction = (phoneNumber, password, history) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.USER_LOGIN_REQUEST,
    });
    if (phoneNumber.trim() && password.trim()) {

      axios.post(`${baseUrl}login`, {
        phone_number: "+"+phoneNumber,
        password: password
      })
        .then((success) => {
          console.log(success,'success')
          if (success.data.code) {
            toast.error(success.data.reason || success.data.message)
            dispatch({
              type: ActionType.USER_LOGIN_FAIL,
            })
          } else {
            const userData = {
              userId: success.data._id,
              role: success.data.role
            };
            localStorage.setItem("adminData", JSON.stringify(userData));
            toast.success(success.data.message)
            dispatch({
              type: ActionType.USER_LOGIN_SUCCESS,
            })
            history.push('/home')
          }
        })
        .catch((err) => {
          toast.error("Invalid Credentials")
          dispatch({
            type: ActionType.USER_LOGIN_FAIL,
          })
        })


    }
    else {
      toast.error("Invalid Credentials")
      dispatch({
        type: ActionType.USER_LOGIN_CRED_INVALID,
        payload: "Invalid Credentials",
      });
    }

  };
};

const logoutUser = (history) => async (dispatch) => {
  dispatch({
    type: ActionType.USER_LOGOUT_START,
  })
  let userData = await JSON.parse(localStorage.getItem('adminData'));
  axios.post(`${baseUrl}logout`, {
    user_id: userData.userId,
  })
    .then((success) => {
      if (success.data.code) {
        toast.error(success.data.reason || success.data.message)
        dispatch({
          type: ActionType.USER_LOGOUT_FAIL,
        })
      } else {
        localStorage.removeItem("adminData");
        history.push('/')
        toast.success(success.data.message)
        dispatch({
          type: ActionType.USER_LOGOUT_SUCCESS,
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: ActionType.USER_LOGOUT_FAIL,
      })
    })

}


const UserLoginEmptyMsg = () => {
  return (dispatch) => {
    dispatch({
      type: ActionType.USER_LOGIN_EMPTY_MESSAGE,
    });
  };
};


export {
  UserLoginAction,
  UserLoginEmptyMsg,
  logoutUser,
  getUserData
};
