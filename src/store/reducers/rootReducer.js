import { combineReducers } from "redux";
import {
  userLoginReducer,
  
} from "./AuthReducer";
import {settingReducer} from './settingReducer'
import {createAdReducer} from './createAdReducer'
const rootReducer = combineReducers({
  userLoginReducer,
  settingReducer,
  createAdReducer
});

export default rootReducer;
