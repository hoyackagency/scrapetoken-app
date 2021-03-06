import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));

// dashboard
const EcommerceDashboard = React.lazy(() => import('../pages/dashboards/Ecommerce'));
const CRMDashboard = React.lazy(() => import('../pages/dashboards/CRM'));

// Process
const Processes = React.lazy(() => import('../pages/process/Processes'));
const NewProcess = React.lazy(() => import('../pages/process/NewProcess'));
const ProcessDetails = React.lazy(() => import ('../pages/process/ProcessDetails'));

// Balance
const Balances = React.lazy(() => import('../pages/balance/Balances'));
const BalanceDetail = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));

// User
const User = React.lazy(() => import('../pages/profile'));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const Projects = React.lazy(() => import('../pages/apps/Projects'));
const ProjectDetail = React.lazy(() => import('../pages/apps/ProjectDetail'));

// - ecommece pages
const EcommerceProducts = React.lazy(() => import('../pages/apps/Ecommerce/Products'));
const ProductDetails = React.lazy(() => import('../pages/apps/Ecommerce/ProductDetails'));
const Orders = React.lazy(() => import('../pages/apps/Ecommerce/Orders'));
const OrderDetails = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));
const Customers = React.lazy(() => import('../pages/apps/Ecommerce/Customers'));
const Cart = React.lazy(() => import('../pages/apps/Ecommerce/Cart'));
const Checkout = React.lazy(() => import('../pages/apps/Ecommerce/Checkout/'));
const Sellers = React.lazy(() => import('../pages/apps/Ecommerce/Sellers'));

// - kanban
const Kanban = React.lazy(() => import('../pages/apps/Kanban/'));

// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));

// pages
const Starter = React.lazy(() => import('../pages/Starter'));
const Profile = React.lazy(() => import('../pages/profile'));
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));

// - other
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));

