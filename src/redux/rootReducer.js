/** **************************** Import Libs ****************************** */
import { combineReducers } from "redux";

/** **************************** Import Reducers ****************************** */
import { changeStateReducer } from "./reducers/changeStateReducer";
import loginReducer from "./reducers/loginReducer";
import SystemUserReducer from "./reducers/systemUserReducer";
import sidebarMinimizerReducer from "./reducers/sidebarMinimizerReducer";
import contactMessageReducer from "./reducers/contactReducer";
import carrierMessageReducer from "./reducers/carrierReducer";
import jobPostReducer from "./reducers/jobpostReducer";
import testimonialReducer from "./reducers/testimonialReducer";
import blogPostReducer from "./reducers/blogpostReducer";

const rootReducer = combineReducers({
  changeStateReducer,
  login: loginReducer,
  SystemUser: SystemUserReducer,
  sidebarMinimizer: sidebarMinimizerReducer,
  contactMessage: contactMessageReducer,
  carrierMessage: carrierMessageReducer,
  jobPost: jobPostReducer,
  testimonial: testimonialReducer,
  blogPost: blogPostReducer
});

export default rootReducer;
