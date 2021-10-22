/** **************************** Import Types ****************************** */
import {
    BLOGPOST_SUCCESS,
    BLOGPOST_FAILURE,
    BLOGPOST_REQUEST,
} from "../types/blogPostType";

const initialState = {
    loading: false,
    blogpostResponse: "",
    error: "",
};

const blogPostReducer = (state = initialState, action) => {
    console.log("form blog post api reducer", action.payload);
    switch (action.type) {
        case BLOGPOST_REQUEST:
            return {
                ...state,
                loading: true,
                blogpostResponse: "",
            };
        case BLOGPOST_SUCCESS:
            return {
                loading: false,
                blogpostResponse: action.payload.responseStatus,
                error: "",
            };
        case BLOGPOST_FAILURE:
            return {
                loading: false,
                blogpostResponse: "error",
                error: action.payload,
            };

        default:
            return state;
    }
};

export default blogPostReducer;
