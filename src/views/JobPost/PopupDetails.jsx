/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import {
  CCard, CCardBody, CCol, CRow,
} from "@coreui/react";

/** **************************** Import API ****************************** */
import { getCarrierMessages } from "../../api/list";
// import formatDate from "../../utils/dateFormat";

const User = (props) => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    getCarrierMessages({ jobId: props.userId }).then((res) => {
      const dataArray = res.data.map((res) => res.name);
      const changeFieldNames = {
        ...dataArray
        // "Job Position": dataArray.jobPosition || "-",
        // Name: dataArray.name || "-",
        // experience: dataArray.experience || "-",
        // Email: dataArray.email || "-",
        // "Mobile Number": dataArray.mobile || "-",
        // "Telmediq Number": fields.telmediqNumber || "-",
        // Pager: fields.pager || "-",
        // "Preferred Name": fields.preferredName || "-",
        // "Preferred Phone": fields.preferredPhone || "-",
        // PrgEmployeeId: fields.prgEmployeeId || "-",
        // City: fields.city || "-",
        // State: fields.state || "-",
        // Street: fields.street || "-",
      };
      //   const keyValue = Object.keys(changeFieldNames);
      //   let updatedArray =[];
      //   const updated = keyValue.forEach((e)={
      //   });
      //   console.log(keyValue, "con");
      setUsersData(changeFieldNames);
    });
    // eslint-disable-next-line
  }, [props.userId]);
  // const user = usersData.find((user) => user.id === props.userId);
  const userDetails = usersData
    ? Object.entries(usersData)
    : [["id", <span>No Records Found</span>]];
  console.log(usersData, "userData from 67", userDetails);

  return (
    <CRow>
      <CCol lg={12}>
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
                  <tr key={index.toString()}>
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

export default User;
