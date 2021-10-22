/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  SYSTEM_USERS_REQUEST,
  SYSTEM_USERS_SUCCESS,
  SYSTEM_USERS_FAILURE,
  CLEAR_SYSTEM_USERS_STATE,
} from "../types/systemUserType";
import { postUserData } from "../../api/create";
import { updateUserData } from "../../api/updates";
import { getUserList, getUserById } from "../../api/list";
import "react-toastify/dist/ReactToastify.css";

export const SystemUsersRequest = () => ({
  type: SYSTEM_USERS_REQUEST,
});
export const SystemUsersSuccess = (users) => ({
  type: SYSTEM_USERS_SUCCESS,
  payload: users,
});
export const SystemUsersFailure = (error) => ({
  type: SYSTEM_USERS_FAILURE,
  payload: error,
});
export const ClearSystemUsersStateSuccess = () => ({
  type: CLEAR_SYSTEM_USERS_STATE,
});

export const CreateSystemUser = (data) => async function (dispatch) {
  dispatch(SystemUsersRequest());
  return postUserData(data)
    .then((res) => {
      if (!res.code) {
        dispatch(SystemUsersSuccess({ responseStatus: "success" }));
        toast.success("User Created Successfully");
        return "success";
      }
      dispatch(SystemUsersFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};

export const UpdateSystemUser = (data, userId) => async function (dispatch) {
  dispatch(SystemUsersRequest());
  return updateUserData(data, userId)
    .then((res) => {
      if (!res.code && !res.error) {
        dispatch(SystemUsersSuccess({ responseStatus: "success" }));
        toast.success("User Updated Successfully");
        return "success";
      }
      dispatch(SystemUsersFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    }).catch((err) => console.log("Catch Error:", err));
};
export const GetSystemUser = (params) => async function (dispatch) {
  dispatch(SystemUsersRequest());
  return getUserList({
    ...params,
  })
    .then((res) => {
      if (res.results) {
        dispatch(SystemUsersSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(SystemUsersFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};

export const GetSystemUserById = (params) => async function (dispatch) {
  dispatch(SystemUsersRequest());
  return getUserById(params)
    .then((res) => {
      if (res.results) {
        dispatch(SystemUsersSuccess(res.results));
        return res;
      }

      dispatch(SystemUsersFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};

export const ClearSystemUsersState = (data, userId) => async function (dispatch) {
  dispatch(ClearSystemUsersStateSuccess());
};

