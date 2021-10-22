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
      category: values.category,
      // qualification: values.qualification,

    },

    validationSchema: yup.object({
      category: yup
        .string()
        .required("Field should not be empty"),
      // qualification: yup
      //   .string()
      //   .required("Field should not be empty"),

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
                    Job Position
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="category"
                    className={
                      formiq.errors.category && formiq.touched.category
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Job Position"
                    name="category"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.category}
                  />
                  {formiq.errors.category && formiq.touched.category && (
                    <div className="text-danger">{formiq.errors.category}</div>
                  )}
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
