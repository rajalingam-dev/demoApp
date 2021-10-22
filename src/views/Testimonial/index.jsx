
/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/** ***************************** Import Components ******************************** */
import TestimonialList from "./Testimonial";
// import formatDate from "../../utils/dateFormat";
/** **************************** Import API ****************************** */

/** ***************************** Import Action ******************************** */
import { GetTestimonialList } from "../../redux/actions";

/** ***************************** Import Preloader ******************************** */
import Preloader from "../../assets/images/Preloader.gif";

/** ***************************** Import Utils ******************************** */

// import { GetSystemUser, GetAllOrganization } from "../../redux/actions";

const Testimonial = (props) => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // const initialUserData = async () => {
  //   dispatch(GetTestimonialList()).then((res) => {
  //     if (res) {
  //       console.log("results responce", res);
  //       setTestimonialData(res.data);
  //       setTotalResults(res.totalResults);
  //       setApiPage(res.page);
  //       setTotalPages(res.totalPages);
  //       setCurrentPage(currentPage);
  //     }
  //   });
  // };
  const initialUserData = async () => {
    // const data = props.jobPostReducer;
    dispatch(GetTestimonialList()).then((res) => {
      console.log("response1234444444444444", res);

      if (res) {
        // res.data.forEach((item, index) => {
        //   item.createdAt = formatDate(item.createdAt, {
        //     dateFormat: "YYYY:MM:DD:HH:MM",
        //   });
        // });
        setTestimonialData(res.data);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };
  useEffect(() => {
    initialUserData();
    // eslint-disable-next-line
  }, []);

  const preloader = useSelector((state) => state.testimonial.loading);
  // const jobDetails = useSelector((state) => state.jobPost.jobpostResponse);
  console.log("testimonial11111", props.userData);
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
    GetTestimonialList({
      data,
    }).then((res) => {
      console.log("GetTestimonialList res", res);
      if (responseHandler(res)) {
        // res.results.forEach((item, index) => {
        //   item.name = `${item.firstName} ${item.lastName}`;
        //   item.isActive = item.isActive === true ? "active" : "Not Active";
        // });
        setTestimonialData(res.results);
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
    dispatch(GetTestimonialList({
      currentPage,
      rowsPerPage: parseInt(value, 10),
      ...data,
    })).then((res) => {
      if (responseHandler(res)) {
        console.log(res, "12456");
        // res.results.forEach((item, index) => {
        //   item.createdAt = formatDate(item.createdAt, {
        //     dateFormat: "YYYY:MM:DD:HH:MM",
        //   });
        // });
        setTestimonialData(res.results);
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
    dispatch(GetTestimonialList({ currentPage, rowsPerPage, sortBy })).then((res) => {
      if (responseHandler(res)) {
        setTestimonialData(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };
  // console.log(totalResults, "from contact page");
  // Get users for after add user request
  const getUsersAfterAdd = async (currentPage) => {
    // const data = {
    //   sortBy: "organizationName: asc",
    //   search,
    // };

    dispatch(GetTestimonialList()).then((res) => {
      console.log("res updated", res);
      setTestimonialData(res?.data);
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
    dispatch(GetTestimonialList({
      currentPage,
      rowsPerPage,
      data,
    })).then((res) => {
      setTestimonialData(res.results);
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
    // if (props.handle) {
    //   data.orgId = props.handle;
    // }
    dispatch(GetTestimonialList(data)).then((res) => {
      if (res) {
        setTestimonialData(res.results);
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
      <TestimonialList
        userData={testimonialData}
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


export default Testimonial;

