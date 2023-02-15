import { createBrowserRouter, createHashRouter } from "react-router-dom"

import GuestRoute from "routes/middleware/guest"
import ProtectedRoute from "routes/middleware/protected"

import Dashboard from "pages/dashboard"
import Bill from "pages/bill"
import BillDetail from "pages/bill/detail"
import Login from "pages/auth/login"
import Register from "pages/auth/register"
import NoRole from "pages/no-role"
import { show as showDashboard } from "./loader/dashboard"
import { show as showBill } from "./loader/bill"
import { load as loadAuth } from "./loader/auth"
import { lang } from "config"
import Error from "pages/error"
import Other from "pages/other"
import Form from "pages/form"
import Data from "pages/data"

const routeList = [
    // Root loader
    {
        loader: loadAuth,

        // Set error element (page) on production
        errorElement: process.env.NODE_ENV === 'development' ? undefined : <Error />,

        children: [
            // Guest route
            {
                path: "/register",
                exact: true,
                element: (
                    <GuestRoute>
                        <Register title={lang.title.sign_up} />
                    </GuestRoute>
                )
            },
            {
                path: "/login",
                exact: true,
                element: (
                    <GuestRoute>
                        <Login title={lang.title.sign_in} />
                    </GuestRoute>
                )
            },

            // Protected route
            {
                path: "/",
                exact: true,
                element: (
                    <ProtectedRoute>
                        <Dashboard title={lang.title.dashboard} />
                    </ProtectedRoute>
                ),
                loader: showDashboard
            },
            {
                path: "form",
                exact: true,
                element: (
                    <ProtectedRoute>
                        <Form title={lang.title.form} />
                    </ProtectedRoute>
                )
            },
            {
                path: "data",
                exact: true,
                element: (
                    <ProtectedRoute>
                        <Data title={lang.title.data} />
                    </ProtectedRoute>
                )
            },
            {
                path: "other",
                exact: true,
                element: (
                    <ProtectedRoute>
                        <Other title={lang.title.other} />
                    </ProtectedRoute>
                )
            },
            {
                path: "bill",
                exact: true,
                element: (
                    <ProtectedRoute>
                        <Bill title={lang.title.bill} />
                    </ProtectedRoute>
                )
            },
            {
                path: "/bill/:number",
                exact: false,
                element: (
                    <ProtectedRoute>
                        <BillDetail />
                    </ProtectedRoute>
                ),
                loader: showBill
            },
            {
                path: "/no-role",
                exact: true,
                element: (
                    <ProtectedRoute>
                        <NoRole title="No Role Assigned" />
                    </ProtectedRoute>
                )
            }
        ]
    }
]

const routes = process.env.NODE_ENV === 'development' ? createBrowserRouter(routeList) : createHashRouter(routeList)

export default routes