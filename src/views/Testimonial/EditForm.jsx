/** **************************** Import Libs ****************************** */
import React, { useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
// import { connect } from "react-redux";

/** ***************************** Import Action ******************************** */
// import { UpdateSystemUser } from "../../redux/actions";

const EditUserForms = (props) => {
  const [values] = useState({ ...props.userData });

  /** *********************************Response Handler*************************************** */
  const formiq = useFormik({
    initialValues: {
      companyName: values.companyName,
      description: values.description,
      contactPerson: values.contactPerson,
      designation: values.designation,
      // skillsRequired: values.skillsRequired,
      // jobDescription: values.jobDescription,
      // jobType: values.jobType,
      // schedule: values.schedule,
    },

    validationSchema: yup.object({
      orgId: yup.string().required("Field should not be empty"),
      companyName: yup
        .string()
        .required("Field should not be empty"),
      description: yup
        .string()
        .required("Field should not be empty"),
      contactPerson: yup
        .string()
        .required("Field should not be empty"),
      designation: yup
        .string()
        .required("Field should not be empty"),


    }),
    onSubmit: (userInputData) => {
      console.log(userInputData, "from onsubmit");
    },
  });

  return (
    <>
      <CRow>
        <CCol lg="12" xs="12" sm="6">
          <CForm autoComplete="off">
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="company">
                    Company Name
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="companyName "
                    className={
                      formiq.errors.companyName && formiq.touched.companyName
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Company Name"
                    name="companyName "
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.companyName}
                  />
                  {formiq.errors.companyName && formiq.touched.companyName && (
                    <div className="text-danger">{formiq.errors.companyName}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="vat">
                    Description
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="description "
                    className={
                      formiq.errors.description && formiq.touched.description
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Description"
                    name="description "
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.description}
                  />
                  {formiq.errors.description && formiq.touched.description && (
                    <div className="text-danger">{formiq.errors.description}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Contact Person
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="contactPerson "
                    className={
                      formiq.errors.contactPerson &&
                        formiq.touched.contactPerson
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter contact Person"
                    name="contactPerson "
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.contactPerson}
                  />
                  {formiq.errors.contactPerson &&
                    formiq.touched.contactPerson && (
                      <div className="text-danger">
                        {formiq.errors.contactPerson}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Designation
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="designation "
                    className={
                      formiq.errors.designation && formiq.touched.designation
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Designation"
                    name="designation "
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.designation}
                  />
                  {formiq.errors.designation && formiq.touched.designation && (
                    <div className="text-danger">{formiq.errors.designation}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            {/* <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="skillsRequired">Skills Required</CLabel>
                  <CInput
                    id="skillsRequired"
                    className={
                      formiq.errors.skillsRequired && formiq.touched.skillsRequired
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Skills Required"
                    name="skillsRequired"
                    onChange={formiq.handleChange}
                    value={formiq.values.skillsRequired}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.skillsRequired && formiq.touched.skillsRequired ? (
                    <div style={{ color: "red" }}>{formiq.errors.skillsRequired}</div>
                  ) : null}
                </CFormGroup>
              </CCol>

              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="jobDescription">Job Description</CLabel>
                  <CInput
                    id="jobDescription"
                    className={
                      formiq.errors.jobDescription && formiq.touched.jobDescription
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Job Description"
                    name="jobDescription"
                    onChange={formiq.handleChange}
                    value={formiq.values.jobDescription}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.jobDescription && formiq.touched.jobDescription ? (
                    <div style={{ color: "red" }}>{formiq.errors.jobDescription}</div>
                  ) : null}
                </CFormGroup>
              </CCol>
            </CFormGroup> */}
            {/* <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="skillsRequired">Job Type</CLabel>
                  <CInput
                    id="jobType"
                    className={
                      formiq.errors.skillsRequired && formiq.touched.skillsRequired
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Job Type Required"
                    name="jobType"
                    onChange={formiq.handleChange}
                    value={formiq.values.jobType}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.jobType && formiq.touched.jobType ? (
                    <div style={{ color: "red" }}>{formiq.errors.jobType}</div>
                  ) : null}
                </CFormGroup>
              </CCol>

              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="schedule">schedule</CLabel>
                  <CInput
                    id="schedule"
                    className={
                      formiq.errors.schedule && formiq.touched.schedule
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Job Description"
                    name="schedule"
                    onChange={formiq.handleChange}
                    value={formiq.values.schedule}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.schedule && formiq.touched.schedule ? (
                    <div style={{ color: "red" }}>{formiq.errors.schedule}</div>
                  ) : null}
                </CFormGroup>
              </CCol>
            </CFormGroup> */}
            <CFormGroup row className="my-0">

              <CCol md="6">
                {/* <CFormGroup>
                <CLabel htmlFor="address2">Address 2</CLabel>
                <CInput
                  id="address2"
                  className={
                    formiq.errors.address2 && formiq.touched.address2
                      ? "inputError"
                      : "inputUser"
                  }
                  name="address2"
                  placeholder="Enter Address 2"
                  onChange={formiq.handleChange}
                  value={formiq.values.address2}
                  onBlur={formiq.handleBlur}
                />
                {formiq.errors.address2 && formiq.touched.address2 ? (
                  <div style={{ color: "red" }}>{formiq.errors.address2}</div>
                ) : null}
              </CFormGroup> */}
              </CCol>
            </CFormGroup>

            <CFormGroup style={{ float: "right" }}>
              <CButton
                onClick={formiq.handleSubmit}
                type="submit"
                className={
                  !(formiq.dirty && formiq.isValid) ? "disabled-btn" : ""
                }
                className="submitBtn"
                disabled={!(formiq.dirty && formiq.isValid)}
              >
                Submit
              </CButton>
              <CButton
                onClick={props.changeAddUserModelState}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Cancel
              </CButton>
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </>
  );
};

export default EditUserForms;
