export default defineNuxtRouteMiddleware(() => {
  // middleware de páginas apenas para admins

  const user = useCurrentUser()
  const storedUser = JSON.parse(localStorage.getItem('userData'))

  if (!user?.value && storedUser) {
    user.value = storedUser
  }

  const isAdmin = user.value.tipos.includes('ROLE_ADMIN')
  if (!isAdmin) {
    return navigateTo('/')
  }

  return
})