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
  CTextarea
  // CSelect,
} from "@coreui/react";
// import NewJoineeIcon from "../../assets/icons/new-joinee-icon.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import ImageUploading from "react-images-uploading";
// import NewJoineeIcon from "../../assets/icons/new-joinee-icon.png";

// import MultiSelect from "../../components/MultiSelectInput";

/** *************** API import ******************** */
import { getTestimonialList } from "../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateTestimonial } from "../../redux/actions";

/** ***************************** Import Utils ******************************** */
// import cityStateData from "../../utils/cityState.json";

const AddTestimonial = (props) => {
  const [page] = React.useState(0);
  const [images, setImages] = React.useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    const imagedata = imageList;
    // const changeFieldNames = imagedata.map((fields) => ({
    //   // data: fields[0]
    // }));
    if (imagedata[0]) {
      const data = imagedata[0]?.data_url;
      setImages(data);
    }
  };
  const formiq = useFormik({
    initialValues: {
      companyName: "",
      description: "",
      contactPerson: "",
      designation: "",
      // skillsRequired: "",
      // jobDescription: "",
      // jobType: "",
      // schedule: "",
    },
    validationSchema: yup.object({
      companyName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid companyName ")
        .required("Field should not be empty"),
      description: yup.string().required("Field should not be empty"),
      contactPerson: yup.string().required("Field should not be empty"),
      designation: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid designation ")
        .required("Field should not be empty"),
    }),
    onSubmit: async (testimonialInputData) => {
      const temp = { ...testimonialInputData };
      temp.image = images;
      console.log(temp);
      await props.CreateTestimonial(temp).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getTestimonialList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });
      formiq.values.companyName = "";
      formiq.values.description = "";
      formiq.values.contactPerson = "";
      formiq.values.designation = "";
      formiq.values.image = "";

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
  const maxNumber = 1;
  return (
    <>
      <CRow>
        <CCol lg="12" xs="12" sm="6">
          <CForm autoComplete="off">
            <CFormGroup className="userIcon">
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <CButton
                      // style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      // style={{ backgroundColor: "red", color: "white" }}
                    // {...dragProps}
                    >
                      Upload image
                    </CButton>
                    {/* <img
                      src={images ? images : NewJoineeIcon}
                      alt="newJoineeIcon"
                      width="90"
                      height="90px"
                      className="img-fluid"
                      onClick={onImageUpload}
                    /> */}
                    &nbsp;
                    <div>
                      <img src={images} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <CButton onClick={() => onImageRemove()}>
                          Remove
                        </CButton>
                      </div>
                    </div>
                  </div>
                )}
              </ImageUploading>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="company">
                    Company Name
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="jobPosition"
                    className={
                      formiq.errors.jobPosition && formiq.touched.jobPosition
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter company name"
                    name="companyName"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.companyName}
                  />
                  {formiq.errors.companyName && formiq.touched.companyName && (
                    <div className="text-danger">
                      {formiq.errors.companyName}
                    </div>
                  )}
                </CFormGroup>
              </CCol>
              {/* <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="vat">
                    description
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="description"
                    className={
                      formiq.errors.description && formiq.touched.description
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter description"
                    name="description"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.description}
                  />
                  {formiq.errors.description && formiq.touched.description && (
                    <div className="text-danger">
                      {formiq.errors.description}
                    </div>
                  )}
                </CFormGroup>
              </CCol> */}
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    Contact Person
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="contactPerson"
                    className={
                      formiq.errors.contactPerson &&
                        formiq.touched.contactPerson
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter contactPerson"
                    name="contactPerson"
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
            </CFormGroup>
            <CFormGroup row className="my-0">

              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="street">
                    designation
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CInput
                    id="designation"
                    className={
                      formiq.errors.designation && formiq.touched.designation
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter designation"
                    name="designation"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.designation}
                  />
                  {formiq.errors.designation && formiq.touched.designation && (
                    <div className="text-danger">
                      {formiq.errors.designation}
                    </div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="vat">
                    description
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CTextarea
                    id="description"
                    className={
                      formiq.errors.description && formiq.touched.description
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter description"
                    name="description"
                    type="textarea"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.description}
                  />
                  {formiq.errors.description && formiq.touched.description && (
                    <div className="text-danger">
                      {formiq.errors.description}
                    </div>
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

const mapStateToProps = (state) => ({
  createSystemUserResponse: state.SystemUser.storeSystemUserResponse,
  createUserError: state.SystemUser.error,
  preLoader: state.SystemUser.loading,
});
const mapDispatchToProps = (dispatch) => ({
  CreateTestimonial: (data) => dispatch(CreateTestimonial(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTestimonial);
