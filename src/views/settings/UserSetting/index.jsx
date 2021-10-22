/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Users from "./UsersList";

/** **************************** Import API ****************************** */
import { getUserList } from "../../../api/list";

/** ***************************** Import Action ******************************** */
import { GetSystemUser, GetAllOrganization } from "../../../redux/actions";

/** ***************************** Import Preloader ******************************** */
import Preloader from "../../../assets/images/Preloader.gif";
import formatDate from "../../../utils/dateFormat";

const UsersDataResult = (props) => {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [preloader, setPreLoader] = useState(false);
  const [search, setSearch] = useState("");

  const initialUserData = async () => {
    const data = {
      currentPage,
      rowsPerPage,
      sortBy: "firstName:asc",
      search,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }

    await props.getSystemUser(data).then((res) => {
      props.GetAllOrganization();
      if (res) {
        res.results.forEach((item) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
          item.Role = item.role.toUpperCase();
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setTotalPages(res.totalPages);
      }
    });
  };
  useEffect(() => {
    initialUserData();
    // eslint-disable-next-line
  }, [props.handle]);

  useEffect(() => {
    setPreLoader(props.preLoader);
  }, [props.preLoader]);

  /** *********************************Response Handler*************************************** */
  const responseHandler = (res) => {
    if (res) {
      if (res.code) {
        if (res.code === 400) {
          return false;
        }
        return false;
      }
      if (res.error) {
        return false;
      }
      return res;
    }
    return false;
  };
  const changeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    const data = {
      sortBy: "firstName:asc",
      search,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }
    setPreLoader(true);
    getUserList({
      currentPage,
      rowsPerPage: parseInt(value, 10),
      ...data,
    }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
          item.isActive = item.isActive === true ? "active" : "Not Active";
          item.Role = item.role.toUpperCase();
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
      }
    });
  };

  // Pagination
  const nextPage = (currentPage) => {
    const data = {
      search,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }
    const sortBy = "firstName:asc";
    setPreLoader(true);
    getUserList({
      currentPage,
      rowsPerPage,
      sortBy,
      ...data,
    }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
          item.isActive = item.isActive === true ? "active" : "Not Active";
          item.Role = item.role.toUpperCase();
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
      }
    });
  };

  // Get users for after delete request
  const getUsersAfterDelete = (currentPage) => {
    const data = {};
    if (props.handle) {
      data.orgId = props.handle;
    }
    const sortBy = "firstName:asc";
    currentPage = totalResults % rowsPerPage === 1 ? currentPage - 1 : currentPage;
    currentPage = currentPage === 0 ? currentPage + 1 : currentPage;
    setPreLoader(true);
    getUserList({
      currentPage,
      rowsPerPage,
      sortBy,
      ...data,
    }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          // item.name = `${item.firstName} ${item.lastName}`;
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
            // timeFormat: "24",
          });
          item.isActive = item.isActive === true ? "active" : "Not Active";
          item.Role = item.role.toUpperCase();
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };

  // Get users for after add user request
  const getUsersAfterAdd = async (currentPage) => {
    const sortBy = "firstName:asc";
    const data = {
      search,
      currentPage,
      rowsPerPage,
      sortBy,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }
    await props.getSystemUser(data).then((res) => {
      if (res) {
        res.results.forEach((item) => {
          // item.name = `${item.firstName} ${item.lastName}`;
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
            // timeFormat: "24",
          });
          item.Role = item.role.toUpperCase();
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
        setApiPage(res.page);
      }
    });
  };

  // Get users for after update request
  const getUsersAfterUpdate = (currentPage) => {
    const data = {
      search,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }
    const sortBy = "firstName:asc";
    setPreLoader(true);
    getUserList({
      currentPage,
      rowsPerPage,
      sortBy,
      ...data,
    }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          // item.name = `${item.firstName} ${item.lastName}`;
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
            // timeFormat: "24",
          });
          item.Role = item.role.toUpperCase();
          item.isActive = item.isActive === true ? "Active" : "Not Active";
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };

  const getUsersBySearchQuery = async (search) => {
    setSearch(search);
    const data = {
      currentPage,
      rowsPerPage,
      sortBy: "firsName:asc",
      search,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }
    await props.getSystemUser(data).then((res) => {
      if (res) {
        res.results.forEach((item) => {
          // item.name = `${item.firstName} ${item.lastName}`;
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
            // timeFormat: "24",
          });
          item.Role = item.role.toUpperCase();
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
        setApiPage(res.page);
      }
    });
  };


  return (
    <div style={ { position: "relative" } }>
      {preloader ? (
        <div className="d-flex justify-content-center">
        <div
          style={ {
            position: "absolute",
            top: "26.4%",
            left: "43%",
            zIndex: "2",
          } }
        >
          <img
            src={ Preloader }
            alt="Preloader"
            className="img-fluid"
            width="200px"
            height="200px"
          />
        </div>
      </div>
      ) : null}
      <Users
        userData={ users }
        totalResult={ totalResults }
        getUsersAfterDelete={ getUsersAfterDelete }
        getUsersAfterAdd={ getUsersAfterAdd }
        apiPage={ apiPage }
        pages={ totalPages }
        nextPage={ nextPage }
        currentPage={ currentPage }
        changeRowsPerPage={ changeRowsPerPage }
        rowsPerPage={ rowsPerPage }
        getApiUpdated={ getUsersAfterUpdate }
        getUserBySearchQuery={ getUsersBySearchQuery }
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  getSystemUserResponse: state.SystemUser.storeSystemUserResponse,
  getSystemUserError: state.SystemUser.error,
  preLoader: state.SystemUser.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getSystemUser: (params) => dispatch(GetSystemUser(params)),
  GetAllOrganization: () => dispatch(GetAllOrganization()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersDataResult);
