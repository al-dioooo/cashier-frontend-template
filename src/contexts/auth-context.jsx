import { getCurrentBranch, getToken, getUser, removeCurrentBranch, removeSession, setCurrentBranch as setCurrentBranchRepo, setSession, updateUser } from "helpers/auth-helper"
import { useEffect } from "react"
import { useState, useContext, createContext } from "react"

// Initial state
const initialState = {
    user: getUser(),
    token: getToken(),
    currentBranch: getCurrentBranch(),
    setSession: (token, user) => {
        setSession(token, user)
    },
    setCurrentBranch: (branch) => {
        setCurrentBranchRepo(JSON.stringify(branch))
    },
    removeCurrentBranch: () => {
        removeCurrentBranch()
    },
    logout: () => {
        removeSession()
    },
    can: (node) => {
        const user = getUser()
        const currentBranch = getCurrentBranch()

        if (user.roles.length === 0) {
            return false
        } else {
            if (currentBranch) {
                var permissions = []
                currentBranch.roles.map((role) => {
                    role.permissions.map((permission) => {
                        permissions.push(permission)
                    })
                })

                return (currentBranch.roles.find((role) => role.is_super === 1) ? true : permissions.find(row => row.node === node)) ? true : false
            } else {
                return user.roles.find((role) => role.is_super === 1) ? true : false
            }
        }
    },
    isSuper: () => {
        const user = getUser()
        const currentBranch = getCurrentBranch()

        if (user.roles.length === 0) {
            return false
        } else {
            if (currentBranch) {
                return currentBranch.roles.find((role) => role.is_super === 1) ? true : false
            } else {
                return user.roles.find((role) => role.is_super === 1) ? true : false
            }
        }
    }
}

// Auth context
export const AuthContext = createContext(initialState)

// Provider
export const AuthProvider = ({ children }) => {
    Array.prototype.unique = function () {
        var a = this.concat()

        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1)
            }
        }

        return a
    }

    const [user, setUserState] = useState(getUser())
    const [token, setTokenState] = useState(getToken())
    const [currentBranch, setCurrentBranchState] = useState(getCurrentBranch())

    const setSession = (token, user) => {
        setUserState(user)
        setTokenState(token)
        setSession(token, user)
    }

    const setCurrentBranch = (branch) => {
        setCurrentBranchState(branch)
        setCurrentBranchRepo(JSON.stringify(branch))
    }

    const removeCurrentBranch = () => {
        setCurrentBranchState(null)
        removeCurrentBranch()
    }

    const logout = () => {
        removeSession()
    }

    const can = (node) => {
        if (user.roles.length === 0) {
            return false
        } else {
            if (currentBranch) {
                var permissions = []
                currentBranch.roles.map((role) => {
                    role.permissions.map((permission) => {
                        permissions.push(permission)
                    })
                })

                return (currentBranch.roles.find((role) => role.is_super === 1) ? true : permissions.find(row => row.node === node)) ? true : false
            } else {
                return user.roles.find((role) => role.is_super === 1) ? true : false
            }
        }
    }

    const isSuper = () => {
        if (user.roles.length === 0) {
            return false
        } else {
            if (currentBranch) {
                return currentBranch.roles.find((role) => role.is_super === 1) ? true : false
            } else {
                return user.roles.find((role) => role.is_super === 1) ? true : false
            }
        }
    }

    const value = {
        user,
        token,
        currentBranch,
        setSession,
        setCurrentBranch,
        removeCurrentBranch,
        logout,
        can,
        isSuper
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}