/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import {
  CBadge,
  // CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInput,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
// import saveAs from "save-as";
import "react-toastify/dist/ReactToastify.css";
// import { hostConfig } from "../config"; // env
import { hostConfig } from "../../../config/index";
// import { Link } from "react-router-dom";
// import { AiOutlineClose } from "react-icons/ai";
// import { IoMdSend } from "react-icons/io";

/** **************************** Import Icons ****************************** */
/** **************************** Import Utils ****************************** */
import formatDate from "../../../utils/dateFormat";

/** **************************** Import Components ****************************** */
import Pagination from "../../../components/Pagination";
import CandidatePopupDetails from "./PopupDetails";

/** **************************** Import API ****************************** */
import { deleteCandidate } from "../../../api/delete";
import { GetCarrierMessageList } from "../../../redux/actions";

/** **************************** Import CSS ****************************** */

/** **************************** Import Image ****************************** */
// import EditIcon from "../../../assets/icons/edit-button.png";
import ResumeIcon from "../../../assets/icons/resume.jpg";

// import DownloadIcon from "../../../assets/icons/download1.png";
import SearchIcon from "../../../assets/icons/search-icon.png";
import noRecord from "../../../assets/images/norecordfound.png";

/** **************************** Import Components ****************************** */
import "./candidate.css";

const getBadge = (status) => {
  switch (status) {
    case "approved":
      return "primary";
    case "offer sent":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "danger";
    default:
      return "primary";
  }
};

const CarrierList = (props) => {
  const [onClickRow] = useState(true);
  const [warning, setWarning] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [modelStateDelete] = useState("");
  const [ContactMessageId, setContactMessageId] = useState("");
  const [clickId, setClickId] = useState(false);

  const dispatch = useDispatch();
  const getCandidate = useSelector(
    (state) => state.carrierMessage.storeCarrierMessageResponse
  );
  // getCandidate.data && getCandidate.data.map((data) => {
  //   data.name = data.firstName + data.lastName;
  //   return data;
  // });
  // const blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
  // saveAs(blob, `${hostConfig.CURRENT_URL}resume/resume-${id}.pdf`);
  console.log("getCandidate", getCandidate);
  useEffect(() => dispatch(GetCarrierMessageList()), []);
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
  const getApiDelete = () => {
    // props.getUsersAfterDelete(props.apiPage);
    dispatch(GetCarrierMessageList(props.apiPage));
    setWarning(false);
  };
  const getUserBySearchQuery = (search) => {
    dispatch(GetCarrierMessageList({ ...props.apiPage, search }));
    // setOnClickRow(!onClickRow);
  };
  console.log("result77777777777", getCandidate.data);
  return (
    <>
      <>
        <CRow className="mt-3">
          <CCol xs="12">
            <CInput
              id="organizationFilter"
              className="organizationFilter mt-3"
              placeholder="Search Applicant"
              name="organizationFilter"
              onChange={(e) => getUserBySearchQuery(e.target.value)}
            />
            <img src={SearchIcon} alt="searchIcon" className="searchIcon" />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol xl={12}>
            <CDataTable
              items={
                getCandidate &&
                  getCandidate.data &&
                  getCandidate.data.length
                  ? getCandidate.data
                  : []
              }
              fields={[
                "candidateName",
                "email",
                "mobile",
                "experience",
                "position",
                "createdAt",
                // "resume",
                { key: "Resume", _classes: "action-Padding" },
              ]}
              hover
              // striped
              itemsPerPage={5}
              onRowClick={(items) =>
                onClickRow
                  ? (setContactMessageId(items), setClickId(true))
                  : null
              }
              clickableRows
              outlined
              responsive
              noItemsViewSlot={
                <div className="text-center my-5">
                  <img
                    src={noRecord}
                    alt="newJoineeIcon"
                    width="90"
                    height="90px"
                    className="img-fluid imageNoData"
                  />
                </div>
              }
              addTableClasses="candidateTable"
              sorter
              scopedSlots={{
                candidateName: (item) => (
                  <td>{`${item.candidateName} `}</td>
                ),
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
                startDate: (item) => (
                  <td>
                    {formatDate(item.startDate, {
                      dateFormat: "MM:DD:YYYY",
                      // timeFormat: "24",
                    })}
                  </td>
                ),
                // ),
                Resume: (item, index) => (
                  <td>
                    <div>
                      <a
                        href={`${hostConfig.CURRENT_URL}resume/resume-${item.id}.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <CButton>
                          <img
                            src={ResumeIcon}
                            alt="editIcon"
                            className="editIcon"
                            width="23px"
                            height="23px"
                          />
                        </CButton>
                      </a>
                      {/* <CButton
                        onClick={(e) => {
                          // setSelectedUserData(item);
                          // setManageCandidateModel({
                          //   ...manageCandidateModel,
                          //   update: !manageCandidateModel.update,
                          // });
                          e.preventDefault();
                          // blob;
                          window.location.href = `${hostConfig.CURRENT_URL}resume/resume-${item.id}.pdf`;
                          // "http://localhost:5001/resume/resume-5.pdf";
                        }}
                        // onMouseEnter={() => setOnClickRow(false)}
                        // onMouseLeave={() => setOnClickRow(true)}
                        // className="shadow deleteShadow"
                      >
                        <img
                          src={DownloadIcon}
                          alt="editIcon"
                          className="editIcon"
                          width="23px"
                          height="23px"
                        />
                      </CButton> */}

                      {/* <a href={`${hostConfig.CURRENT_URL}resume/resume-${item.id}.pdf`} target="_blank" rel="noopener noreferrer" download>
                        <CButton>
                          <i className="fas fa-download" />
                          Download File
                        </CButton>
                      </a> */}
                    </div>
                  </td>
                ),
              }}
            />
            <Pagination
              pages={props.pages}
              nextPage={props.nextPage}
              currentPage={props.currentPage}
              changeRowsPerPage={props.changeRowsPerPage}
              rowsPerPage={props.rowsPerPage}
            // disabled
            />
          </CCol>
        </CRow>
      </>

      {/** ********************* Model Delete Organization ************************ */}
      {warning ? (
        <CModal
          show={warning}
          color="danger"
          onClose={() => setWarning(!warning)}
          size="md"
          closeOnBackdrop={false}
        >
          <CModalHeader closeButton>
            <CModalTitle style={{ color: "white" }}>
              Delete Candidate Detail
            </CModalTitle>
          </CModalHeader>
          <CModalBody>{modelStateDelete}</CModalBody>
          <CModalFooter>
            <CButton
              style={{ backgroundColor: "#EA4D26", color: "white" }}
              onClick={() => {
                setWarning(!warning);
                deleteCandidate(deleteId).then((res) => {
                  if (responseHandler(res)) {
                    getApiDelete();
                  }
                });
                setDeleteId("");
              }}
            >
              Yes
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                setWarning(!warning);
                setDeleteId("");
              }}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      ) : null}

      {/** ***************** Model Organization on Row-Click ********************* */}
      {clickId ? (
        <CModal
          show={clickId}
          onClose={() => setClickId(!clickId)}
          size="lg"
          closeOnBackdrop={false}
        >
          <CModalHeader
            style={{ backgroundColor: "#EA4D26", color: "white" }}
            closeButton
          >
            <CModalTitle style={{ color: "white" }}>
              Applicant Details
              {/* {ContactMessageId} */}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CandidatePopupDetails ContactMessage={ContactMessageId} />
          </CModalBody>
        </CModal>
      ) : null}
    </>
  );
};

export default CarrierList;
