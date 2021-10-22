/** **************************** Import Packages ****************************** */
import React, { useState } from "react";
// import GitInfo from "react-git-info/macro";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CRow,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
// import { env } from "../../config";

/** ********************************* CSS ************************************* */
import "./login.css";

/** ***************************** Import Action ******************************** */
import { LoginUser } from "../../redux/actions";

/** ***************************** Import Images ******************************** */
// import LoginLogo from "../../assets/images/login_logo.png";

const Login = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const formiq = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      password: yup
        .string()
        .required("Password is required")
        .min(5, "Minimum 5 characters is required"),
    }),
    onSubmit: (userInputDate) => {
      props.LoginUser(userInputDate);
      formiq.values.email = "";
      formiq.values.password = "";
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center login-main">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <div className="row w-26">
              <div className="col-12 mb-4 text-center">
                <img
                  src="https://www.applogiq.in/assets/images/signature-logo.png"
                  className="img-fluid"
                  width="250px"
                  height="100px"
                  alt="loginLogo"
                />
              </div>
            </div>
            <CForm autoComplete="off">
              <CInput
                type="text"
                placeholder="Enter your email"
                className="login-input"
                name="email"
                onChange={ formiq.handleChange }
                onBlur={ formiq.handleBlur }
                value={ formiq.values.email }
              />
              {formiq.errors.email && formiq.touched.email && (
                <div className="text-danger">{formiq.errors.email}</div>
              )}

              <CFormGroup className="eyePosition">
                <CInput
                  type="password"
                  placeholder="Password"
                  type={ passwordShown ? "text" : "password" }
                  name="password"
                  className="login-input mt-4"
                  onChange={ formiq.handleChange }
                  onBlur={ formiq.handleBlur }
                  value={ formiq.values.password }
                />
                <i
                  className={ `fa ${
                    passwordShown ? "fa-eye" : "fa-eye-slash"
                  } password-icon` }
                  onClick={ () => setPasswordShown(!passwordShown) }
                />
              </CFormGroup>
              {formiq.errors.password && formiq.touched.password && (
                <div className="text-danger">{formiq.errors.password}</div>
              )}
              <CRow>
                <CCol xs="12">
                  <CButton
                    color="primary"
                    onClick={ formiq.handleSubmit }
                    className="px-4"
                    className="login-button mt-5"
                  >
                    {props.preLoader ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm ml-2"
                          role="status"
                          aria-hidden="false"
                        />
                        <span className="sr-only">Loading...</span>
                      </>
                    ) : (
                      "LOGIN"
                    )}
                  </CButton>
                  {/* {env !== 3 ? (
                    <div>
                      <p className="mt-3">
                        <span style={ { fontWeight: "bold" } }>Commit Id:</span>
                        {GitInfo().commit.hash}
                      </p>
                      <p className="mt-3">
                        <span style={ { fontWeight: "bold" } }>Message:</span>
                        {GitInfo().commit.message}
                      </p>
                      <p className="mt-3">
                        <span style={ { fontWeight: "bold" } }>Date:</span>
                        {GitInfo().commit.date.split("T")[0]}
                      </p>
                    </div>
                  ) : null} */}
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginResponse: state.login.storeLoginResponse,
  loginError: state.login.error,
  preLoader: state.login.loading,
});
const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data) => dispatch(LoginUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
