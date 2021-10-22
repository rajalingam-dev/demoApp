/** ****************************** Import libs *********************************** */
import { putDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const updateUserData = (params, id) => putDataApi(URL_CONSTANTS.users, params, id);

export const updateOrganizationData = (params, id) => putDataApi(URL_CONSTANTS.organizations, params, id);

export const updateUserProfileData = (params, id) => putDataApi(URL_CONSTANTS.userProfile, params, id);

export const updateWorkInfoData = (params, id) => putDataApi(URL_CONSTANTS.workInfo, params, id);

export const updateTeamInfoData = (params, id) => putDataApi(URL_CONSTANTS.teamInfo, params, id);

export const updateUserRoles = (params, id) => putDataApi(URL_CONSTANTS.settings, params, id);

export const updateRoleAndAccessData = (params, id) => putDataApi(URL_CONSTANTS.rolesAndAccess, params, id);

export const updateCandidateData = (params, id) => putDataApi(URL_CONSTANTS.candidates, params, id);

export const updateCandidateRoleData = (params, id, roleId, role, method) => putDataApi(URL_CONSTANTS.candidates, params, id, roleId, role, method);

export const updateTasksData = (params, id) => putDataApi(URL_CONSTANTS.tasks, params, id);

export const updateOnboardingStatusData = (params, id) => putDataApi(URL_CONSTANTS.onboardingStatus, params, id);

export const updateJobPostData = (params, id) => putDataApi(URL_CONSTANTS.jobpost, params, id);

export const updateBlogPostData = (params, id) => putDataApi(URL_CONSTANTS.blogs, params, id);


