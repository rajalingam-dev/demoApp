/** ****************************** Import libs *********************************** */
import { postDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const postLoginRequestData = (params) => postDataApi(URL_CONSTANTS.login, params);

export const postLogoutRequestData = (params) => postDataApi(URL_CONSTANTS.logout, params);

export const postUserData = (params) => postDataApi(URL_CONSTANTS.users, params);

export const postOrganizationData = (params) => postDataApi(URL_CONSTANTS.organizations, params);

export const postUserProfileData = (params) => postDataApi(URL_CONSTANTS.userProfile, params);

export const postWorkInfoData = (params) => postDataApi(URL_CONSTANTS.workInfo, params);

export const postTeamInfoData = (params) => postDataApi(URL_CONSTANTS.teamInfo, params);

export const postRolesAndAccess = (params) => postDataApi(URL_CONSTANTS.rolesAndAccess, params);

export const postUserRoles = (params) => postDataApi(URL_CONSTANTS.settings, params);

export const postCandidateData = (params) => postDataApi(URL_CONSTANTS.candidates, params);

export const postTasks = (params) => postDataApi(URL_CONSTANTS.tasks, params);

export const postUserProfileImage = (params, id) => postDataApi(URL_CONSTANTS.uploadProfileImage, params, id);

export const postSignatureData = (params, id) => postDataApi(URL_CONSTANTS.signature, params, id);

export const postWorkDetail = (params) => postDataApi(URL_CONSTANTS.jobpost, params);

export const postTestimonialDetail = (params) => postDataApi(URL_CONSTANTS.testimonial, params);

export const postblog = (params) => postDataApi(URL_CONSTANTS.blogs, params);

export const postblogSetting = (params) => postDataApi(URL_CONSTANTS.category, params);
