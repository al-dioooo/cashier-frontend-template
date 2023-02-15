import { PageProvider } from "contexts/page-context"
import { Helmet } from "react-helmet"

import Sidebar from "components/partials/sidebar"
import Topbar from "components/partials/topbar"
import { AuthProvider } from "contexts/auth-context"

const AppLayout = ({ children, title }) => {
    return (
        <>
            <AuthProvider>
                <PageProvider>
                    <Helmet>
                        <title>{`${title} – ${process.env.REACT_APP_NAME}`}</title>
                    </Helmet>
                    <div className="flex">
                        <Sidebar />
                        <div className="w-full max-h-screen min-h-screen overflow-y-auto bg-white border-r-0 border-[1.5px] rounded-l-3xl border-neutral-200 overflow-x-hidden">
                            <Topbar title={title} />
                            {children}
                        </div>
                    </div>
                </PageProvider>
            </AuthProvider>
        </>
    )
}

export default AppLayout