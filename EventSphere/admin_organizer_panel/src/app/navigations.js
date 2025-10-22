// Organizer Navigation
const organizerNavigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "User Management",
    icon: "favorite",
    children: [
      { name: "View All Users", path: "/dashboard/viewallusers", iconText: "S" },
      { name: "Add Admin/Organizer", path: "/dashboard/addadmin", iconText: "T" }
    ]
  },
  {
    name: " Expo Management",
    icon: "favorite",
    children: [
      { name: "Add Expo", iconText: "SI", path: "/dashboard/addexpo" },
      { name: "View All Expos", iconText: "SU", path: "/dashboard/viewallexpos" },
      { name: "Attendee Applications", iconText: "SU", path: "/dashboard/viewattendeeapplications" },
      { name: "Approved Registrations ", iconText: "SU", path: "/dashboard/approvedregistrations" },
      { name: "Rejected Registrations ", iconText: "SU", path: "/dashboard/rejectedregistrations" }
    ]
  },
  {
    name: "Booth Management",
    icon: "favorite",
    children: [
      { name: "Create Booth", path: "/dashboard/addbooth", iconText: "S" },
      { name: "View All Booths", path: "/dashboard/viewallbooths", iconText: "T" },
    ]
  },
  {
    name: "Booth Assignment",
    icon: "favorite",
    children: [
      { name: "Assign Booth to Exhibitor", path: "/dashboard/addboothassign", iconText: "S" },
      { name: "View All Assignments", path: "/dashboard/viewallboothassignment", iconText: "T" },
    ]
  },
  {
    name: " Schedule Management",
    icon: "favorite",
    children: [
      { name: "Create Schedule", path: "/dashboard/addschedule", iconText: "S" },
      { name: "View Schedules", path: "/dashboard/viewallschedule", iconText: "T" },
      { name: "Session Applications", path: "/dashboard/viewscheduleapplications", iconText: "T" },
      { name: "Approved Registrations ", iconText: "SU", path: "/dashboard/scheduleapprovedregistrations" },
      { name: "Rejected Registrations ", iconText: "SU", path: "/dashboard/schedulerejectedregistrations" },
      { name: "Bookmarked Sessions", path: "/dashboard/bookmarkedschedule", iconText: "T" }
    ]
  },
  {
    name: "Reports & Analytics",
    icon: "favorite",
    children: [
      { name: "User Expo Reg report", path: "/dashboard/userexporeport", iconText: "S" },
      { name: "User Session Reg report", path: "/dashboard/userschedulereport", iconText: "T" }
    ]
  },
  {
    name: "Queries",
    icon: "favorite",
    children: [
      { name: "Exhibitor queries", path: "/dashboard/exhibitorquries", iconText: "T" },
      { name: "Attendee queries", path: "/dashboard/attendeequeries", iconText: "T" }
    ]
  },
  {
    name: "Settings",
    icon: "security",
    children: [
      { name: "Admin Profile", path: "/dashboard/profile", iconText: "S" },
      { name: "Logout", path: "/dashboard/logout", iconText: "T" },
     
    ]
  }
];

// Exhibitor Navigation
const exhibitorNavigations = [
  { name: "Exhibitor Profile", path: "/dashboard/exhibitorprofile", icon: "dashboard" },
  { name: "Add Company profile", path: "/dashboard/addcompanyprofile", icon: "dashboard" },

 
  {
    name: " Expo Management",
    icon: "security",
    children: [
      { name: "View All Expos", iconText: "SU", path: "/dashboard/viewallexpos" }
    ]
  },
  {
    name: "Booth Management",
    icon: "favorite",
    children: [
      { name: "View All Booths", path: "/dashboard/viewallbooths", iconText: "T" },
    ]
  },
  {
    name: "Messages",
    icon: "message",
    children: [
      { name: "Contact Admin", path: "/contact-admin", iconText: "C" },
    { name: "Send Collaboration Message", path: "/send-collaboration/686ba79200052abcb6297c14", iconText: "C" },

      

    ]
  },
   {
    name: "Settings",
    icon: "security",
    children: [
       { name: "Logout", path: "/dashboard/logout", iconText: "security" },
    ]
  }
];

// Get role from localStorage
const role = localStorage.getItem("role");

// Conditionally export the appropriate navigation
const navigations = role === "organizer" ? organizerNavigations : exhibitorNavigations;

export default navigations;
