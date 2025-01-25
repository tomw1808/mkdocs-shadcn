import { getRootNavigation, getFullNavigation } from '@/lib/mkdocs'
import { Navbar } from '@/components/Navbar'

export default function NavWrapper() {
  const rootNavItems = getRootNavigation()
  const fullNavItems = getFullNavigation()
  return <Navbar items={rootNavItems} fullNavigation={fullNavItems} />
}
