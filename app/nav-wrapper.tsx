import { getRootNavigation } from '@/lib/mkdocs'
import { Navbar } from '@/components/Navbar'

export default function NavWrapper() {
  const navItems = getRootNavigation()
  return <Navbar items={navItems} />
}
