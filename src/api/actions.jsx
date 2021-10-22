/* eslint-disable */
/** ********************************* Import URL ************************************* */
import { hostConfig } from "../config"; // env
import { URL_CONSTANTS } from "./urls";

/** ****************************** Response Handler *********************************** */

const token = localStorage.getItem("accessToken");
const reLogin = () => {
  if (!localStorage.getItem("loggedUser")) {
    return { error: "Invalid emaiId or password" };
  } else if (localStorage.getItem("accessExpiry")) {
    const accessExipryTime = new Date(localStorage.getItem("accessExipry"));
    const currentDate = new Date();
    if (accessExipryTime < currentDate) {
      const refreshToken = localStorage.getItem("refreshToken");
      const params = { refreshToken: refreshToken };
      return fetch(`${hostConfig.API_URL}${URL_CONSTANTS.refreshToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          return response;
        })
        .then(async (resp) => {
          const res = await resp.json();
          const accessToken = res.access.token;
          const refreshToken = res.refresh.token;
          const accessExpiry = res.access.expires;
          const refreshExpiry = res.refresh.expires;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("accessExpiry", accessExpiry);
          localStorage.setItem("refreshExpiry", refreshExpiry);
          window.location.reload();
        })
        .catch((err) => {
          errorHandler(err);
        });
    }
  } else {
    localStorage.clear();
    window.location.href = "/";
  }
};
const responseStatusHandler = (response) => {
  switch (response.status) {
    case 400:
      return response;
    case 401:
      return reLogin();
    // return false;
    case 402:
      return { error: "Payment Required" };
    case 403:
      return { error: "Forbidden" };
    case 404:
      return { error: "Not Found" };
    case 405:
      return { error: "Method Not Allowed" };
    case 406:
      return { error: "Not Acceptable" };
    case 408:
      return { error: "Request Timeout" };
    case 409:
      return { error: "Request Already Exist" };
    case 410:
      return { error: "permanently deleted from server" };
    case 500:
      return { error: "Internal Server Error" };
    case 501:
      return { error: "Not Implemented" };
    case 502:
      return { error: "Bad Gateway" };
    case 503:
      return { error: "Service Unavailable" };
    case 504:
      return { error: " Gateway Timeout" };
    case 511:
      return { error: " Network Authentication Required" };
    case 200:
    case 201:
      return response;
    default:
      return response;
  }
};

/** ****************************** Error Handler *********************************** */
const errorHandler = (error) => error;

/** ****************************** Create Api *********************************** */
export const postDataApi = (requestUrl, params) =>
  fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "POST",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return responseStatusHandler(response);
    })
    .then((result) =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result
    )
    .catch((err) => {
      errorHandler(err);
    });

/** ****************************** View with query Api *********************************** */
export const getListByApi = (requestUrl, params) => {
  let getParams = "?";
  if (
    params &&
    params.rowsPerPage &&
    params.rowsPerPage !== null &&
    params.rowsPerPage !== undefined
  ) {
    getParams += `limit=${params.rowsPerPage}`;
  }
  if (params && params.assignTo) {
    getParams += `assignTo=${params.assignTo}`;
  }
  if (params && params.taskType) {
    getParams += `taskType=${params.taskType}`;
  }
  if (params && params.candidateId) {
    getParams += `candidateId=${params.candidateId}`;
  }
  if (
    params &&
    params.token &&
    params.token !== null &&
    params.token !== undefined
  ) {
    getParams += `token=${params.token}`;
  }

  if (
    params &&
    params.currentPage &&
    params.currentPage !== null &&
    params.currentPage !== undefined
  ) {
    getParams += `&page=${params.currentPage}`;
  }

  if (
    params &&
    params.organizationName !== null &&
    params.organizationName !== undefined
  ) {
    getParams += `&organizationName=${params.organizationName}`;
  }

  if (
    params &&
    params.sortBy &&
    params.sortBy !== null &&
    params.sortBy !== undefined
  ) {
    getParams += `&sortBy=${params.sortBy}`;
  }

  if (
    params &&
    params.userId &&
    params.userId !== null &&
    params.userId !== undefined
  ) {
    getParams += `&userId=${params.userId}`;
  }

  if (
    params &&
    params.orgId &&
    params.orgId !== null &&
    params.orgId !== undefined
  ) {
    getParams += `&orgId=${params.orgId}`;
  }

  if (
    params &&
    params.isActive !== null &&
    params.isActive !== "" &&
    params.isActive !== undefined
  ) {
    getParams += `&isActive=${params.isActive}`;
  }

  if (params && params.role !== null && params.role !== undefined) {
    getParams += `&role=${params.role}`;
  }

  if (
    params &&
    params.search &&
    params.search !== null &&
    params.search !== undefined
  ) {
    getParams += `&search=${params.search}`;
  }

  if (
    params &&
    params.action !== null &&
    params.action !== "" &&
    params.action !== undefined
  ) {
    getParams += `&action=${params.action}`;
  }
  if (
    params &&
    params.jobId &&
    params.jobId !== null &&
    params.jobId !== undefined
  ) {
    getParams += `&jobId=${params.jobId}`;
  }
  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "GET",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
    
  })
    .then((response) => responseStatusHandler(response))
    .then((result) => {
     return  result.json()
    }
      // result.status === 200 || result.status === 201 || result.status === 400
      // ? 
        // : result
    )
    .catch((error) => {
      errorHandler(error);
    });
};


/** ****************************** View Api *********************************** */
export const viewDataByApi = (requestUrl, dataId) =>
  fetch(`${hostConfig.API_URL}${requestUrl}/${dataId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => responseStatusHandler(response))
    .then((result) =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result
    )
    .catch((error) => {
      errorHandler(error);
    });

/** ****************************** Update Api *********************************** */
export const putDataApi = (requestUrl, params, id, roleId, role, method) => {
  let getParams = "";
  if (
    roleId &&
    roleId &&
    roleId !== null &&
    roleId !== undefined
  ) {
    getParams += `/${roleId}`;
  }

  if (
    role &&
    role !== null &&
    role !== "" &&
    role !== undefined
  ) {
    getParams += `?role=${role}`;
  }
  
  if (
    method &&
    method !== null &&
    method !== "" &&
    method !== undefined
  ) {
    getParams += `&method=${method}`;
  }
  return fetch(`${hostConfig.API_URL}${requestUrl}/${id}${getParams}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  })
    .then((response) => responseStatusHandler(response))
    .then((result) =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result
    )
    .catch((error) => {
      errorHandler(error);
    });
  }

/** ****************************** Delete Api *********************************** */
export const deleteDataApi = (requestUrl, id) =>
  fetch(`${hostConfig.API_URL}${requestUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => responseStatusHandler(response))
    .then((result) =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result
    )
    .catch((error) => {
      errorHandler(error);
    });

/** ****************************** Download Api *********************************** */
export const downloadApi = (requestUrl, dataId) =>
  fetch(`${hostConfig.API_URL}${requestUrl}?candidateId=${dataId}`, {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/pdf",
    },
    responseType: "arraybuffer",
  })
    .then((response) => responseStatusHandler(response))
    .then((result) =>
      result.status === 200 || result.status === 201 || result.status === 400
        ? result.json()
        : result
    )
    .catch((error) => {
      errorHandler(error);
    });
