import { PageProvider } from "contexts/page-context"
import { Helmet } from "react-helmet"

const AuthLayout = ({ children, title }) => {
    return (
        <>
            <PageProvider>
                <Helmet>
                    <title>{`${title} – ${process.env.REACT_APP_NAME}`}</title>
                </Helmet>
                <div className="flex items-center justify-center w-full min-h-screen">
                    {children}
                </div>
            </PageProvider>
        </>
    )
}

export default AuthLayout