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
  CSelect,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import MultiSelect from "../../../components/MultiSelectInput";

/** ***************************** Import Action ******************************** */
import { UpdateSystemUser } from "../../../redux/actions";
import inputMask from "../../../utils/inputMasking";
import cityStateData from "../../../utils/cityState.json";

const EditUserForms = (props) => {
  const [values] = useState({ ...props.userData });

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

  const formiq = useFormik({
    initialValues: {
      orgId: values.orgId.organizationName,
      OrganizationAccessIds: values.OrganizationAccessIds,
      firstName: values.firstName,
      lastName: values.lastName,
      personalEmail: values.personalEmail,
      workEmail: values.workEmail,
      clinicalTitle: values.clinicalTitle,
      password: values.password,
      telmediqNumber: values.telmediqNumber,
      mobileNumber: values.mobileNumber,
      role: values.role,
      address1: values.homeAddress.address1,
      address2: values.homeAddress.address2,
      city: values.homeAddress.city,
      state: values.homeAddress.state,
      zipCode: values.homeAddress.zipCode,
    },

    validationSchema: yup.object({
      orgId: yup.string().required("Field should not be empty"),
      firstName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      lastName: yup
        .string()
        .matches(/^[A-Za-z]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      personalEmail: yup
        .string()
        .required("Field should not be empty")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      workEmail: yup
        .string()
        .required("Field should not be empty")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      clinicalTitle: yup.string().required("Field should not be empty"),
      // password: yup
      //   .string()
      //   .required("Please Enter your password")
      //   .matches(
      //     "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
      //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
      //   ),
      telmediqNumber: yup
        .number()
        .typeError("That doesn't look like a phone number")
        .integer("A phone number can't include a decimal point")
        .required("Field should not be empty"),
      // mobileNumber: yup
      //   .string()
      //   .required("Please Enter your password")
      //   .matches("^(?=.*[0-9]).{10}$", "Enter Valid Mobile Number"),
      address1: yup.string().required("Field should not be empty"),
      address2: yup.string().required("Field should not be empty"),
      city: yup.string().required("Field should not be empty"),
      state: yup.string().required("Field should not be empty"),
      zipCode: yup.string().required("Field should not be empty"),
      role: yup.string().required("Field should not be empty"),
    }),
    onSubmit: (userInputData) => {
      userInputData.homeAddress = {
        address1: userInputData.address1,
        address2: userInputData.address2,
        city: userInputData.city,
        state: userInputData.state,
        zipCode: userInputData.zipCode,
      };
      delete userInputData.address1;
      delete userInputData.address2;
      delete userInputData.city;
      delete userInputData.state;
      delete userInputData.zipCode;
      if (userInputData.role === "Admin") {
        userInputData.role = "admin";
      }
      if (userInputData.role === "User") {
        userInputData.role = "user";
      }
      if (userInputData.orgId) {
        props.getAllOrganizationsResponse.results.map((val) =>
          val.organizationName === userInputData.orgId
            ? (userInputData.orgId = val.id)
            : null
        );
      }
      props.UpdateSystemUser(userInputData, props.userData.id).then((res) => {
        if (responseHandler(res)) {
          props.getUpdatedData();
        }
      });
      // formiq.values.orgId = "";
      // formiq.values.OrganizationAccessIds = [];
      // formiq.values.firstName = "";
      // formiq.values.lastName = "";
      // formiq.values.personalEmail = "";
      // formiq.values.workEmail = "";
      // formiq.values.clinicalTitle = "";
      // formiq.values.password = "";
      // formiq.values.telmediqNumber = "";
      // formiq.values.mobileNumber = "";
      // formiq.values.role = "";
      // formiq.values.address1 = "";
      // formiq.values.address2 = "";
      // formiq.values.city = "";
      // formiq.values.state = "";
      // formiq.values.zipCode = "";
    },
  });
  const options = props.getAllOrganizationsResponse.results.map((val) => ({
    value: val.id,
    label: val.organizationName,
  }));
  const orgIdProps = props.getAllOrganizationsResponse.results.map((val) => (
    <option key={val.id}>{val.organizationName}</option>
  ));
  // const cityData = [];
  // const stateData = [];
  // Object.keys(cityStateData).forEach((e, i) => {
  //   cityData.push(e);
  // });
  // const city = cityData.map((city, i) => <option key={ i }>{city}</option>);
  // let stateResult = null;
  // if (formiq.values.city !== "" && formiq.values.city) {
  //   console.log(formiq.values.city, "formik");
  //   Object.values(cityStateData[formiq.values.city]).forEach((e) => stateData.push(e));
  //   stateResult = stateData.map((state, i) => <option key={ i }>{state}</option>);
  // }

  const cityData = [];
  const stateData = [];
  Object.keys(cityStateData).forEach((e, i) => {
    stateData.push(e);
  });
  const state = stateData.map((state, i) => <option key={i}>{state}</option>);
  let cityResult = null;
  console.log("Formik Values:", formiq.values);
  if (formiq.values.state && formiq.values.state !== "") {
    Object.values(cityStateData[formiq.values.state]).forEach((e) =>
      cityData.push(e)
    );
    cityResult = cityData.map((city, i) => <option key={i}>{city}</option>);
  }
  // {
  //   console.log(val.id, "from valure", values.orgId.id, "lsdjflskjlk");
  //   val.id === values.orgId.id
  //     ? (formiq.values.orgId = val.organizationName)
  //     : null;
  //   return val.id === values.orgId.id ? (
  //     <option key={ val.id } defaultValue>
  //       {val.organizationName}
  //     </option>
  //   ) : (
  //     <option key={ val.id }>{val.organizationName}</option>
  //   );
  // });
  // if (values.orgId) {
  // val.organizationName === values.orgId
  //   ? (values.orgId = val.id)
  //   : null;
  // }

  const defaultValueFilter = options.filter((e) =>
    values.OrganizationAccessIds.includes(e.value)
  );

  return (
    <>
      <CRow>
        <CCol lg="12" xs="12" sm="6">
          <CForm autoComplete="off">
            <CFormGroup row className="my-0">
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="company">
                    First Name
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="firstName"
                    className={
                      formiq.errors.firstName && formiq.touched.firstName
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter First Name"
                    name="firstName"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.firstName}
                  />
                  {formiq.errors.firstName && formiq.touched.firstName && (
                    <div className="text-danger">{formiq.errors.firstName}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="vat">
                    Last Name
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="lastName"
                    className={
                      formiq.errors.lastName && formiq.touched.lastName
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Last Name"
                    name="lastName"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.lastName}
                  />
                  {formiq.errors.lastName && formiq.touched.lastName && (
                    <div className="text-danger">{formiq.errors.lastName}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Personal Email
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="personalEmail"
                    className={
                      formiq.errors.personalEmail &&
                      formiq.touched.personalEmail
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Personal Email"
                    name="personalEmail"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.personalEmail}
                  />
                  {formiq.errors.personalEmail &&
                    formiq.touched.personalEmail && (
                      <div className="text-danger">
                        {formiq.errors.personalEmail}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Work Email
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="workEmail"
                    className={
                      formiq.errors.workEmail && formiq.touched.workEmail
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Work Email"
                    name="workEmail"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.workEmail}
                  />
                  {formiq.errors.workEmail && formiq.touched.workEmail && (
                    <div className="text-danger">{formiq.errors.workEmail}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Professional Title
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="clinicalTitle"
                    className={
                      formiq.errors.clinicalTitle &&
                      formiq.touched.clinicalTitle
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Professional Title"
                    name="clinicalTitle"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.clinicalTitle}
                  >
                    <option defaultValue>
                      {formiq.values.clinicalTitle}
                    </option>
                    {formiq.values.clinicalTitle !== "MD" ? (
                      <option>MD</option>
                    ) : null}
                    {formiq.values.clinicalTitle !== "DO" ? (
                      <option>DO</option>
                    ) : null}
                    {formiq.values.clinicalTitle !== "NP" ? (
                      <option>NP</option>
                    ) : null}
                    {formiq.values.clinicalTitle !== "PA" ? (
                      <option>PA</option>
                    ) : null}
                  </CSelect>
                  {formiq.errors.clinicalTitle &&
                    formiq.touched.clinicalTitle && (
                      <div className="text-danger">
                        {formiq.errors.clinicalTitle}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    Role
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="role"
                    className={
                      formiq.errors.role && formiq.touched.role
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="role"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.role}
                  >
                    {formiq.values.role !== "admin" ? (
                      <option>Admin</option>
                    ) : null}
                    {formiq.values.role !== "user" ? (
                      <option>User</option>
                    ) : null}
                    <option defaultValue>{formiq.values.role}</option>
                  </CSelect>
                  {formiq.errors.role && formiq.touched.role && (
                    <div className="text-danger">{formiq.errors.role}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="city">
                    Telmedic Number
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="telmediqNumber"
                    className={
                      formiq.errors.telmediqNumber &&
                      formiq.touched.telmediqNumber
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Telmediq Number"
                    name="telmediqNumber"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.telmediqNumber}
                  />
                  {formiq.errors.telmediqNumber &&
                    formiq.touched.telmediqNumber && (
                      <div className="text-danger">
                        {formiq.errors.telmediqNumber}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="postal-code">
                    Mobile Number
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="mobileNumber"
                    className={
                      formiq.errors.mobileNumber && formiq.touched.mobileNumber
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    onChange={(e) => {
                      const maskedValue = inputMask("mobile", e);
                      formiq.setFieldValue("mobileNumber", maskedValue);
                    }}
                    onBlur={formiq.handleBlur}
                    value={inputMask(
                      "mobile",
                      null,
                      formiq.values.mobileNumber
                    )}
                  />
                  {formiq.errors.mobileNumber &&
                    formiq.touched.mobileNumber && (
                      <div className="text-danger">
                        {formiq.errors.mobileNumber}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    Organization
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="orgId"
                    className={
                      formiq.errors.orgId && formiq.touched.orgId
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="orgId"
                    name="orgId"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.orgId}
                  >
                    <option defaultValue>{formiq.values.orgId}</option>
                    {orgIdProps}
                  </CSelect>
                  {formiq.errors.orgId && formiq.touched.orgId && (
                    <div className="text-danger">{formiq.errors.orgId}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Organizational Access
                    <span className="text-danger">*</span>
                  </CLabel>
                  <MultiSelect
                    className={
                      formiq.errors.OrganizationAccessIds &&
                      formiq.touched.OrganizationAccessIds
                        ? "inputError"
                        : "inputUser"
                    }
                    defaultValue={defaultValueFilter}
                    onChange={(val) => {
                      const data = [];
                      val.forEach((e) => data.push(e.value));
                      return formiq.setFieldValue(
                        "organizationAccessIds",
                        data
                      );
                    }}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.OrganizationAccessIds}
                    options={options}
                  />
                  {formiq.errors.OrganizationAccessIds &&
                    formiq.touched.OrganizationAccessIds && (
                      <div className="text-danger">
                        {formiq.errors.OrganizationAccessIds}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="address1">Address 1</CLabel>
                  <CInput
                    id="address1"
                    className={
                      formiq.errors.address1 && formiq.touched.address1
                        ? "inputError"
                        : "inputUser"
                    }
                    name="address1"
                    onChange={formiq.handleChange}
                    value={formiq.values.address1}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.address1 && formiq.touched.address1 ? (
                    <div style={{ color: "red" }}>{formiq.errors.address1}</div>
                  ) : null}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="address2">Address 2</CLabel>
                  <CInput
                    id="address2"
                    className={
                      formiq.errors.address2 && formiq.touched.address2
                        ? "inputError"
                        : "inputUser"
                    }
                    name="address2"
                    onChange={formiq.handleChange}
                    value={formiq.values.address2}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.address2 && formiq.touched.address2 ? (
                    <div style={{ color: "red" }}>{formiq.errors.address2}</div>
                  ) : null}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    State
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="state"
                    className={
                      formiq.errors.clinicalTitle &&
                      formiq.touched.clinicalTitle
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="state"
                    name="state"
                    onChange={formiq.handleChange}
                    value={formiq.values.state}
                  >
                    <option value="">Choose</option>
                    {state}
                  </CSelect>
                  {formiq.errors.city && formiq.touched.city && (
                    <div className="text-danger">{formiq.errors.city}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    City
                    <span className="text-danger">*</span>
                  </CLabel>

                  <CSelect
                    id="city"
                    className={
                      formiq.errors.clinicalTitle &&
                      formiq.touched.clinicalTitle
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="City"
                    name="city"
                    onChange={formiq.handleChange}
                    value={formiq.values.city}
                  >
                    <option value="">Choose</option>
                    {cityResult}
                  </CSelect>
                  {formiq.errors.state && formiq.touched.state && (
                    <div className="text-danger">{formiq.errors.state}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="zipCode">
                    Zip Code
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="zipCode"
                    className={
                      formiq.errors.zipCode && formiq.touched.zipCode
                        ? "inputError"
                        : "inputUser"
                    }
                    name="zipCode"
                    onChange={formiq.handleChange}
                    value={formiq.values.zipCode}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.zipCode && formiq.touched.zipCode ? (
                    <div style={{ color: "red" }}>{formiq.errors.zipCode}</div>
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
                onClick={props.changeUpdateUserModelState}
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

const mapStateToProps = (state) => ({
  updateSystemUserResponse: state.SystemUser.storeSystemUserResponse,
  updateSystemUserError: state.SystemUser.error,
  preLoader: state.SystemUser.loading,
  getAllOrganizationsResponse: state.Organization.storeOrganizationResponse,
  getAllOrganizationsError: state.Organization.error,
  getAllOrganizationsPreLoader: state.Organization.loading,
});
const mapDispatchToProps = (dispatch) => ({
  UpdateSystemUser: (data, userId) => dispatch(UpdateSystemUser(data, userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditUserForms);
