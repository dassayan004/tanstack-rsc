import { useTheme } from '@/integrations/theme-provider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  )
}
