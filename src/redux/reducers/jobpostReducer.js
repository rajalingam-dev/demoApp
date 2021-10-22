/** **************************** Import Types ****************************** */
import {
    JOBPOST_REQUEST,
    JOBPOST_SUCCESS,
    JOBPOST_FAILURE,

} from "../types/jobpostType";

const initialState = {
    loading: false,
    jobpostResponse: "",
    error: "",
};

const jobPostReducer = (state = initialState, action) => {
    console.log("form job post api reducer", action.payload);
    switch (action.type) {
        case JOBPOST_REQUEST:
            return {
                ...state,
                loading: true,
                jobpostResponse: "",
            };
        case JOBPOST_SUCCESS:
            return {
                loading: false,
                jobpostResponse: action.payload.responseStatus,
                error: "",
            };
        case JOBPOST_FAILURE:
            return {
                loading: false,
                jobpostResponse: "error",
                error: action.payload,
            };

        default:
            return state;
    }
};

export default jobPostReducer;
