export const getToken = () => {
    return localStorage.getItem('token')
}

export const deleteSession = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.clear()
    return 'ok'
}

export const getUser = () => {
    return {user: localStorage.getItem('user'), email: localStorage.getItem('email')}
}