import ErrorLayout from "layouts/error-layout"
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom"

const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate()

    var message = "Something went wrong"

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            message = "This page doesn't exist!"
        }

        if (error.status === 401) {
            message = "You aren't authorized to see this"
        }

        if (error.status === 403) {
            message = "Not authorized"
        }

        if (error.status === 503) {
            message = "Looks like our API is down"
        }

        if (error.status === 418) {
            message = "🫖"
        }
    }

    return (
        <ErrorLayout title={""}>
            <div className="flex items-center divide-x">
                <div className="px-4">
                    {isRouteErrorResponse(error) ? error.status : 500}
                </div>
                <div className="px-4">
                    {message}
                </div>
            </div>

            <div className="mt-8 text-xs">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </ErrorLayout>
    )
}

export default Error