/** **************************** Import Libs ****************************** */
import React, { useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
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
import { connect } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

/** **************************** Import Utls ****************************** */
import Pagination from "../../../components/Pagination";
import User from "./PopupDetails";
import EditUserForms from "./EditForm";
import AddUsers from "./AddForm";

/** **************************** Import API ****************************** */
import { deleteUser } from "../../../api/delete";

/** **************************** Import CSS ****************************** */
import "./Users.css";

/** **************************** Import actions ****************************** */

/** **************************** Import Image ****************************** */
import AddButton from "../../../assets/icons/add-button.png";
import EditIcon from "../../../assets/icons/edit-button.png";
import DeleteIcon from "../../../assets/icons/delete-button.png";
import SearchIcon from "../../../assets/icons/search-icon.png";
import noRecord from "../../../assets/images/norecordfound.png";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = (props) => {
  const [onClickRow, setOnClickRow] = useState(true);
  const data = props.userData;
  const [warning, setWarning] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [modelStateDelete, setModelStateDelete] = useState("");
  const [userId, setUserId] = useState("");
  const [clickId, setClickId] = useState(false);
  const [updateUserModel, setUpdateUserModel] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [addUserModel, setAddUserModel] = useState(false);
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

  const getApiForAdd = () => {
    props.getUsersAfterAdd(props.apiPage);
    setAddUserModel(false);
    setOnClickRow(!onClickRow);
  };

  const changeAddUserModelState = () => {
    setAddUserModel(false);
    setOnClickRow(!onClickRow);
  };

  const getApiForEdit = () => {
    props.getApiUpdated(props.apiPage);
    setUpdateUserModel(false);
    setOnClickRow(!onClickRow);
  };

  const changeUpdateUserModelState = () => {
    setUpdateUserModel(false);
    setOnClickRow(!onClickRow);
  };

  const getApiDelete = () => {
    props.getUsersAfterDelete(props.apiPage);
    setWarning(false);
  };

  const getUserBySearchQuery = (search) => {
    props.getUserBySearchQuery(search);
  };
  return (
    <>
      {addUserModel ? (
        <CRow className="mt-3">
          <CCol xl={ 12 } className="users-main">
            <CCard className="userCard">
              <CCardHeader className="userCardHeader">
                Add User
                <div>
                  <AiOutlineClose
                    onClick={ () => {
                      setAddUserModel(false);
                      setOnClickRow(true);
                    } }
                    style={ { cursor: "pointer" } }
                  />
                </div>
              </CCardHeader>
              <CCardBody>
                <AddUsers
                  getAddedData={ getApiForAdd }
                  changeAddUserModelState={ changeAddUserModelState }
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : updateUserModel ? (
        <CRow className="mt-3">
          <CCol>
            <CCard className="userCard">
              <CCardHeader className="userCardHeader">
                Update User
                <div>
                  <AiOutlineClose
                    onClick={ () => {
                      setUpdateUserModel(false);
                      setOnClickRow(true);
                    } }
                    style={ { cursor: "pointer" } }
                  />
                </div>
              </CCardHeader>
              <CCardBody>
                <EditUserForms
                  userData={ selectedUserData }
                  getUpdatedData={ getApiForEdit }
                  changeUpdateUserModelState={ changeUpdateUserModelState }
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        <>
          <CRow className="mt-3">
            <CCol xs="12">
              <CInput
                id="userFilter"
                className="userFilter mt-3"
                placeholder="Search Users"
                name="userFilter"
                onChange={ (e) => getUserBySearchQuery(e.target.value) }
              />
              <img src={ SearchIcon } alt="searchIcon" className="searchIcon" />
            </CCol>
            <img
              src={ AddButton }
              alt="addButton"
              width="50px"
              height="50px"
              className="img-fluid addButton"
              onClick={ () => setAddUserModel(!addUserModel) }
            />
          </CRow>
          <CRow className="mt-3">
            <CCol xl={ 12 } className="users-main maxWidth" color="light">
              <CDataTable
                items={ data }
                fields={ [
                  "firstName",
                  "lastName",
                  "Role",
                  "workEmail",
                  "createdAt",
                  { key: "Actions", _classes: "action-Padding" },
                ] }
                hover
                responsive
                outlined
                responsive
                noItemsViewSlot={ (
                  <div className="text-center my-5">
                    {props.preLoader ? null :<img
                      src={noRecord}
                      alt="newJoineeIcon"
                      width="90"
                      height="90px"
                      className="img-fluid imageNoData"
                    />}
                  </div>
                ) }
                addTableClasses="userTable"
                sorter
                itemsPerPage={ props.rowsPerPage }
                onRowClick={ (items) => (onClickRow ? (setUserId(items.id), setClickId(true)) : null) }
                clickableRows
                scopedSlots={ {
                  status: (item) => (
                    <td>
                      <CBadge color={ getBadge(item.status) }>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  Actions: (item, index) => (
                    <td>
                      <CButton
                        onClick={ () => {
                          setSelectedUserData(item);
                          setUpdateUserModel(!updateUserModel);
                        } }
                        onMouseEnter={ () => setOnClickRow(false) }
                        onMouseLeave={ () => setOnClickRow(true) }
                        // className="editButton"
                      >
                        <img
                          src={ EditIcon }
                          alt="editIcon"
                          className="editIcon"
                          width="23px"
                          height="23px"
                        />
                      </CButton>

                      <CButton
                        onClick={ () => {
                          setModelStateDelete("Are you sure want to delete!!!");
                          setWarning(true);
                          setDeleteId(item.id);
                        } }
                        onMouseEnter={ () => setOnClickRow(false) }
                        onMouseLeave={ () => setOnClickRow(true) }
                        // className="deleteButton"
                      >
                        <img
                          src={ DeleteIcon }
                          alt="deleteIcon"
                          className="deleteIcon"
                          width="23px"
                          height="23px"
                        />
                      </CButton>
                    </td>
                  ),
                } }
              />
              <Pagination
                pages={ props.pages }
                nextPage={ props.nextPage }
                currentPage={ props.currentPage }
                changeRowsPerPage={ props.changeRowsPerPage }
                rowsPerPage={ props.rowsPerPage }
              />
            </CCol>
          </CRow>
        </>
      )}

      {/** ********************* Model Delete User ************************ */}
      {warning ? (
        <CModal
          show={ warning }
          color="danger"
          onClose={ () => setWarning(!warning) }
          size="md"
          closeOnBackdrop={ false }
        >
          <CModalHeader closeButton>
            <CModalTitle style={ { color: "white" } }>Delete User</CModalTitle>
          </CModalHeader>
          <CModalBody>{modelStateDelete}</CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              style={ { backgroundColor: "#EA4D26", border: "none" } }
              onClick={ () => {
                setWarning(!warning);
                deleteUser(deleteId).then((res) => {
                  if (responseHandler(res)) {
                    getApiDelete();
                  }
                });
                setDeleteId("");
              } }
            >
              Yes
            </CButton>
            <CButton
              color="secondary"
              onClick={ () => {
                setWarning(!warning);
                setDeleteId("");
              } }
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      ) : null}

      {/** ***************** Model User on Row-Click ********************* */}
      {clickId ? (
        <CModal
          show={ clickId }
          onClose={ () => setClickId(!clickId) }
          size="lg"
          closeOnBackdrop={ false }
        >
          <CModalHeader
            style={ { backgroundColor: "#EA4D26", color: "white" } }
            closeButton
          >
            <CModalTitle style={ { color: "white" } }>User:</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <User
              userId={ userId }
              //  organizations={ props.getAllOrganizationsResponse?.results }
            />
          </CModalBody>
        </CModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  createSystemUserResponse: state.SystemUser.storeSystemUserResponse,
  createSystemUserError: state.SystemUser.error,
  createSystemUserPreLoader: state.SystemUser.loading,
  getAllOrganizationsResponse: state.Organization.storeOrganizationResponse,
  preLoader: state.SystemUser.loading,
});

export default connect(mapStateToProps)(Users);
