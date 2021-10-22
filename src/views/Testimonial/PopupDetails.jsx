/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import {
  CCard, CCardBody, CCol, CRow,
} from "@coreui/react";

/** **************************** Import API ****************************** */
import { getTestimonialById } from "../../api/list";
// import formatDate from "../../utils/dateFormat";

const Testimonial = (props) => {
  const [testimonialData, setTestimonialData] = useState([]);
  console.log("idddd///////", props.userId);
  const data = props.userId;
  console.log(data);
  useEffect(() => {
    getTestimonialById(props.userId).then((res) => {
      const dataArray = res.data;
      const changeFieldNames = {
        // ...dataArray
        "Company Name ": dataArray.companyName || "-",
        Description: dataArray.description || "-",
        ContactPerson: dataArray.contactPerson || "-",
        Designation: dataArray.designation || "-",

      };
      setTestimonialData(changeFieldNames);

      // const changeFieldNames1 = res.map((fields) => ({
      //   "Company Name": fields.companyName,
      //   Description: fields.description || "-",
      //   ContactPerson: fields.contactPerson || "-",
      //   Designation: fields.designation || "-",

      // }));
      // console.log(changeFieldNames1, 12);
    });

    // eslint-disable-next-line
  }, [props.userId]);
  // const user = testimonialData.find((user) => user.id === props.userId);
  const userDetails = testimonialData
    ? Object.entries(testimonialData)
    : [["id", <span>No Records Found</span>]];
  console.log(testimonialData, "userData from 67", userDetails);

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

export default Testimonial;
