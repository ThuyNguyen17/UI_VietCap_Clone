export const tokenStorage = {
  setToken: (token) => localStorage.setItem('access_token', token),
  getToken: () => localStorage.getItem('access_token'),
  removeToken: () => localStorage.removeItem('access_token'),
  isAuthenticated: () => !!localStorage.getItem('access_token'),
}; 