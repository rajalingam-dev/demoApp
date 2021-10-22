/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  TESTIMONIAL_SUCCESS,
  TESTIMONIAL_FAILURE,
  TESTIMONIAL_REQUEST,
} from "../types/testimonialType";
import { postTestimonialDetail } from "../../api/create";
import { updateUserData } from "../../api/updates";
import { getTestimonialList, getUserById } from "../../api/list";
import "react-toastify/dist/ReactToastify.css";

export const TestimonialRequest = () => ({
  type: TESTIMONIAL_REQUEST,
});
export const TestimonialSuccess = (users) => ({
  type: TESTIMONIAL_SUCCESS,
  payload: users,
});
export const TestimonialFailure = (error) => ({
  type: TESTIMONIAL_FAILURE,
  payload: error,
});


export const CreateTestimonial = (data) => async function (dispatch) {
  dispatch(TestimonialRequest());
  return postTestimonialDetail(data)
    .then((res) => {
      if (!res.code) {
        dispatch(TestimonialSuccess({ responseStatus: "success" }));
        toast.success("Job Post created successfully");
        return "success";
      }
      dispatch(TestimonialFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};

export const UpdateTestmonial = (data, userId) => async function (dispatch) {
  dispatch(TestimonialRequest());
  return updateUserData(data, userId)
    .then((res) => {
      if (!res.code && !res.error) {
        dispatch(TestimonialSuccess({ responseStatus: "success" }));
        toast.success("User Updated Successfully");
        return "success";
      }
      dispatch(TestimonialFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    }).catch((err) => console.log("Catch Error:", err));
};
export const GetTestimonialList = (params) => async function (dispatch) {
  dispatch(TestimonialRequest());
  return getTestimonialList({
    ...params,
  })
    .then((res) => {
      if (res.data) {
        console.log("res.results action", res.data);
        dispatch(TestimonialSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(TestimonialFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};

export const GetTestimonialById = (params) => async function (dispatch) {
  dispatch(TestimonialRequest());
  return getUserById(params)
    .then((res) => {
      if (res.results) {
        dispatch(TestimonialSuccess(res.results));
        return res;
      }

      dispatch(TestimonialFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};


