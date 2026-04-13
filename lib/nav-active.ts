/**
 * Whether `pathname` should highlight a top-nav item for `href`.
 * Treats `/missions/foo` as active for the `/missions` nav entry (but not `/` for every route).
 */
export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
