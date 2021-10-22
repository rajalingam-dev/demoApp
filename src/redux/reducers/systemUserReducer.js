/** **************************** Import Types ****************************** */
import {
  SYSTEM_USERS_REQUEST,
  SYSTEM_USERS_SUCCESS,
  SYSTEM_USERS_FAILURE,
  CLEAR_SYSTEM_USERS_STATE,
} from "../types/systemUserType";

const initialState = {
  loading: false,
  storeSystemUserResponse: "",
  error: "",
};

const createSystemUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeSystemUserResponse: "",
      };
    case SYSTEM_USERS_SUCCESS:
      return {
        loading: false,
        storeSystemUserResponse: action.payload.responseStatus,
        error: "",
      };
    case SYSTEM_USERS_FAILURE:
      return {
        loading: false,
        storeSystemUserResponse: "error",
        error: action.payload,
      };
    case CLEAR_SYSTEM_USERS_STATE:
      return {
        loading: false,
        storeSystemUserResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default createSystemUserReducer;
