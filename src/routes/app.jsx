import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import Nonops_Offered  from 'views/Nonops_Offered/Nonops_Offered';
import Ops_Offered from 'views/Ops_Offered/Ops_Offered';
import NonOps_Form_Response from 'views/NonOps_Form_Response/NonOps_Form_Response';
import Ops_Form_Response from 'views/Ops_Form_Response/Ops_Form_Response';
import Rejected_Candidates from 'views/Rejected_Candidates/Rejected_Candidates';
import Notifications from 'views/Notifications/Notifications';
// import Welcome from '../RegistPage/Welcome';
// import Form from "../RegistPage/Regist";
// import notUser from '../RegistPage/notUser';
// import Main from '../Main'
const appRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/user", name: "User Profile", icon: "pe-7s-user", component: UserProfile },
    { path: "/Nonops_Offered", name: "Non-ops Offered", icon: "pe-7s-add-user", component: Nonops_Offered },
    { path: "/Ops_Offered", name: "Ops Offered", icon: "pe-7s-users", component: Ops_Offered },
    { path: "/NonOps_Form_Response", name: "Non-Ops Response", icon: "pe-7s-id", component: NonOps_Form_Response },
    { path: "/Ops_Form_Response", name: "Ops Response", icon: "pe-7s-note2", component: Ops_Form_Response },
    { path: "/Rejected_Candidates", name: "Rejected Candidates", icon: "pe-7s-delete-user", component: Rejected_Candidates },    
    // { path: "/table", name: "Table List", icon: "pe-7s-note2", component: TableList },
    { path: "/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
    // {path:"/register", name:"register", component:Main },
    // { path: "/register", name: "Register", component: Welcome },    
    // { path: "/register/form", name: "Register Form", component: Form },    
    // { path: "/register/notUser", name: "Not User", component: notUser },        
     { redirect: true, path:"/", to:"/dashboard", name: "dashboard" }
];

export default appRoutes;
