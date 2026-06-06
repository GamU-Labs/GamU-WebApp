export function isAuthenticated(): boolean {
    if (typeof document === 'undefined') return false

    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))

    return !!token
}

export function logout(): void {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}
