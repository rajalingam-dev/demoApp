/** ****************************** Import libs *********************************** */
import { deleteDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const deleteUser = (id) => deleteDataApi(URL_CONSTANTS.users, id);

export const deleteOrganization = (id) => deleteDataApi(URL_CONSTANTS.organizations, id);

export const deleteCandidate = (id) => deleteDataApi(URL_CONSTANTS.candidates, id);

export const deleteJobPost = (id) => deleteDataApi(URL_CONSTANTS.jobpost, id);
export const deleteBlogCategoryPost = (id) => deleteDataApi(URL_CONSTANTS.category, id);
export const deleteBlogPost = (id) => deleteDataApi(URL_CONSTANTS.blogs, id);
