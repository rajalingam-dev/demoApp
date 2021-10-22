/** **************************** Import Types ****************************** */
import {
  CARRIER_MESSAGE_REQUEST,
  CARRIER_MESSAGE_SUCCESS,
  CARRIER_MESSAGE_FAILURE,
} from "../types/carrierType";
import { getCarrierMessages } from "../../api/list";
import "react-toastify/dist/ReactToastify.css";

export const CarrierMessagesRequest = () => ({
  type: CARRIER_MESSAGE_REQUEST,
});
export const CarrierMessagesSuccess = (users) => ({
  type: CARRIER_MESSAGE_SUCCESS,
  payload: users,
});
export const CarrierMessagesFailure = (error) => ({
  type: CARRIER_MESSAGE_FAILURE,
  payload: error,
});

export const GetCarrierMessageList = (params) => async function (dispatch) {
  dispatch(CarrierMessagesRequest());
  return getCarrierMessages({
    ...params,
  })
    .then((res) => {
      if (res.data) {
        dispatch(CarrierMessagesSuccess({ responseStatus: res }));
        return res;
      }

      dispatch(CarrierMessagesFailure(res.message));
      return res.message;
    })
    .catch((err) => console.log("Catch Error:", err));
};
