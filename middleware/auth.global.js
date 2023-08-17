export default defineNuxtRouteMiddleware((to) => {
  // middleware de autenticação global

  const storedUser = JSON.parse(localStorage.getItem('userData'))
  const user = useCurrentUser()

  if (!user?.value && storedUser) {
    user.value = storedUser
  }

  const isAuthPage = to.fullPath.includes('/auth')
  if (!user.value?.accessToken && !isAuthPage) {
    localStorage.removeItem('userData')
    return navigateTo('/auth')
  }

  return
})