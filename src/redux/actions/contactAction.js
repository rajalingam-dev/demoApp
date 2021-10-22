/** **************************** Import Types ****************************** */
import {
  CONTACT_MESSAGE_REQUEST,
  CONTACT_MESSAGE_SUCCESS,
  CONTACT_MESSAGE_FAILURE,
} from "../types/contactType";
import { getContactMessages } from "../../api/list";
import "react-toastify/dist/ReactToastify.css";

export const ContactMessagesRequest = () => ({
  type: CONTACT_MESSAGE_REQUEST,
});
export const ContactMessagesSuccess = (users) => ({
  type: CONTACT_MESSAGE_SUCCESS,
  payload: users,
});
export const ContactMessagesFailure = (error) => ({
  type: CONTACT_MESSAGE_FAILURE,
  payload: error,
});

export const GetContactMessageList = (params) => async function (dispatch) {
  dispatch(ContactMessagesRequest());
  return getContactMessages({
    ...params,
  })
    .then((res) => {
      if (res.data) {
        dispatch(ContactMessagesSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(ContactMessagesFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};
