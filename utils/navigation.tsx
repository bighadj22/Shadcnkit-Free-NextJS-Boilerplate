import { IRoute } from '@/types'

export const isWindowAvailable = () => typeof window !== 'undefined'

export const findCurrentRoute = (
  routes: IRoute[],
  pathname: string,
): IRoute | undefined => {
  for (let route of routes) {
    if (route.items) {
      const found = findCurrentRoute(route.items, pathname)
      if (found) return found
    }
    // Use startsWith instead of match for better path matching
    if (pathname.startsWith(route.path)) {
      return route
    }
  }
}

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const route = findCurrentRoute(routes, pathname)
  return route?.name || 'Dashboard'
}

export const getActiveNavbar = (
  routes: IRoute[],
  pathname: string,
): boolean => {
  const route = findCurrentRoute(routes, pathname)
  return route?.secondary || false
}

export const getActiveNavbarText = (
  routes: IRoute[],
  pathname: string,
): string | boolean => {
  return getActiveRoute(routes, pathname) || false
}