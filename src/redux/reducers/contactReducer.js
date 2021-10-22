/** **************************** Import Types ****************************** */
import {
  CONTACT_MESSAGE_REQUEST,
  CONTACT_MESSAGE_SUCCESS,
  CONTACT_MESSAGE_FAILURE,
} from "../types/contactType";

const initialState = {
  loading: false,
  storeContactMessageResponse: "",
  error: "",
};

const ContactMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        storeContactMessageResponse: "",
      };
    case CONTACT_MESSAGE_SUCCESS:
      return {
        loading: false,
        storeContactMessageResponse: action.payload.responseStatus,
        error: "",
      };
    case CONTACT_MESSAGE_FAILURE:
      return {
        loading: false,
        storeContactMessageResponse: "error",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ContactMessageReducer;
