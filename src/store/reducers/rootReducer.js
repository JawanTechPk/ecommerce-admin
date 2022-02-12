import { combineReducers } from "redux";
import {
  userLoginReducer,
  
} from "./AuthReducer";
import {settingReducer} from './settingReducer'
const rootReducer = combineReducers({
  userLoginReducer,
  settingReducer
});

export default rootReducer;
