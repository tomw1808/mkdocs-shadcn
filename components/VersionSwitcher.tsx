'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, usePathname } from 'next/navigation'

interface Version {
  version: string
  path: string
}

interface VersionSwitcherProps {
  versions: Version[]
  currentVersion: string
}

export function VersionSwitcher({ versions, currentVersion }: VersionSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleVersionChange = (newVersion: string) => {
    const selectedVersion = versions.find(v => v.version === newVersion)
    if (!selectedVersion) return

    // Remove current version from path if it exists
    const currentVersionInfo = versions.find(v => v.version === currentVersion)
    let newPath = pathname
    if (currentVersionInfo && currentVersionInfo.path) {
      newPath = pathname.replace(`/${currentVersionInfo.path}`, '')
    }

    // Add new version to path if it's not 'current'
    if (selectedVersion.path) {
      newPath = `/${selectedVersion.path}${newPath}`
    }

    router.push(newPath)
  }

  return (
    <Select value={currentVersion} onValueChange={handleVersionChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select version" />
      </SelectTrigger>
      <SelectContent>
        {versions.map((version) => (
          <SelectItem key={version.version} value={version.version}>
            {version.version === 'current' ? 'Current' : version.version}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
