/** **************************** Import Libs ****************************** */
import React from "react";

/** **************************** Import Components ****************************** */
const Dashboard = React.lazy(() => import("../views/Dashboard"));
const Contact = React.lazy(() => import("../views/settings/Contact"));
const Carrier = React.lazy(() => import("../views/settings/Carrier"));
const JobPost = React.lazy(() => import("../views/JobPost"));
const Testimonial = React.lazy(() => import("../views/Testimonial"));
const Blog = React.lazy(() => import("../views/blog"));
const BlogSetting = React.lazy(() => import("../views/settings/Blog"));


// const ClinicalRole = React.lazy(() => import("../views/Onboarding/Candidate/ClinicalRole"));
// const AdminRole = React.lazy(() => import("../views/Onboarding/Candidate/AdminRole"));

const routes = [
  { path: "/home", exact: true, name: "Home" },
  { path: "/home/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/home/enquiry", exact: true, name: "Enquiry", component: Contact,
  },
  {
    path: "/home/applicants", exact: true, name: "Applicants", component: Carrier,
  },
  {
    path: "/home/job-post", exact: true, name: "JobPost", component: JobPost,

  },
  {
    path: "/home/testimonial", exact: true, name: "Testimonial", component: Testimonial,

  },
  {
    path: "/home/blog", exact: true, name: "Blog", component: Blog,

  },
  {
    path: "/home/setting/blog-category", exact: true, name: "Blog-category", component: BlogSetting,

  },

  // {
  //   path: "/home/onboarding/candidate/clinicalRole", exact: true, name: "ClinicalRole", component: ClinicalRole,
  // },
  // {
  //   path: "/home/onboarding/candidate/adminRole", exact: true, name: "AdminRole", component: AdminRole,
  // },
];

export default routes;
