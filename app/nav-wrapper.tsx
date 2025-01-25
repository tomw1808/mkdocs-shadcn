import { getRootNavigation } from '@/lib/mkdocs'
import { Navbar } from '@/components/Navbar'

export default function NavWrapper() {
  const navItems = getRootNavigation()
  console.log(navItems)
  return <Navbar items={navItems} />
}
