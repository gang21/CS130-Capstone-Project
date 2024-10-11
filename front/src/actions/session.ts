import { Credentials } from "@shared_types";
import { loginUser } from "../api";
import { setToken } from "../reducers/sessionSlice";

export const login = (credentials: Credentials) => async (dispatch: any) => {
  try {
    const token = await loginUser(credentials);
    dispatch(setToken(token));
    console.log(`Set token ${token}`);
    return token;
  } catch (error) {
    console.error("Login action failed", error);
    throw error;
  }
};
