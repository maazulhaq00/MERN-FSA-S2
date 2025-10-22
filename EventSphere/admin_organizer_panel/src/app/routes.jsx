import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";
import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
 import LoginPage from "./hooks/authentication/LoginPage";
 import ProtectedRoutes from "./hooks/authentication/ProtectedRoutes";
 import AddExhibitorForm from "./hooks/authentication/SignUp";

//Organizer routes
import ViewAllUsers from "./hooks/userManagement/viewAllUsers";
import AddAdmin from "./hooks/userManagement/addAdmin";
import ViewAllAdminExpos from "./hooks/expoManagement/ViewAllExpos";
import ExpoDetails from "./hooks/expoManagement/Expodetails";
import AddExpo from "./hooks/expoManagement/AddExpo";
import UpdateExpo from "./hooks/expoManagement/UpdateExpo";
import AddBooth from "./hooks/boothManagement/AddBooth";
import ViewAllAdminBooths from "./hooks/boothManagement/ViewAllBooths";
import ViewAllBoothAssignments from "./hooks/boothAssignment/ViewAllAssignments";
import AddBoothAssign from "./hooks/boothAssignment/AddBoothAssignment";
import UpdateBooth from "./hooks/boothManagement/UpdateBooth";
import UpdateBoothAssignment from "./hooks/boothAssignment/UpdateBoothAssignment";
import AddSchedule from "./hooks/scheduleManagement/AddSchedule";
import ViewAllSchedule from "./hooks/scheduleManagement/ViewAllSchedules";
import UpdateSchedule from "./hooks/scheduleManagement/UpdateSchedule";
import ViewAllRegistrations from "./hooks/expoManagement/AttendeeExpoRegApp";
import ApprovedRegistrations from "./hooks/expoManagement/AttendeeExpoReg";
import RejectedRegistrations from "./hooks/expoManagement/RejectedReg";
import UserExpoReport from "./hooks/reportsandanalytics/userexporeport";
import ViewAllScheduleRegistrations from "./hooks/scheduleManagement/AttScheduleRegApp";
import ApprovedSessionRegistrations from "./hooks/scheduleManagement/AttendeeScheduleReg";
import RejectedSessionRegistrations from "./hooks/scheduleManagement/RejectedReg";
import UserSessionReport from "./hooks/reportsandanalytics/userschedulereport";
import ViewBookmarkedSessions from "./hooks/scheduleManagement/BookmarkedScedule";
import Logout from "./hooks/authentication/Logout";
import AdminProfile from "./hooks/settings/AdminProfile";
import EditProfile from "./hooks/settings/EditProfile";
import ChangeProfilePass from "./hooks/settings/ChangeProfilePass";
import Messages from "./hooks/Queries/ExhibitorQuery";
import AttendeeMessages from "./hooks/Queries/AttendeeQueries";
//exhibitor routes
import ExhibitorProfile from "./hooks/exhibitorpanel/ExhibitorProfile";
import ViewAllExpos from "./hooks/exhibitorpanel/ViewAllExpos";
import ViewAllBooths from "./hooks/exhibitorpanel/ViewAllBooths";
import ExpoRegistration from "./hooks/exhibitorpanel/ExpoRegistrationForm";
import BoothDetailsForm from "./hooks/exhibitorpanel/boothdetailform";
import EditCompanyProfile from "./hooks/exhibitorpanel/EditCompanyProfile";
import ContactAdminForm from "./hooks/exhibitorpanel/ContactAdminForm";
import SendCollaborationMessage from "./hooks/exhibitorpanel/SendCollaborationMessage";
import ShowCollaborationMessage from "./hooks/exhibitorpanel/ShowCollaborationMessage";
import Exhibitorprofileupdated from "./hooks/exhibitorpanel/Exhibitorprofileupdated";
import AddCompanyProfile from "./hooks/exhibitorpanel/AddCompanyProfile";







// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const role = localStorage.getItem("role");
const routes = [
 
  { path: "/", element: <Navigate to="login" /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <AddExhibitorForm /> },
  {
    element: (
       <ProtectedRoutes>
        <MatxLayout />
      </ProtectedRoutes>
    ),


  children: [
      ...materialRoutes,


  // ORGANIZER DASHBOARD ROUTES
  ...(role === "organizer"
    ? [
      
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      { path: "/dashboard/viewallusers", element: <ViewAllUsers />, auth: authRoles.editor },
      { path: "/dashboard/addadmin", element: <AddAdmin />, auth: authRoles.editor },
      { path: "/dashboard/addexpo", element: <AddExpo />, auth: authRoles.editor },
      { path: "/dashboard/viewallexpos", element: <ViewAllAdminExpos />, auth: authRoles.editor },
      { path: "/dashboard/expo/:id", element: <ExpoDetails />, auth: authRoles.editor },
      { path: "/dashboard/updateexpos/:id", element: < UpdateExpo/>, auth: authRoles.editor },
      { path: "/dashboard/viewattendeeapplications", element: < ViewAllRegistrations/>, auth: authRoles.editor },
      { path: "/dashboard/approvedregistrations", element: < ApprovedRegistrations/>, auth: authRoles.editor },
      { path: "/dashboard/rejectedregistrations", element: < RejectedRegistrations/>, auth: authRoles.editor },
      { path: "/dashboard/addbooth", element: <AddBooth />, auth: authRoles.editor },
      { path: "/dashboard/viewallbooths", element: <ViewAllAdminBooths />, auth: authRoles.editor },
      { path: "/dashboard/updatebooth/:id", element: <UpdateBooth />, auth: authRoles.editor },
      { path: "/dashboard/viewallboothassignment", element: <ViewAllBoothAssignments />, auth: authRoles.editor },
      { path: "/dashboard/addboothassign", element: <AddBoothAssign />, auth: authRoles.editor },
      { path: "/dashboard/updateboothassign/:id", element: <UpdateBoothAssignment />, auth: authRoles.editor },
      { path: "/dashboard/addschedule", element: <AddSchedule />, auth: authRoles.editor },
      { path: "/dashboard/viewallschedule", element: <ViewAllSchedule />, auth: authRoles.editor },
      { path: "/dashboard/updateschedule/:id", element: <UpdateSchedule />, auth: authRoles.editor },
      { path: "/dashboard/viewscheduleapplications", element: < ViewAllScheduleRegistrations/>, auth: authRoles.editor },
      { path: "/dashboard/scheduleapprovedregistrations", element: < ApprovedSessionRegistrations/>, auth: authRoles.editor },
      { path: "/dashboard/schedulerejectedregistrations", element: < RejectedSessionRegistrations/>, auth: authRoles.editor },
      { path: "/dashboard/bookmarkedschedule", element: < ViewBookmarkedSessions/>, auth: authRoles.editor },
      { path: "/dashboard/userexporeport", element: <UserExpoReport />, auth: authRoles.editor },
      { path: "/dashboard/userschedulereport", element: <UserSessionReport />, auth: authRoles.editor },
      { path: "/dashboard/profile", element: <AdminProfile />, auth: authRoles.editor },
      { path: "/dashboard/editprofile", element: <EditProfile />, auth: authRoles.editor },
      { path: "/dashboard/changeprofilepassword", element: <ChangeProfilePass />, auth: authRoles.editor },
      { path: "/dashboard/logout", element: <Logout />, auth: authRoles.editor },
      { path: "/dashboard/exhibitorquries", element: <Messages />, auth: authRoles.editor },
      { path: "/dashboard/attendeequeries", element: <AttendeeMessages />, auth: authRoles.editor },

      ]
    : []),

  // EXHIBITOR DASHBOARD ROUTES
  ...(role === "exhibitor"
    ? [
        { path: "/dashboard/exhibitor", element: <ExhibitorProfile />, auth: authRoles.editor },
        { path: "/dashboard/viewallexpos", element: <ViewAllExpos />, auth: authRoles.editor },
        { path: "/dashboard/viewallbooths", element: <ViewAllBooths />, auth: authRoles.editor },
        { path: "/dashboard/registerexpo/:id", element: <ExpoRegistration />, auth: authRoles.editor },
        { path: "/dashboard/boothdetails/:boothId", element: <BoothDetailsForm />, auth: authRoles.editor },
        { path: "/dashboard/exhibitorprofile", element: <ExhibitorProfile />, auth: authRoles.editor },
        { path: "/dashboard/companyprofile", element: <EditCompanyProfile />, auth: authRoles.editor },
        { path: "/dashboard/addcompanyprofile", element: <AddCompanyProfile />, auth: authRoles.editor },
        { path: "/dashboard/exhibitorprofileupdated", element: <Exhibitorprofileupdated />, auth: authRoles.editor },
        { path: "/contact-admin", element: <ContactAdminForm />, auth: authRoles.editor },
        { path: "/send-collaboration/:userId", element: <SendCollaborationMessage />, auth: authRoles.editor },
        { path: "/messages/thread/:senderId/:receiverId", element: <ShowCollaborationMessage />, auth: authRoles.editor },
        { path: "/dashboard/logout", element: <Logout />, auth: authRoles.editor },
      ]
    : []),


  ]




  },

  // session pages route
  ...sessionRoutes
];

export default routes;
