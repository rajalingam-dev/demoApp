/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import {
  CCard, CCardBody, CCol, CRow,
} from "@coreui/react";

/** **************************** Import API ****************************** */

const Organization = (props) => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
      const data = props.ContactMessage;
      console.log(data, "3221213231");
      const changeFieldNames = {
        Name: data.name || "-",
        Email: data.email || "-",
        "Mobile Number": data.mobile || "-",
        Budget: data.budget || "-",
        Services: `${data.services}` || "-",
        Message: data.message || "-",
        id: data.id || "-",
        // Active: data.isActive || "-",
        // "Updated At": data.updatedAt || "-",
        // "Created At": data.createdAt || "-",
      };
      setUsersData(changeFieldNames);
    // eslint-disable-next-line
  }, [ props.ContactMessage ]);
  // const user = usersData.find((user) => user.id.toString() === props.CandidateId);
  // const user = usersData.find((user) => console.log(user, props.CandidateId));

  const userDetails = usersData
    ? Object.entries(usersData)
    : [["id", <span>No Records Found</span>]];
  console.log("Check User Details:", userDetails, "User:", usersData);
  return (
    <CRow>
      <CCol lg={ 12 }>
        <CCard>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => (key !== "id"
                  && key !== "isAdmin"
                  && key !== "isActive"
                  && key !== "createdBy"
                  && key !== "updatedBy"
                  && key !== "location" ? ( // Conditional mapping
                    <tr key={ index.toString() }>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
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

export default Organization;
