/** **************************** Import Libs ****************************** */
import React from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
 // CSelect,
  // CTextarea
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
// import MultiSelect from "../../components/MultiSelectInput";

/** *************** API import ******************** */
import { getUserList } from "../../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateBlogPostSetting } from "../../../redux/actions";

/** ***************************** Import Utils ******************************** */
// import cityStateData from "../../utils/cityState.json";

const AddUsers = (props) => {
  const [page] = React.useState(0);

  const formiq = useFormik({
    initialValues: {
      categoryName: "",
      // qualification: "",
      // experience: "",
      // jobLocation: "",
      // skillsRequired: "",
      // jobDescription: "",
      // jobType: "",
      // schedule: "",

    },
    validationSchema: yup.object({
      categoryName: yup
        .string()
        .required("Field should not be empty"),
      // qualification: yup.string().required("Field should not be empty"),
      // experience: yup.string().required("Field should not be empty"),
      // jobLocation: yup
      //   .string()
      //   .matches(/^[A-Za-z ]*$/, "Please enter valid jobLocation")
      //   .required("Field should not be empty"),
      // skillsRequired: yup.string().required("Field should not be empty"),
      // jobDescription: yup.string().required("Field should not be empty"),
      // jobType: yup.string().required("Field should not be empty"),
      // schedule: yup.string().required("Field should not be empty"),
    }),
    onSubmit: async (blogPostSettingInputData) => {
      await props.CreateBlogPostSetting(blogPostSettingInputData).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getUserList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });
      formiq.values.categoryName = "";
      // formiq.values.qualification = "";
      // formiq.values.experience = "";
      // formiq.values.jobLocation = "";
      // formiq.values.jobDescription = "";
      // formiq.values.jobType = "";
      // formiq.values.schedule = "";
      // formiq.values.skillsRequired = "";
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
                    Add categoryName
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="address2"
                    className={
                      formiq.errors.categoryName && formiq.touched.categoryName
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Category"
                    name="categoryName"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.categoryName}
                  />
                  {formiq.errors.categoryName && formiq.touched.categoryName && (
                    <div className="text-danger">{formiq.errors.categoryName}</div>
                  )}
                </CFormGroup>
              </CCol>
              {/* <CCol md="6">
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
              </CCol> */}
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
  CreateBlogPostSetting: (data) => dispatch(CreateBlogPostSetting(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
