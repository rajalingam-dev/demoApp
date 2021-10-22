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
      jobPosition: values.jobPosition,
      qualification: values.qualification,
      experience: values.experience,
      jobLocation: values.jobLocation,
      skillsRequired: values.skillsRequired,
      jobDescription: values.jobDescription,
      jobType: values.jobType,
      schedule: values.schedule,
    },

    validationSchema: yup.object({
      orgId: yup.string().required("Field should not be empty"),
      jobPosition: yup
        .string()
        .required("Field should not be empty"),
      qualification: yup
        .string()
        .required("Field should not be empty"),
      experience: yup
        .string()
        .required("Field should not be empty"),
      jobLocation: yup
        .string()
        .required("Field should not be empty"),
      skillsRequired: yup
        .string()
        .required("Please Enter your skillsRequired")
        .matches(
          "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ),
      jobDescription: yup
        .string()
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
                    Auther Name
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="jobPosition"
                    className={
                      formiq.errors.jobPosition && formiq.touched.jobPosition
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Name"
                    name="name"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.jobPosition}
                  />
                  {formiq.errors.jobPosition && formiq.touched.jobPosition && (
                    <div className="text-danger">{formiq.errors.jobPosition}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="vat">
                    Qualification
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="qualification"
                    className={
                      formiq.errors.qualification && formiq.touched.qualification
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Qualification"
                    name="qualification"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.qualification}
                  />
                  {formiq.errors.qualification && formiq.touched.qualification && (
                    <div className="text-danger">{formiq.errors.qualification}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Experience
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="experience"
                    className={
                      formiq.errors.experience &&
                        formiq.touched.experience
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Experience"
                    name="experience"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.experience}
                  />
                  {formiq.errors.experience &&
                    formiq.touched.experience && (
                      <div className="text-danger">
                        {formiq.errors.experience}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Job Location
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="jobLocation"
                    className={
                      formiq.errors.jobLocation && formiq.touched.jobLocation
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Job Location"
                    name="jobLocation"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.jobLocation}
                  />
                  {formiq.errors.jobLocation && formiq.touched.jobLocation && (
                    <div className="text-danger">{formiq.errors.jobLocation}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
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
            </CFormGroup>
            <CFormGroup row className="my-0">
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
