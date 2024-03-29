
const getToken = () => localStorage.getItem('token')
const setToken = (token: string) => localStorage.setItem('token', token)
const removeToken = () => localStorage.removeItem('token')

export {
  getToken,
  setToken,
  removeToken
}
