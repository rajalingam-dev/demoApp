/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  JOBPOST_SUCCESS,
  JOBPOST_FAILURE,
  JOBPOST_REQUEST,
} from "../types/jobpostType";
import { postWorkDetail } from "../../api/create";
import { updateJobPostData } from "../../api/updates";
import { getJobPostList, getJobPostById } from "../../api/list";
import "react-toastify/dist/ReactToastify.css";

export const JobPostRequest = () => ({
  type: JOBPOST_REQUEST,
});
export const JobPostSuccess = (users) => ({
  type: JOBPOST_SUCCESS,
  payload: users,
});
export const JobPostFailure = (error) => ({
  type: JOBPOST_FAILURE,
  payload: error,
});


export const CreateJobPost = (data) => async function (dispatch) {
  dispatch(JobPostRequest());
  return postWorkDetail(data)
    .then((res) => {
      if (!res.code) {
        dispatch(JobPostSuccess({ responseStatus: "success" }));
        toast.success("Job Post created successfully");
        return "success";
      }
      dispatch(JobPostFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};

export const UpdateJobPost = (data, userId) => async function (dispatch) {
  dispatch(JobPostRequest());
  return updateJobPostData(data, userId)
    .then((res) => {
      if (!res.code && !res.error) {
        dispatch(JobPostSuccess({ responseStatus: "success" }));
        toast.success("User Updated Successfully");
        return "success";
      }
      dispatch(JobPostFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    }).catch((err) => console.log("Catch Error:", err));
};
export const GetJobPostList = (params) => async function (dispatch) {
  dispatch(JobPostRequest());
  return getJobPostList({
    ...params,
  })
    .then((res) => {
      if (res.data) {
        console.log("res.results action------------>", res.data);
        dispatch(JobPostSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(JobPostFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};

export const GetJobPostById = (params) => async function (dispatch) {
  dispatch(JobPostRequest());
  return getJobPostById(params)
    .then((res) => {
      if (res.results) {
        dispatch(JobPostSuccess(res.results));
        return res;
      }

      dispatch(JobPostFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};


