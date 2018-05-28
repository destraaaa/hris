import Dashboard from 'views/Dashboard/Dashboard';
import Nonops_Offered from 'views/Nonops_Offered/Nonops_Offered';
import Ops_Offered from 'views/Ops_Offered/Ops_Offered';
import NonOps_Form_Response from 'views/NonOps_Form_Response/NonOps_Form_Response';
import Ops_Form_Response from 'views/Ops_Form_Response/Ops_Form_Response';
import Rejected_Candidates from 'views/Rejected_Candidates/Rejected_Candidates';
import Recruiter from 'views/Recruiter/Recruiter';

const appRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/Nonops_Offered", name: "NonOps Offer", icon: "pe-7s-add-user", component: Nonops_Offered },
    { path: "/Ops_Offered", name: "Ops Offer", icon: "pe-7s-users", component: Ops_Offered },
    { path: "/NonOps_Form_Response", name: "NonOps Form", icon: "pe-7s-id", component: NonOps_Form_Response },
    { path: "/Ops_Form_Response", name: "Ops Form", icon: "pe-7s-note2", component: Ops_Form_Response },
    { path: "/Rejected_Candidates", name: "Rejected", icon: "pe-7s-delete-user", component: Rejected_Candidates },
    { path: "/Recruiter", name: "Recruiter", icon: "pe-7s-headphones", component: Recruiter },
    { redirect: true, path: "/", to: "/dashboard", name: "dashboard" }
];

export default appRoutes;
