import { RouterProvider } from "react-router-dom"
import { PageProvider } from "contexts/page-context"
import React from "react"

import { lang } from 'config'

import routes from "routes/web"
import Toast from "components/toast"

function App() {
    return (
        <PageProvider>
            <div id="app">
                <RouterProvider router={routes} fallbackElement={(<div>Loading</div>)} />
            </div>
            <Toast />
        </PageProvider>
    )
}

export default App