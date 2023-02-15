import { useState, useContext, createContext } from "react"

// Initial state
const initialState = {
    transition: "fade",
    setTransition: () => {},
    back: null,
    setBack: () => {},
}

// Page context
export const PageContext = createContext(initialState)

// Provider
export const PageProvider = ({ children }) => {
    const [transition, setTransition] = useState("fade")
    const [back, setBack] = useState(null)

    const value = {
        transition,
        setTransition,
        back,
        setBack
    }

    return (
        <PageContext.Provider value={value}>
            {children}
        </PageContext.Provider>
    )
}

export const usePage = () => {
    return useContext(PageContext)
}