// uikit
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Tabs = React.lazy(() => import('../pages/uikit/Tabs'));
const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const General = React.lazy(() => import('../pages/uikit/General'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const Icons = React.lazy(() => import('../pages/uikit/Icons'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));

// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const BriteChart = React.lazy(() => import('../pages/charts/Brite'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// maps
const GoogleMaps = React.lazy(() => import('../pages/GoogleMaps'));

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    // component: () => <Redirect to="/dashboard/ecommerce" />,
    component: () => <Redirect to="/process/list" />,
    route: PrivateRoute,
};

/*
// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'dripicons-meter',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/ecommerce',
            name: 'Ecommerce',
            badge: {
                variant: 'success',
                text: '3',
            },
            component: EcommerceDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/crm',
            name: 'CRM',
            component: CRMDashboard,
            route: PrivateRoute,
        },
    ],
};
*/

// Process
const processRoutes = {
    path: '/process',
    name: 'Process',
    icon: 'dripicons-gear',
    children: [
        {
            path: '/process/list',
            name: 'Processes',
            component: Processes,
            route: PrivateRoute,
        },
        {
            path: '/process/new',
            name: 'Add Process',
            component: NewProcess,
            route: PrivateRoute,
        },
        {
            path: '/process/detail',
            name: 'Process details',
            component: ProcessDetails,
            route: PrivateRoute,
        },
    ],
};


// Balance
const balanceRoutes = {
    path: '/balance',
    name: 'Balance',
    icon: 'dripicons-jewel',
    component: Balances,
    route: PrivateRoute,
};


// User
const userRoutes = {
    path: '/user',
    name: 'User',
    icon: 'dripicons-user',
    component: User,
    route: PrivateRoute,
};


// apps
const appRoutes = {
    path: '/apps',
    name: 'Apps',
    icon: 'dripicons-view-apps',
    children: [
        {
            path: '/apps/calendar',
            name: 'Calendar',
            component: CalendarApp,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects',
            name: 'Projects',
            children: [
                {
                    path: '/apps/projects/list',
                    name: 'List',
                    component: Projects,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/projects/detail',
                    name: 'Detail',
                    component: ProjectDetail,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/apps/ecommerce',
            name: 'eCommerce',
            children: [
                {
                    path: '/apps/ecommerce/products',
                    name: 'Products',
                    component: EcommerceProducts,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/details',
                    name: 'Product Details',
                    component: ProductDetails,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/orders',
                    name: 'Orders',
                    component: Orders,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/order/details',
                    name: 'Order Details',
                    component: OrderDetails,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/customers',
                    name: 'Customers',
                    component: Customers,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/shopping-cart',
                    name: 'Shopping Cart',
                    component: Cart,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/checkout',
                    name: 'Checkout',
                    component: Checkout,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/ecommerce/sellers',
                    name: 'Sellers',
                    component: Sellers,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/apps/kanban',
            name: 'Kanban',
            component: Kanban,
            route: PrivateRoute,
        },
        {
            path: '/apps/email',
            name: 'Email',
            children: [
                {
                    path: '/apps/email/inbox',
                    name: 'Inbox',
                    component: Inbox,
                    route: PrivateRoute,
                },
                {
                    path: '/apps/email/details',
                    name: 'Email Details',
                    component: EmailDetail,
                    route: PrivateRoute,
                },
            ],
        },
    ],
};

// pages
const pageRoutes = {
    path: '/pages',
    name: 'Pages',
    icon: 'dripicons-copy',
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
        },
        {
            path: '/pages/faq',
            name: 'FAQ',
            component: FAQ,
            route: PrivateRoute,
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-404',
            name: 'Error - 404',
            component: ErrorPageNotFound,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-500',
            name: 'Error - 500',
            component: ServerError,
            route: PrivateRoute,
        },
    ],
};


// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// ui
const uiRoutes = {
    path: '/ui',
    name: 'UI Kit',
    icon: 'dripicons-briefcase',
    children: [
        {
            path: '/ui/buttons',
            name: 'Buttons',
            component: Buttons,
            route: PrivateRoute,
        },
        {
            path: '/ui/cards',
            name: 'Cards',
            component: Cards,
            route: PrivateRoute,
        },
        {
            path: '/ui/general',
            name: 'General',
            component: General,
            route: PrivateRoute,
        },
        {
            path: '/ui/grid',
            name: 'Grid',
            component: Grid,
            route: PrivateRoute,
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            component: Icons,
            route: PrivateRoute,
        },
        {
            path: '/ui/modals',
            name: 'Modals',
            component: Modals,
            route: PrivateRoute,
        },
        {
            path: '/ui/notifications',
            name: 'Notifications',
            component: Notifications,
            route: PrivateRoute,
        },
        {
            path: '/ui/spinners',
            name: 'Spinners',
            component: Spinners,
            route: PrivateRoute,
        },
        {
            path: '/ui/tabs',
            name: 'Tabs',
            component: Tabs,
            route: PrivateRoute,
        },
        {
            path: '/ui/typography',
            name: 'Typography',
            component: Typography,
            route: PrivateRoute,
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
        },
    ],
};

// forms
const formsRoutes = {
    path: '/forms',
    name: 'Forms',
    icon: 'dripicons-document',
    children: [
        {
            path: '/forms/basic',
            name: 'Basic Elements',
            component: BasicForms,
            route: PrivateRoute,
        },
        {
            path: '/forms/advanced',
            name: 'Form Advanced',
            component: FormAdvanced,
            route: PrivateRoute,
        },
        {
            path: '/forms/validation',
            name: 'Form validation',
            component: FormValidation,
            route: PrivateRoute,
        },
        {
            path: '/forms/wizard',
            name: 'Form Wizard',
            component: FormWizard,
            route: PrivateRoute,
        },
        {
            path: '/forms/upload',
            name: 'File Upload',
            component: FileUpload,
            route: PrivateRoute,
        },
        {
            path: '/forms/editors',
            name: 'Editors',
            component: Editors,
            route: PrivateRoute,
        },
    ],
};

/*
// other features
const featuresRoutes = {
    path: '/features',
    name: 'Features',
    icon: 'dripicons-view-list-large',
    children: [
        {
            path: '/features/charts',
            name: 'Charts',
            children: [
                {
                    path: '/features/charts/apex',
                    name: 'Apex',
                    component: ApexChart,
                    route: PrivateRoute,
                },
                {
                    path: '/features/charts/brite',
                    name: 'Brite',
                    component: BriteChart,
                    route: PrivateRoute,
                },
                {
                    path: '/features/charts/chartjs',
                    name: 'Chartjs',
                    component: ChartJs,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/features/tables',
            name: 'Tables',
            children: [
                {
                    path: '/features/tables/basic',
                    name: 'Basic',
                    component: BasicTables,
                    route: PrivateRoute,
                },
                {
                    path: '/features/tables/advanced',
                    name: 'Advanced',
                    component: AdvancedTables,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/features/googlemaps',
            name: 'Google Maps',
            component: GoogleMaps,
            route: PrivateRoute,
        },
    ],
};
*/

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    // dashboardRoutes,
    processRoutes,
    balanceRoutes,
    userRoutes,
    authRoutes,
    uiRoutes,
    formsRoutes,
    appRoutes,
    pageRoutes,
    // featuresRoutes,
];

// const authProtectedRoutes = [dashboardRoutes, processRoutes, balanceRoutes, userRoutes, appRoutes, pageRoutes, uiRoutes, formsRoutes, featuresRoutes];
const authProtectedRoutes = [processRoutes, balanceRoutes, userRoutes, uiRoutes, formsRoutes, appRoutes, pageRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, authProtectedRoutes, allFlattenRoutes };
