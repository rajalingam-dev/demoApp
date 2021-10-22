/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/** ***************************** Import Components ******************************** */
import CarrierList from "./CarrierList";
import formatDate from "../../../utils/dateFormat";

/** **************************** Import API ****************************** */

/** ***************************** Import Action ******************************** */
import { GetCarrierMessageList } from "../../../redux/actions";

/** ***************************** Import Preloader ******************************** */
import Preloader from "../../../assets/images/Preloader.gif";

/** ***************************** Import Utils ******************************** */

const Carrier = (props) => {
  const [contactMessage, setContactMessage] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const initialUserData = async () => {
    const data = {};
    dispatch(GetCarrierMessageList(data)).then((res) => {
      if (res) {
        // res.results.forEach((item, index) => {
        //   item.name = `${item.firstName} ${item.lastName}`;
        //   item.isActive = item.isActive === true ? "active" : "Not Active";
        // });
        setContactMessage(res.data);
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
      }
    });
  };
  useEffect(() => {
    initialUserData();
    // eslint-disable-next-line
  }, [props.handle]);

  const preloader = useSelector((state) => state.contactMessage.loading);

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

  // Pagination
  const nextPage = (currentPage) => {
    const data = {
      search,
      sortBy: "name :asc",
      currentPage,
      rowsPerPage,
    };
    dispatch(GetCarrierMessageList({
      data,
    })).then((res) => {
      if (responseHandler(res)) {
        // res.results.forEach((item, index) => {
        //   item.name = `${item.firstName} ${item.lastName}`;
        //   item.isActive = item.isActive === true ? "active" : "Not Active";
        // });
        // setContactMessage(res.results);
        res.results.forEach((item, index) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
        });
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
      }
    });
  };

  // Change Rows Per Page
  const changeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    const data = {
      sortBy: "name: asc",
      search,
    };
    dispatch(GetCarrierMessageList({
      currentPage,
      rowsPerPage: parseInt(value, 10),
      ...data,
    })).then((res) => {
      if (responseHandler(res)) {
        // res.results.forEach((item, index) => {
        //   item.createdAt = formatDate(item.createdAt, {
        //     dateFormat: "YYYY:MM:DD:HH:MM",
        //   });
        // });
        res.results.forEach((item, index) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
        });
        // setContactMessage(res.results);
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
      }
    });
  };

  // Get users for after delete request
  const getUsersAfterDelete = (currentPage) => {
    const sortBy = "createdAt:desc";
    currentPage = totalResults % rowsPerPage === 1 ? currentPage - 1 : currentPage;
    currentPage = currentPage === 0 ? currentPage + 1 : currentPage;
    GetCarrierMessageList({ currentPage, rowsPerPage, sortBy }).then((res) => {
      if (responseHandler(res)) {
        res.results.forEach((item, index) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
        });
        setContactMessage(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };
  console.log(totalResults, "from contact page");
  // Get users for after add user request
  const getUsersAfterAdd = async (currentPage) => {
    const data = {
      sortBy: "organizationName: asc",
      search,
    };
    await props.GetCarrierMessageList(data).then((res) => {
      res.results.forEach((item, index) => {
        item.createdAt = formatDate(item.createdAt, {
          dateFormat: "YYYY:MM:DD:HH:MM",
        });
      });
      setContactMessage(res.results);
      setTotalResults(res.totalResults);
      setTotalPages(res.totalPages);
      setCurrentPage(currentPage);
      setApiPage(res.page);
    });
  };

  // Get users for after update request
  const getUsersAfterUpdate = (currentPage) => {
    const data = {
      sortBy: "name: asc",
      search,
    };
    GetCarrierMessageList({
      currentPage,
      rowsPerPage,
      data,
    }).then((res) => {
      setContactMessage(res.data);
      setTotalResults(res.totalResults);
      setApiPage(res.page);
      setTotalPages(res.totalPages);
      setCurrentPage(currentPage);
    });
  };
  const getUsersBySearchQuery = async (search) => {
    setSearch(search);
    const data = {
      currentPage,
      rowsPerPage,
      sortBy: "name:asc",
      search,
    };
    if (props.handle) {
      data.orgId = props.handle;
    }
    await props.GetCarrierMessageList(data).then((res) => {
      if (res) {
        res.results.forEach((item, index) => {
          item.createdAt = formatDate(item.createdAt, {
            dateFormat: "YYYY:MM:DD:HH:MM",
          });
        });
        setContactMessage(res.results);
        setTotalResults(res.totalResults);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
        setApiPage(res.page);
      }
    });
  };

  return (
    <div style={{ position: "relative" }}>
      {preloader ? (
        <div className="d-flex justify-content-center">
          <div
            style={{
              position: "absolute",
              top: "43%",
              left: "43%",
              zIndex: "2",
            }}
          >
            <img
              src={Preloader}
              alt="Preloader"
              className="img-fluid"
              width="200px"
              height="200px"
            />
          </div>
        </div>
      ) : null}
      <CarrierList
        userData={contactMessage}
        totalResult={totalResults}
        getUsersAfterDelete={getUsersAfterDelete}
        getUsersAfterAdd={getUsersAfterAdd}
        apiPage={apiPage}
        pages={totalPages}
        nextPage={nextPage}
        currentPage={currentPage}
        changeRowsPerPage={changeRowsPerPage}
        rowsPerPage={rowsPerPage}
        getApiUpdated={getUsersAfterUpdate}
        getUserBySearchQuery={getUsersBySearchQuery}
      />
    </div>
  );
};


export default Carrier;
