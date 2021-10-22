/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  LOGIN_USERS_REQUEST,
  LOGIN_USERS_SUCCESS,
  LOGIN_USERS_FAILURE,
} from "../types/loginTypes";
import { postLoginRequestData } from "../../api/create";
import "react-toastify/dist/ReactToastify.css";

export const LoginUsersRequest = () => ({
  type: LOGIN_USERS_REQUEST,
});
export const LoginUsersSuccess = (users) => ({
  type: LOGIN_USERS_SUCCESS,
  payload: users,
});
export const LoginUsersFailure = (error) => ({
  type: LOGIN_USERS_FAILURE,
  payload: error,
});

export const LoginUser = (data) => async function (dispatch) {
  dispatch(LoginUsersRequest());
  await postLoginRequestData(data)
    .then((res) => {
      if (!res.error) {
        const loggedUser = res.user;
        // const accessToken = res.tokens.access.token;
        // const refreshToken = res.tokens.refresh.token;
        // const accessExpiry = res.tokens.access.expires;
        // const refreshExpiry = res.tokens.refresh.expires;
        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        // localStorage.setItem("accessExpiry", accessExpiry);
        // localStorage.setItem("refreshExpiry", refreshExpiry);
         localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        dispatch(LoginUsersSuccess({ responseStatus: "success" }));
        toast.success("Logged in Successfully");
        setTimeout(() => {
          window.location.href = "/home/dashboard";
        }, 3000);
      } else {
        dispatch(LoginUsersFailure(res.error));
        toast.error(res.error);
      }
    })
    .catch((err) => console.log("Catch Error:", err));
};
