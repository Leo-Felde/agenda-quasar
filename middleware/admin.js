export default defineNuxtRouteMiddleware(() => {
  // middleware de páginas apenas para admins

  const user = useCurrentUser()
  const isAdmin = user.value.tipos.includes('ROLE_ADMIN')
  if (!isAdmin) {
    return navigateTo('/')
  }

  return
})