/** **************************** Import Libs ****************************** */
import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  // CImg,
} from "@coreui/react";

/** **************************** Import Libs ****************************** */
import "./dashboard.css";

/** **************************** Import Images ****************************** */
import NewJoineeIcon from "../../assets/icons/new-joinee-icon.png";

const Dashboard = () => (
  <CRow className="p-4">
    <CCol md="9">
      <CRow>
        <CCol xs="12" style={ { paddingLeft: "0", paddingRight: "0" } }>
        <CCard className="dashboardTicketsCard">
          <CCardHeader style={ { fontWeight: "bold" } }>
            <CRow>
              <CCol xs="6" className="text-left">
                Your Tickets
              </CCol>
              <CCol xs="6" className="text-right">
                + New Tickets
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped">
              <thead className="tableHeadDashboard">
                <th>Ticket Name</th>
                <th>Ticket Details</th>
                <th>Status</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>
                    Perferendis dolorum illo suscipit, culpa aperiam aut
                    molestias.
                  </td>
                  <td>
                    <CButton color="primary" className="dashboardTicketsBtn">
                      Closed
                    </CButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>
                    Perferendis dolorum illo suscipit, culpa aperiam aut
                    molestias.
                  </td>
                  <td>
                    <CButton color="primary" className="dashboardTicketsBtn">
                      Closed
                    </CButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>
                    Perferendis dolorum illo suscipit, culpa aperiam aut
                    molestias.
                  </td>
                  <td>
                    <CButton color="primary" className="dashboardTicketsBtn">
                      Closed
                    </CButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6" className="customColDashboard-leaveBalance">
          <CCard className="dashboardCard-leaveBalance">
            <CCardHeader style={ { fontWeight: "bold" } }>
              Leave Balance
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <div className="dashboardInsideCard">
                    <CRow>
                      <CCol xs="3">
                        <h2>23.5</h2>
                      </CCol>
                      <CCol xs="6" className="text-center pt-1">
                        <p>Privilege Leave</p>
                      </CCol>
                      <CCol xs="3">
                        <CButton color="primary" className="dashboardBtn">
                          Apply
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol xs="12">
                  <div className="dashboardInsideCard">
                    <CRow>
                      <CCol xs="3">
                        <h2>12</h2>
                      </CCol>
                      <CCol xs="6" className="text-center pt-1">
                        <p>Sick Leave</p>
                      </CCol>
                      <CCol xs="3">
                        <CButton color="primary" className="dashboardBtn">
                          Apply
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol xs="12">
                  <div className="dashboardInsideCard">
                    <CRow>
                      <CCol xs="3">
                        <h2>220</h2>
                      </CCol>
                      <CCol xs="6" className="text-center pt-1">
                        <p>Work from home</p>
                      </CCol>
                      <CCol xs="3">
                        <CButton color="primary" className="dashboardBtn">
                          Apply
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="6" className="customColDashboard-holidays">
          <CCard className="dashboardCard-holidays">
            <CCardHeader style={ { fontWeight: "bold" } }>Holidays</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <div className="dashboardInsideCard">
                    <CRow>
                      <CCol xs="3">
                        <h5>04</h5>
                        <span>JULY</span>
                      </CCol>
                      <CCol xs="6" className="text-center pt-1">
                        <p>Independace Day</p>
                      </CCol>
                      <CCol xs="3">
                        <CButton color="primary" className="dashboardBtn">
                          Optional
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol xs="12">
                  <div className="dashboardInsideCard">
                    <CRow>
                      <CCol xs="3">
                        <h5>10</h5>
                        <span>AUG</span>
                      </CCol>
                      <CCol xs="6" className="text-center pt-1">
                        <p>Republic Day</p>
                      </CCol>
                      <CCol xs="3">
                        <CButton color="primary" className="dashboardBtn">
                          Optional
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol xs="12">
                  <div className="dashboardInsideCard">
                    <CRow>
                      <CCol xs="3">
                        <h5>15</h5>
                        <span>JUNE</span>
                      </CCol>
                      <CCol xs="6" className="text-center pt-1">
                        <p>Independace Day</p>
                      </CCol>
                      <CCol xs="3">
                        <CButton color="primary" className="dashboardBtn">
                          Optional
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
    <CCol md="3">
      <CRow>
        <CCol xs="12">
          <CCard className="dashboardCard-newJoinees">
            <CCardHeader style={ { fontWeight: "bold" } }>
              New Joiners
            </CCardHeader>
            <CCardHeader>
              <CRow>
                <CCol xs="4">
                  <img
                    src={ NewJoineeIcon }
                    alt="newJoineeIcon"
                    width="90px"
                    height="90px"
                    className="img-fluid"
                  />
                </CCol>
                <CCol xs="8">
                  <p style={ { fontWeight: "bold", marginBottom: 0 } }>
                    James Watt
                  </p>
                  <p style={ { fontSize: "10px", marginBottom: 0 } }>Cardio</p>
                  <p style={ { fontSize: "10px", marginBottom: 0 } }>
                    Ferallon Med
                  </p>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardHeader>
              <CRow>
                <CCol xs="4">
                  <img
                    src={ NewJoineeIcon }
                    alt="newJoineeIcon"
                    width="90px"
                    height="90px"
                    className="img-fluid"
                  />
                </CCol>
                <CCol xs="8">
                  <p style={ { fontWeight: "bold", marginBottom: 0 } }>
                    William Oscar
                  </p>
                  <p style={ { fontSize: "10px", marginBottom: 0 } }>
                    Neurologist
                  </p>
                  <p style={ { fontSize: "10px", marginBottom: 0 } }>
                    PIMG
                  </p>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardHeader>
              <CRow>
                <CCol xs="4">
                  <img
                    src={ NewJoineeIcon }
                    alt="newJoineeIcon"
                    width="90px"
                    height="90px"
                    className="img-fluid"
                  />
                </CCol>
                <CCol xs="8">
                  <p style={ { fontWeight: "bold", marginBottom: 0 } }>
                     Praveen Kumar
                  </p>
                  <p style={ { fontSize: "10px", marginBottom: 0 } }>Dentist</p>
                  <p style={ { fontSize: "10px", marginBottom: 0 } }>
                    Ferallon Med
                  </p>
                </CCol>
              </CRow>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CCard className="dashboardCard-birthday">
            <CCardHeader style={ { fontWeight: "bold" } }>Birthday</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" className="text-center">
                  <img
                    src={ NewJoineeIcon }
                    alt="newJoineeIcon"
                    width="80px"
                    height="80px"
                    className="img-fluid mb-2"
                  />
                  <p>Aravind Mani</p>
                  <p>Birthday</p>
                  <span>MAY 05</span>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
  </CRow>
);

export default Dashboard;
