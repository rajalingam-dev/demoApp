/** ****************************** Import libs *********************************** */
import { getListByApi, viewDataByApi, downloadApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const getUserList = (params) => getListByApi(URL_CONSTANTS.users, params);

export const getUserById = (dataId) => viewDataByApi(URL_CONSTANTS.users, dataId);

export const getAllOrganizations = (params) => getListByApi(URL_CONSTANTS.organizations, params);

export const getOrganizationById = (dataId) => viewDataByApi(URL_CONSTANTS.organizations, dataId);

export const getUserProfile = (params) => getListByApi(URL_CONSTANTS.userProfile, params);

export const getUserProfileById = (dataId) => viewDataByApi(URL_CONSTANTS.userProfile, dataId);

export const getWorkInfo = (params) => getListByApi(URL_CONSTANTS.workInfo, params);

export const getWorkInfoById = (dataId) => viewDataByApi(URL_CONSTANTS.workInfo, dataId);

export const getTeamInfo = (params) => getListByApi(URL_CONSTANTS.teamInfo, params);

export const getTeamInfoById = (dataId) => getListByApi(URL_CONSTANTS.teamInfo, dataId);

export const getRolesAndAccessData = (params) => getListByApi(URL_CONSTANTS.rolesAndAccess, params);

export const getUserRoles = (params) => getListByApi(URL_CONSTANTS.settings, params);

export const getEmployeeDirectoryUserById = (dataId) => viewDataByApi(URL_CONSTANTS.userProfile, dataId);

export const getAllCandidates = (params) => getListByApi(URL_CONSTANTS.candidates, params);

export const getCandidateById = (dataId) => viewDataByApi(URL_CONSTANTS.candidates, dataId);

export const getCandidateTemporaryAccess = (params) => getListByApi(URL_CONSTANTS.temporaryAccess, params);

export const getTasks = (params) => getListByApi(URL_CONSTANTS.tasks, params);

export const getOnboardingStatus = (params) => getListByApi(URL_CONSTANTS.onboardingStatus, params);

export const getOfferLetter = (params) => getListByApi(URL_CONSTANTS.viewOfferLetter, params);

export const downloadOfferLetter = (dataId) => downloadApi(URL_CONSTANTS.viewOfferLetter, dataId);


export const getContactMessages = (params) => getListByApi(URL_CONSTANTS.contact, params);

export const getCarrierMessages = (params) => getListByApi(URL_CONSTANTS.carrier, params);

export const getJobPostList = (params) => getListByApi(URL_CONSTANTS.jobpost, params);

export const getJobPostById = (dataId) => viewDataByApi(URL_CONSTANTS.jobpost, dataId);

export const getTestimonialList = (params) => getListByApi(URL_CONSTANTS.testimonial, params);

export const getTestimonialById = (dataId) => viewDataByApi(URL_CONSTANTS.testimonial, dataId);

export const getcategoryList = (params) => getListByApi(URL_CONSTANTS.category, params);

export const getblogList = (params) => getListByApi(URL_CONSTANTS.blogs, params);

export const getblogListById = (dataId) => getListByApi(URL_CONSTANTS.blogs, dataId);

export const getblogSettingList = (params) => getListByApi(URL_CONSTANTS.category, params);
