/** **************************** Import Libs ****************************** */
import React from "react";
import { CForm, CSelect } from "@coreui/react";
/** **************************** Import CSS ****************************** */
import "./pagination.css";

/** **************************** Import Icons ****************************** */
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Pagination({
  pages,
  rowsPerPage,
  nextPage,
  currentPage,
  changeRowsPerPage,
  ...others
}) {
  return (
    <div
      className="text-right"
      style={ {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "1rem",
      } }
      { ...others }
    >
      <CForm style={ {} }>
        <CSelect
          id="role"
          className="inputFocus"
          style={ {
            width: "65px",
            height: "40px",
            position: "absolute",
            right: "15rem",
            bottom: "0.9rem",
          } }
          { ...others }
          onChange={ (e) => {
            changeRowsPerPage(e.target.value);
          } }
          value={ rowsPerPage }
        >
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </CSelect>
      </CForm>
      <ul>
        <li className="currentPage">{currentPage}</li>
        <span>of</span>
        <li className="totalPage">{pages}</li>
        <li
          className={ currentPage > 1 ? "pagination ml-1" : "disabled ml-1" }
          onClick={ () => nextPage(currentPage - 1) }
        >
          <span className="customSpan">
            <AiOutlineLeft />
          </span>
        </li>
        <li
          className={
            currentPage < pages
              ? "pagination ml-1"
              : "disabled ml-1"
          }
          onClick={ () => nextPage(currentPage + 1) }
        >
          <span className="customSpan">
            <AiOutlineRight />
          </span>
        </li>
      </ul>
    </div>
  );
}
