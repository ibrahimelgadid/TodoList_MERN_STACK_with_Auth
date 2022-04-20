import axios from "axios";
import { toast } from "react-toastify";
import { setAuthToken } from "../../utitlis/authTokenToHeader";
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from "./actionsTypes";
import jwtDecode from "jwt-decode";

//---------------------------------------------|
//           POST REGISTER USER
//---------------------------------------------|
export const registerFun = (userData, navigate) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("auth/register", userData)
    .then(() => {
      navigate("/login");
      toast.success("You have registerd, Please login now");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//---------------------------------------------|
//           POST LOGIN USER
//---------------------------------------------|
export const loginFun = (userData, navigate) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("auth/login", userData)
    .then((result) => {
      let token = result;
      localStorage.setItem("userInfo", `Bearer ${token.data.token}`);
      setAuthToken(token.data.token);
      const decoded = jwtDecode(token.data.token);
      dispatch(setCurrentUser(decoded));

      toast.success("You have logged in");
      navigate("/");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//---------------------------------------------|
//           POST LOGOUT USER
//---------------------------------------------|
export const logOutFun = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

//---------------------------------------------|
//           SET CURRENT USER
//---------------------------------------------|
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//---------------------------------------------|
//           GET ERRORS
//---------------------------------------------|
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
