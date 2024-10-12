import { Credentials } from "@shared_types";
import { loginUser } from "../api";
import { setToken } from "../reducers/sessionSlice";

export const login = (credentials: Credentials) => async (dispatch: any) => {
  try {
    const token = await loginUser(credentials);
    dispatch(setToken(token));
    console.log(`Set token ${token}`); // undefined for now
    return token;
  } catch (error) {
    console.error("Login action failed", error);
    throw error;
  }
};

export const signup = (credentials: Credentials) => async (dispatch: any) => {
  try {
    console.log("in signup");
    // const newUser = await signupUser(values)
    // // await loginUser(credentials);
    // dispatch(setToken(token));
    // console.log(`Set token ${token}`);
    // return token;
  } catch (error) {
    console.error("Login action failed", error);
    throw error;
  }
};
