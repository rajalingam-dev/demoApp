/** **************************** Import Types ****************************** */
import {
  CARRIER_MESSAGE_REQUEST,
  CARRIER_MESSAGE_SUCCESS,
  CARRIER_MESSAGE_FAILURE,
} from "../types/carrierType";

const initialState = {
  loading: false,
  storeCarrierMessageResponse: "",
  error: "",
};

const CarrierMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARRIER_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        storeCarrierMessageResponse: "",
      };
    case CARRIER_MESSAGE_SUCCESS:
      return {
        loading: false,
        storeCarrierMessageResponse: action.payload.responseStatus,
        error: "",
      };
    case CARRIER_MESSAGE_FAILURE:
      return {
        loading: false,
        storeCarrierMessageResponse: "error",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CarrierMessageReducer;
