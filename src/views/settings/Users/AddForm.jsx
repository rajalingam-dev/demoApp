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

/** *************** API import ******************** */
import { getUserList } from "../../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateSystemUser } from "../../../redux/actions";
import inputMask from "../../../utils/inputMasking";

/** ***************************** Import Utils ******************************** */
import cityStateData from "../../../utils/cityState.json";

const AddUsers = (props) => {
  const [page] = React.useState(0);
  const [passwordShown, setPasswordShown] = useState(false);

  const formiq = useFormik({
    initialValues: {
      orgId: "",
      OrganizationAccessIds: [],
      firstName: "",
      lastName: "",
      personalEmail: "",
      workEmail: "",
      clinicalTitle: "",
      password: "",
      conformPassword: "",
      telmediqNumber: "",
      mobileNumber: "",
      role: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
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
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      conformPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "Conform password and password must be same"
        )
        .required("Please enter conform password"),
      telmediqNumber: yup
        .number()
        .typeError("That doesn't look like a phone number")
        .integer("A phone number can't include a decimal point")
        .required("Field should not be empty"),
      // mobileNumber: yup
      //   .string()
      //   .required("Please Enter your mobile Number")
      //   .matches("^(?=.*[0-9]).{10}$", "Enter Valid Mobile Number"),
      address1: yup.string().required("Field should not be empty"),
      address2: yup.string().required("Field should not be empty"),
      city: yup.string().required("Field should not be empty"),
      state: yup.string().required("Field should not be empty"),
      zipCode: yup.string().required("Field should not be empty"),
      // city: yup.string().required("Field should not be empty"),
      // state: yup.string().required("Field should not be empty"),
      role: yup.string().required("Field should not be empty"),
    }),
    onSubmit: async (userInputData) => {
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
      delete userInputData.conformPassword;
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
      await props.CreateSystemUser(userInputData).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getUserList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });
      formiq.values.orgId = "";
      formiq.values.OrganizationAccessIds = [];
      formiq.values.firstName = "";
      formiq.values.lastName = "";
      formiq.values.personalEmail = "";
      formiq.values.workEmail = "";
      formiq.values.clinicalTitle = "";
      formiq.values.password = "";
      formiq.values.telmediqNumber = "";
      formiq.values.mobileNumber = "";
      formiq.values.role = "";
      formiq.values.address1 = "";
      formiq.values.address2 = "";
      formiq.values.city = "";
      formiq.values.state = "";
      formiq.values.zipCode = "";
    },
  });

  const options = props.getAllOrganizationsResponse.results.map((val) => ({
    value: val.id,
    label: val.organizationName,
  }));
  const orgIdProps = props.getAllOrganizationsResponse.results.map((val) => (
    <option key={val.id}>{val.organizationName}</option>
  ));

  // cityStateData.forEach((val) => console.log(val));
  const cityData = [];
  const stateData = [];
  Object.keys(cityStateData).forEach((e, i) => {
    stateData.push(e);
  });
  const state = stateData.map((state, i) => <option key={i}>{state}</option>);
  let cityResult = null;
  if (formiq.values.state && formiq.values.state !== "") {
    Object.values(cityStateData[formiq.values.state]).forEach((e) =>
      cityData.push(e)
    );
    cityResult = cityData.map((city, i) => <option key={i}>{city}</option>);
  }
  return (
    <>
      <CRow>
        <CCol lg="12" xs="12" sm="6">
          <CForm autoComplete="off">
            <CFormGroup row className="my-0">
              <CCol md="6">
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
              <CCol md="6">
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
              <CCol md="6">
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
              <CCol md="6">
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
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Password
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="password"
                    className={
                      formiq.errors.password && formiq.touched.password
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.password}
                  />
                  <i
                    className={`fa ${
                      passwordShown ? "fa-eye" : "fa-eye-slash"
                    } password-icon`}
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                  {formiq.errors.password && formiq.touched.password && (
                    <div className="text-danger">{formiq.errors.password}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Conform Password
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="conformPassword"
                    className={
                      formiq.errors.conformPassword &&
                      formiq.touched.conformPassword
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter Conform Password"
                    name="conformPassword"
                    type="password"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.conformPassword}
                  />
                  {formiq.errors.conformPassword &&
                    formiq.touched.conformPassword && (
                      <div className="text-danger">
                        {formiq.errors.conformPassword}
                      </div>
                    )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
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
              <CCol md="6">
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
                    value={formiq.values.mobileNumber}
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
              <CCol md="6">
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
                    <option value="">Choose</option>
                    {orgIdProps}
                  </CSelect>
                  {formiq.errors.orgId && formiq.touched.orgId && (
                    <div className="text-danger">{formiq.errors.orgId}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
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
                    defaultValue="defaultValueFilter"
                    onChange={(val) => {
                      const data = [];
                      val.forEach((e) => data.push(e.value));
                      return formiq.setFieldValue(
                        "OrganizationAccessIds",
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
                    <option value="">Choose</option>
                    <option>Admin</option>
                    <option>User</option>
                  </CSelect>
                  {formiq.errors.role && formiq.touched.role && (
                    <div className="text-danger">{formiq.errors.role}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
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
                    <option value="">Choose</option>
                    <option>MD</option>
                    <option>DO</option>
                    <option>NP</option>
                    <option>PA</option>
                  </CSelect>
                  {formiq.errors.clinicalTitle &&
                    formiq.touched.clinicalTitle && (
                      <div className="text-danger">
                        {formiq.errors.clinicalTitle}
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
                    placeholder="Enter Address 1"
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
                    placeholder="Enter Address 2"
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
                    placeholder="Enter Zip Code"
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

const mapStateToProps = (state) => ({
  createSystemUserResponse: state.SystemUser.storeSystemUserResponse,
  createUserError: state.SystemUser.error,
  preLoader: state.SystemUser.loading,
  getAllOrganizationsResponse: state.Organization.storeOrganizationResponse,
  getAllOrganizationsError: state.Organization.error,
  getAllOrganizationsPreLoader: state.Organization.loading,
});
const mapDispatchToProps = (dispatch) => ({
  CreateSystemUser: (data) => dispatch(CreateSystemUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
