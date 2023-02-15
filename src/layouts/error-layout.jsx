import { AuthProvider } from "contexts/auth-context"
import { Helmet } from "react-helmet"

const ErrorLayout = ({ children, title }) => {
    return (
        <>
            <AuthProvider>
                <Helmet>
                    <title>{`${title} – ${process.env.REACT_APP_NAME}`}</title>
                </Helmet>
                <div className="flex flex-col items-center justify-center w-full min-h-screen bg-neutral-100">
                    {children}
                </div>
            </AuthProvider>
        </>
    )
}

export default ErrorLayout