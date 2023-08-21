export default defineNuxtRouteMiddleware((to) => {
  // middleware de autenticação global

  const storedUser = localStorage.getItem('userData')
  const user = useCurrentUser()

  if (!user && storedUser) {
    user.value = JSON.parse(storedUser)
  }

  const isAuthPage = to.fullPath.includes('/auth')
  if (!user.value?.accessToken && !isAuthPage) {
    localStorage.removeItem('userData')
    return navigateTo('/auth')
  }

  return
})