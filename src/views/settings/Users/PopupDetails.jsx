/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import {
  CCard, CCardBody, CCol, CRow,
} from "@coreui/react";

/** **************************** Import API ****************************** */
import { getUserById } from "../../../api/list";
import formatDate from "../../../utils/dateFormat";

const User = (props) => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    getUserById(props.userId).then((res) => {
      res.forEach((item) => {
        item.isActive = item.isActive === true ? "active" : "Not Active";
        item.createdAt = formatDate(item.createdAt, {
          dateFormat: "MM:DD:YYYY:HH:MM",
          // timeFormat: "24",
        });
        item.updatedAt = formatDate(item.updatedAt, {
          dateFormat: "MM:DD:YYYY:HH:MM",
          // timeFormat: "24",
        });
        item.dob = formatDate(item.dob, {
          dateFormat: "DD:MM:YYYY",
          // timeFormat: "24",
        });
        item.role = item.role.toUpperCase();
        // const organizationId = [];
        // props.organizations.map((orgData) => (item.OrganizationAccessIds.includes(orgData.id)
        //   ? organizationId.push(orgData.organizationName)
        //   : null));
        // item.OrganizationAccessIds = organizationId.toString();
        // props.organizations.map((orgData) => (item.orgId === orgData.id
        //   ? (item.orgId = orgData.organizationName)
        //   : null));
        // item.orgId
      });
      const dataArray = res;
      const changeFieldNames = dataArray.map((fields) => ({
        "Organizations Access": fields.OrganizationAccessIds || "-",
        "Direct Organization": fields.orgId || "-",
        "Employment Status": fields.employmentStatus || "-",
        "First Name": fields.firstName || "-",
        "Last Name": fields.lastName || "-",
        "Professional Title": fields.prfoessionalTitle || "-",
        Role: fields.role || "-",
        "Work Email": fields.workEmail || "-",
        "Personal Email": fields.personalEmail || "-",
        DOB: fields.dob || "-",
        "Mobile Number": fields.mobileNumber || "-",
        "Telmediq Number": fields.telmediqNumber || "-",
        Pager: fields.pager || "-",
        "Preferred Name": fields.preferredName || "-",
        "Preferred Phone": fields.preferredPhone || "-",
        PrgEmployeeId: fields.prgEmployeeId || "-",
        "Termination Date": fields.terminationDate || "-",
        City: fields.city || "-",
        State: fields.state || "-",
        Street: fields.street || "-",
        id: fields.id || "-",
        Active: fields.isActive || "-",
        Location: fields.location || "-",
        "Created At": fields.createdAt || "-",
        "Created By": fields.createdBy || "-",
        "Updated At": fields.updatedAt || "-",
      }));
      setUsersData(changeFieldNames);
    });
    // eslint-disable-next-line
  }, [props.userId]);
  const user = usersData.find((user) => user.id.toString() === props.userId);
  const userDetails = user
    ? Object.entries(user)
    : [["id", <span>No Records Found</span>]];

  return (
    <CRow>
      <CCol lg={ 12 }>
        <CCard>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => (key !== "id"
                  && key !== "isAdmin"
                  && key !== "createdBy"
                  && key !== "updatedBy"
                  && key !== "Location" ? ( // Conditional mapping
                    <tr key={ index.toString() }>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>
                          {value === "active" ? (
                            <i
                              className="fa fa-check-circle"
                              style={ { color: "green", fontSize: "25px" } }
                            />
                          ) : value === "inActive" ? (
                            <i
                              className="fa fa-time-circle"
                              style={ { color: "red", fontSize: "25px" } }
                            />
                          ) : (
                            value
                          )}
                        </strong>
                      </td>
                    </tr>
                  ) : null))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
