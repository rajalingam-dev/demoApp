/** **************************** Import Libs ****************************** */
import React, { useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow, CCard,
  CSelect, CTextarea
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
// import MultiSelect from "../../components/MultiSelectInput";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
/** *************** API import ******************** */
import { getblogList, getcategoryList } from "../../api/list";
/** ***************************** Import Action ******************************** */
import { CreateBlogPost } from "../../redux/actions";
// import TextEditor from "../../components/TextEditor";
/** ***************************** Import Utils ******************************** */
// import cityStateData from "../../utils/cityState.json";

// import htmlToDraft from "html-to-draftjs";
const AddUsers = (props) => {
  const [page] = React.useState(0);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [data, setData] = useState();
  React.useEffect(() => {
    getcategoryList().then((res) => {
      if (res) {
        setData(res.data);
      }
    });
  }, []);
  // const [images, setImages] = React.useState([]);

  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   const imagedata = imageList;
  //   // const changeFieldNames = imagedata.map((fields) => ({
  //   //   // data: fields[0]
  //   // }));
  //   if (imagedata[0]) {
  //     const data = imagedata[0]?.data_url;
  //     setImages(data);
  //   }
  // };
  const formiq = useFormik({
    initialValues: {
      categoryId: "",
      authorName: "",
      title: "",
      description: "",
      content: "",
      // categoryId: "",
    },
    validationSchema: yup.object({
      categoryId: yup
        .string()
        .required("Field should not be empty"),
      authorName: yup.string().required("Field should not be empty"),
      title: yup.string().required("Field should not be empty"),
      description: yup.string().required("Field should not be empty"),
    }),
    onSubmit: async (blogPostInputData) => {
      const Inputdata = { ...blogPostInputData };
      // Inputdata.image = images;
      const categoryName = data?.filter((data, i) => data.categoryName === Inputdata.categoryId);
      if (categoryName.length) {
        Inputdata.categoryId = categoryName[0].id;
      }
      console.log("categoryName", categoryName);
      Inputdata.content = convertedContent;
      await props.CreateBlogPost(Inputdata).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getblogList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });

      formiq.values.categoryId = "";
      formiq.values.authorName = "";
      formiq.values.title = "";
      formiq.values.content = "";
      // formiq.values.blogImage = "";
      formiq.values.description = "";
      // formiq.values.image = "";
      // formiq.values.contentImage = "";
      // formiq.values.content = "";
      // formiq.values.viewer = "";
      // formiq.values.address2 = "";
      // formiq.values.city = "";
      // formiq.values.state = "";
      // formiq.values.zipCode = "";
    },
  });

  let categoryName = null;
  categoryName = data?.map((data, i) => <option key={i}>{data.categoryName}</option>);

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  console.log("123456789", data);
  return (
    <>

      <CRow>
        <CCol lg="12" xs="12" sm="6">
          <CForm autoComplete="off">
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="country">
                    Technology
                    <span className="text-danger">*</span>
                  </CLabel>
                  <CSelect
                    id="categoryId"
                    className={
                      formiq.errors.categoryId && formiq.touched.categoryId
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="categoryId"
                    name="categoryId"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.categoryId}
                  >
                    <option value="">Choose</option>
                    {categoryName}
                  </CSelect>
                  {formiq.errors.categoryId && formiq.touched.categoryId && (
                    <div className="text-danger">{formiq.errors.categoryId}</div>
                  )}
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="address2">Author Name</CLabel>
                  <CInput
                    id="address2"
                    className={
                      formiq.errors.authorName && formiq.touched.authorName
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Name"
                    name="authorName"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.authorName}
                  />
                  {formiq.errors.authorName && formiq.touched.authorName && (
                    <div className="text-danger">{formiq.errors.authorName}</div>
                  )}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="address2">Title</CLabel>
                  <CInput
                    id="address2"
                    className={
                      formiq.errors.title && formiq.touched.title
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Title"
                    name="title"
                    onChange={formiq.handleChange}
                    onBlur={formiq.handleBlur}
                    value={formiq.values.title}
                  />
                  {formiq.errors.title && formiq.touched.title && (
                    <div className="text-danger">{formiq.errors.title}</div>
                  )}
                </CFormGroup>
              </CCol>

              <CCol md="6">
                <CFormGroup>
                  <CLabel htmlFor="description"> description</CLabel>
                  <CTextarea
                    id="description"
                    className={
                      formiq.errors.description && formiq.touched.description
                        ? "inputError"
                        : "inputUser"
                    }
                    placeholder="Enter blog description"
                    name="description"
                    onChange={formiq.handleChange}
                    value={formiq.values.description}
                    onBlur={formiq.handleBlur}
                  />
                  {formiq.errors.description && formiq.touched.description ? (
                    <div style={{ color: "red" }}>{formiq.errors.description}</div>
                  ) : null}
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CCard className="userCard">
              <CCol xs="12" className="px-0">
                <Editor
                  editorState={editorState}
                  value={convertedContent}
                  onEditorStateChange={handleEditorChange}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </CCol>
            </CCard>
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
  CreateBlogPost: (data) => dispatch(CreateBlogPost(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
