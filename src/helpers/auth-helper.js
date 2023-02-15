// Retrieve user data from session storage
export const getUser = () => {
    const user = sessionStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

// Retrieve token from local storage
export const getToken = () => {
    return localStorage.getItem('token') || null
}

// Retrieve current branch from local storage
export const getCurrentBranch = () => {
    const branch = localStorage.getItem('current_branch')
    return branch ? JSON.parse(branch) : null
}

// Remove token and user from browser storage
export const removeSession = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('user')
}

// Set token and user to browser storage
export const setSession = (token, user) => {
    localStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
}

// Set current branch to local storage
export const setCurrentBranch = (branch) => {
    localStorage.setItem('current_branch', branch)
}

// Remove current branch from local store
export const removeCurrentBranch = () => {
    localStorage.removeItem('current_branch')
}

// Update user from session storage
export const updateUser = (name, phone) => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    if (user) {
        user.name = name
        user.phone = phone

        sessionStorage.removeItem('user')
        sessionStorage.setItem('user', JSON.stringify(user))
    }
}