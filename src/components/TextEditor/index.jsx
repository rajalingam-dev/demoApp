/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";

/** **************************** Import CSS ****************************** */
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./textEditor.css";

const TextEditor = ({ content, ...others }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    // String to HTML conversion
    const htmlString = "<h1>Test</h1>";

     const doc = new DOMParser().parseFromString(htmlString, "text/html");

    // DOM Manipulation
    // if (doc.getElementsByClassName("candidateName")) {
    //   doc.getElementsByClassName("candidateName") && doc.getElementsByClassName("candidateName").forEach((element) => element.innerHTML = name && name.length && `${name[0].firstName} ${name[0].lastName}`);
    //   doc.getElementsByClassName("contactPersonName") && doc.getElementsByClassName("contactPersonName").forEach((element) => element.innerHTML = formik.values.contactPersonName);
    //   doc.getElementsByClassName("jobTitle") && doc.getElementsByClassName("jobTitle").forEach((element) => element.innerHTML = formik.values.jobTitle);
    //   doc.getElementsByClassName("payRate") && doc.getElementsByClassName("payRate").forEach((element) => element.innerHTML = formik.values.payRate);
    //   doc.getElementsByClassName("period") && doc.getElementsByClassName("period").forEach((element) => element.innerHTML = formik.values.period);
    //   doc.getElementsByClassName("payFrequency") && doc.getElementsByClassName("payFrequency").forEach((element) => element.innerHTML = formik.values.payFrequency);
    //   doc.getElementsByClassName("startDate") && doc.getElementsByClassName("startDate").forEach((element) => element.innerHTML = formik.values.startDate);
    //   doc.getElementsByClassName("offerExpirationDate") && doc.getElementsByClassName("offerExpirationDate").forEach((element) => element.innerHTML = formik.values.offerExpirationDate);
    // }

    const html = doc.documentElement.innerHTML; // HTML to string conversion

    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class-H20"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      {...others}
    />
  );
};
export default TextEditor;
