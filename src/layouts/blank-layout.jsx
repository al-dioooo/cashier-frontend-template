import { AuthProvider } from "contexts/auth-context"
import { Helmet } from "react-helmet"

const BlankLayout = ({ children, title }) => {
    return (
        <>
            <AuthProvider>
                <Helmet>
                    <title>{`${title} – ${process.env.REACT_APP_NAME}`}</title>
                </Helmet>
                <div className="flex items-center justify-center w-full min-h-screen">
                    {children}
                </div>
            </AuthProvider>
        </>
    )
}

export default BlankLayout