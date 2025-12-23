import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'

import { useTheme } from '@/integrations/theme/theme-provider'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <Button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      variant={'secondary'}
      className="rounded-full transition-all"
      size={'icon'}
    >
      {/* Light */}
      {theme === 'light' && <Sun className="h-5 w-5" />}

      {/* Dark */}
      {theme === 'dark' && <Moon className="h-5 w-5" />}

      {/* System */}
      {theme === 'system' && <Laptop className="h-5 w-5" />}
    </Button>
  )
}
