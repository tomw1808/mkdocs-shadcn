import { getRootNavigation, getFullNavigation, getVersions } from '@/lib/mkdocs'
import { Navbar } from '@/components/Navbar'

export default function NavWrapper() {
  const versions = getVersions()
  const currentVersion = versions[0] // Most recent version
  
  const rootNavItems = getRootNavigation(currentVersion.version)
  const fullNavItems = getFullNavigation(currentVersion.version)
  
  return (
    <Navbar 
      items={rootNavItems} 
      fullNavigation={fullNavItems}
      versions={versions}
      currentVersion={currentVersion.version}
    />
  )
}
