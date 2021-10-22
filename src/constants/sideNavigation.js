/** ****************************** Import libs *********************************** */
import React from "react";
import CIcon from "@coreui/icons-react";
// import { useSelector } from "react-redux";

export const sideMenu = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/home/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Settings",
  //   icon: "cil-settings",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Applicants",
  //       to: "/home/carrierMessage",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Enquiry",
  //       to: "/home/contactMessage",
  //     },
  //   ],
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Enquiry",
    to: "/home/enquiry",
    icon: <CIcon name="cil-Inbox" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Applicants",
    to: "/home/applicants",
    icon: <CIcon name="cil-InputPower" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Setting",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavDropdown",
        name: "Website Management",
        icon: "cil-settings",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Job Post",
            to: "/home/job-post",
            icon: <CIcon name="cil-PaperPlane" customClasses="c-sidebar-nav-icon" />,
          },
          {
            _tag: "CSidebarNavItem",
            name: "Testimonials",
            to: "/home/testimonial",
            icon: <CIcon name="cil-UserFollow" customClasses="c-sidebar-nav-icon" />,
          },
        ],
      },

      {
        _tag: "CSidebarNavDropdown",
        name: "Blog Management",
        icon: "cil-settings",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "blog category",
            to: "/home/setting/blog-category",
            icon: <CIcon name="cil-PaperPlane" customClasses="c-sidebar-nav-icon" />,
          }
        ],
      }
    ],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Blog",
    to: "/home/blog",
    icon: <CIcon name="cil-comment-square" customClasses="c-sidebar-nav-icon" />,
  },

];


