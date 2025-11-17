export const navbarItemsUtils = [
  {
    path: "#home",
    label: "Home",
    type: "link",
    className: "",
  },

  {
    path: "#experience",
    label: "Experience",
    type: "link",
    className: "",
  },
  {
    path: "#skills",
    label: "Skills",
    type: "link",
    className: "",
  },
  {
    path: "#certifications",
    label: "Certifications",
    type: "link",
    className: "",
  },
  {
    path: "#pocProjects",
    label: "POC's",
    type: "link",
    className: "",
  },

  {
    path: "#education",
    label: "Education",
    type: "link",
    className: "",
  },
  {
    path: "#about",
    label: "About me",
    type: "link",
    className: "",
  },
  {
    path: "#interests",
    label: "Interests",
    type: "link",
    className: "",
  },

  {
    path: "",
    label: "",
    type: "button",
  },
  // {
  //     path: '/loginpage',
  //     label: 'Admin',
  //     type: 'admin'
  // },
  // {
  //     path: '/register',
  //     label: 'Register',
  //     type: 'reg',
  //     styles: {
  //         color: '',
  //         linkType: 'btn btn-primary'
  //     }
  // },
  // {
  //     path: '',
  //     label: ''
  // },
];

export const navItemsCoverPage = [
  {
    path: "#home",
    label: "Home",
    type: "link",
    className: "",
  },
  {
    path: "#about",
    label: "About me",
    type: "link",
    className: "",
  },
  {
    path: "/rajeshprofile",
    label: "View Profile",
    type: "navlink",
    className: "",
  },

  {
    path: "",
    label: "",
    type: "button",
  },
  // {
  //     path: '/register',
  //     label: 'Register',
  //     type: 'reg',
  //     styles: {
  //         color: '',
  //         linkType: 'btn btn-primary'
  //     }
  // },
];

export const authorizedNavItems = [
  {
    path: "/",
    label: "Logout",
    type: "button",
    className: "",
  },
  // {
  //     path: '/register',
  //     label: 'Register',
  //     type: 'reg',
  //     styles: {
  //         color: '',
  //         linkType: 'btn btn-primary'
  //     }
  // },
];

export const scrollFunction = (themeMode) => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // console.log(' hi in  scrollFunction()')

    if (themeMode) {
      document.getElementById("navbarstyled").style.boxShadow =
        "1px 2px 10px 5px lightgrey";
    } else {
      document.getElementById("navbarstyled").style.boxShadow =
        "1px 1px 15px 1px darkslategrey";
    }
    document.getElementById("scrollToTopFloatBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopFloatBtn").style.display = "none";
    document.getElementById("navbarstyled").style.boxShadow = "none";
  }
};
