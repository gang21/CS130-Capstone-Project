import { combineReducers } from "redux";

import users from "./users";
import sessionSlice from "./sessionSlice";

export default combineReducers({ users, session: sessionSlice });
