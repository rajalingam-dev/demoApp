/** **************************** Import Libs ****************************** */
import React from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  // CInput,
  CLabel,
  CRow,
  CSelect, CTextarea
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
// import MultiSelect from "../../components/MultiSelectInput";

/** *************** API import ******************** */
import { getUserList } from "../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateJobPost } from "../../redux/actions";

/** ***************************** Import Utils ******************************** */
// import cityStateData from "../../utils/cityState.json";

const AddUsers = (props) => {
  const [page] = React.useState(0);

  const formiq = useFormik({
    initialValues: {
      jobPosition: "",
      qualification: "",
      experience: "",
      jobLocation: "",
      skillsRequired: "",
      jobDescription: "",
      jobType: "",
      schedule: "",

    },
    validationSchema: yup.object({
      jobPosition: yup
        .string()
        .required("Field should not be empty"),
      qualification: yup.string().required("Field should not be empty"),
      experience: yup.string().required("Field should not be empty"),
      jobLocation: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid jobLocation")
        .required("Field should not be empty"),
      skillsRequired: yup.string().required("Field should not be empty"),
      jobDescription: yup.string().required("Field should not be empty"),
      jobType: yup.string().required("Field should not be empty"),
      schedule: yup.string().required("Field should not be empty"),
    }),
    onSubmit: async (jobPostInputData) => {
      await props.CreateJobPost(jobPostInputData).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getUserList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });
      formiq.values.jobPosition = "";
      formiq.values.qualification = "";
      formiq.values.experience = "";
      formiq.values.jobLocation = "";
      formiq.values.jobDescription = "";
      formiq.values.jobType = "";
      formiq.values.schedule = "";
      formiq.values.skillsRequired = "";
      // formiq.values.address2 = "";
      // formiq.values.city = "";
      // formiq.values.state = "";
      // formiq.values.zipCode = "";
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
                  <CLabel htmlFor="country">
                    Job Position
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="jobPosition"
                    className={
                      formiq.errors.jobPosition && formiq.touched.jobPosition
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="jobPosition"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.jobPosition}
                  >
                    <option value="">Choose</option>
                    <option>React JS Developer</option>
                    <option>Senior React JS Developer</option>
                    <option>React Native Developer</option>
                    <option>Senior React Native Developer</option>
                    <option>MERN Stack </option>
                    <option>Bussiness Development Executive</option>
                    <option>Bussiness Development Manager</option>
                    <option>Node Js Developer</option>
                    <option>Senior Node Js Developer</option>
                    <option>Fullstack Developer</option>
                    <option>Senior Fullstack Developer</option>
                    <option>UI/UX Designer</option>
                    <option>Tech Lead Engineer</option>
                    <option>Cloud Engineer</option>
                    <option>System Engineer</option>
                    <option>SEO Analyst</option>
                    <option>HR Analyst</option>
                  </CSelect>
                  {formiq.errors.jobPosition && formiq.touched.jobPosition && (
                    <div className="text-danger">{formiq.errors.jobPosition}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                {/* <CFormGroup>
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
                </CFormGroup> */}
                <CFormGroup>
                  <CLabel htmlFor="country">
                    Qualification
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="qualification"
                    className={
                      formiq.errors.qualification && formiq.touched.qualification
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="qualification"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.qualification}
                  >
                    <option value="">Choose</option>
                    <option>BSC/BCA</option>
                    <option>MSC/MCA</option>
                    <option>BE/B.Tech</option>
                    <option>B.E/M.E/B.tech/M.tech/MCA</option>
                    <option>Any Degree</option>
                  </CSelect>
                  {formiq.errors.qualification && formiq.touched.qualification && (
                    <div className="text-danger">{formiq.errors.qualification}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                {/* <CFormGroup>
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
                </CFormGroup> */}
                <CFormGroup>
                  <CLabel htmlFor="country">
                    experience
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="experience"
                    className={
                      formiq.errors.experience && formiq.touched.experience
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="experience"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.experience}
                  >
                    <option value="">Choose</option>
                    <option>Fresher - 1 Year</option>
                    <option>1-2 Year</option>
                    <option>2-3 Year</option>
                    <option>3-5 Year</option>

                  </CSelect>
                  {formiq.errors.experience && formiq.touched.experience && (
                    <div className="text-danger">{formiq.errors.experience}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    Job Location
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="jobLocation"
                    className={
                      formiq.errors.jobLocation && formiq.touched.jobLocation
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="jobLocation"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.jobLocation}
                  >
                    <option value="">Choose</option>
                    <option>Tirupur</option>

                  </CSelect>
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
                  <CTextarea
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
                  <CTextarea
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
                  <CLabel htmlFor="country">
                    Job Type
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="jobType"
                    className={
                      formiq.errors.jobType && formiq.touched.jobType
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="jobType"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.jobType}
                  >
                    <option value="">Choose</option>
                    <option>Full Time</option>
                    <option>Part Time</option>

                  </CSelect>
                  {formiq.errors.jobType && formiq.touched.jobType && (
                    <div className="text-danger">{formiq.errors.jobType}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    Schedule
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="schedule"
                    className={
                      formiq.errors.schedule && formiq.touched.schedule
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Role"
                    name="schedule"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.schedule}
                  >
                    <option value="">Choose</option>
                    <option>Monday-Friday</option>

                  </CSelect>
                  {formiq.errors.schedule && formiq.touched.schedule && (
                    <div className="text-danger">{formiq.errors.schedule}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
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

const mapStateToProps = (state) => ({
  createSystemUserResponse: state.SystemUser.storeSystemUserResponse,
  createUserError: state.SystemUser.error,
  preLoader: state.SystemUser.loading,

});
const mapDispatchToProps = (dispatch) => ({
  CreateJobPost: (data) => dispatch(CreateJobPost(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
