import { combineReducers } from "redux";
import { userLoginReducer } from "./AuthReducer";
import { settingReducer } from "./settingReducer";
import { createAdReducer } from "./createAdReducer";
import { userUpdateReducer } from "./userUpdateReducer";
import { createUserReducer } from "./createUserReducer";
const rootReducer = combineReducers({
  userLoginReducer,
  settingReducer,
  createAdReducer,
  userUpdateReducer,
  createUserReducer,
});

export default rootReducer;
