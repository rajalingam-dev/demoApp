/** **************************** Import Types ****************************** */
import {
    TESTIMONIAL_REQUEST,
    TESTIMONIAL_SUCCESS,
    TESTIMONIAL_FAILURE,

} from "../types/testimonialType";

const initialState = {
    loading: false,
    testimonialResponse: "",
    error: "",
};

const testimonialReducer = (state = initialState, action) => {
    console.log("form job post api reducer", action.payload);
    switch (action.type) {
        case TESTIMONIAL_REQUEST:
            return {
                ...state,
                loading: true,
                testimonialResponse: "",
            };
        case TESTIMONIAL_SUCCESS:
            return {
                loading: false,
                testimonialResponse: action.payload.responseStatus,
                error: "",
            };
        case TESTIMONIAL_FAILURE:
            return {
                loading: false,
                testimonialResponse: "error",
                error: action.payload,
            };

        default:
            return state;
    }
};

export default testimonialReducer;
