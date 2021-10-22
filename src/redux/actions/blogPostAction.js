/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  BLOGPOST_SUCCESS,
  BLOGPOST_FAILURE,
  BLOGPOST_REQUEST,
  BLOGPOSTSETTING_SUCCESS,
  BLOGPOSTSETTING_FAILURE,
  BLOGPOSTSETTING_REQUEST,
} from "../types/blogPostType";
import { postblog, postblogSetting } from "../../api/create";
import { updateBlogPostData } from "../../api/updates";
import { getblogList, getblogListById, getblogSettingList } from "../../api/list";
import "react-toastify/dist/ReactToastify.css";

export const blogPostRequest = () => ({
  type: BLOGPOST_REQUEST,
});
export const blogPostSuccess = (users) => ({
  type: BLOGPOST_SUCCESS,
  payload: users,
});
export const blogPostFailure = (error) => ({
  type: BLOGPOST_FAILURE,
  payload: error,
});
export const blogPostSettingRequest = () => ({
  type: BLOGPOSTSETTING_REQUEST,
});
export const blogPostSettingSuccess = (users) => ({
  type: BLOGPOSTSETTING_SUCCESS,
  payload: users,
});
export const blogPostSettingFailure = (error) => ({
  type: BLOGPOSTSETTING_FAILURE,
  payload: error,
});


export const CreateBlogPost = (data) => async function (dispatch) {
  dispatch(blogPostRequest());
  return postblog(data)
    .then((res) => {
      if (!res.code) {
        dispatch(blogPostSuccess({ responseStatus: "success" }));
        toast.success("Blog Post created successfully");
        return "success";
      }
      dispatch(blogPostFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};
// blog post setting 
export const CreateBlogPostSetting = (data) => async function (dispatch) {
  dispatch(blogPostSettingRequest());
  return postblogSetting(data)
    .then((res) => {
      if (!res.code) {
        dispatch(blogPostSettingSuccess({ responseStatus: "success" }));
        toast.success("Blog Setting Added Successfully");
        return "success";
      }
      dispatch(blogPostFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};
export const UpdateblogPost = (data, userId) => async function (dispatch) {
  dispatch(blogPostRequest());
  return updateBlogPostData(data, userId)
    .then((res) => {
      if (!res.code && !res.error) {
        dispatch(blogPostSuccess({ responseStatus: "success" }));
        toast.success("User Updated Successfully");
        return "success";
      }
      dispatch(blogPostFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    }).catch((err) => console.log("Catch Error:", err));
};
export const GetblogPostList = (params) => async function (dispatch) {
  dispatch(blogPostRequest());
  return getblogList({
    ...params,
  })
    .then((res) => {
      console.log("res111 blogaction", res.data);

      if (res.data) {
        console.log("res.results blogaction", res.results);
        dispatch(blogPostSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(blogPostFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};
// blog post setting 
export const GetblogPostSettingList = (params) => async function (dispatch) {
  dispatch(blogPostSettingRequest());
  return getblogSettingList({
    ...params,
  })
    .then((res) => {
      console.log("res111 blogaction", res.data);

      if (res.data) {
        console.log("res.results blogaction", res.results);
        dispatch(blogPostSettingSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(blogPostSettingFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};
export const GetblogPostById = (params) => async function (dispatch) {
  dispatch(blogPostRequest());
  return getblogListById(params)
    .then((res) => {
      if (res.data) {
        dispatch(blogPostSuccess(res.data));
        return res;
      }

      dispatch(blogPostFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};


