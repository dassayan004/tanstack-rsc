import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { UserTheme, useTheme } from '@/integrations/theme-provider'

const themeConfig: Record<UserTheme, { icon: string; label: string }> = {
  light: { icon: '☀️', label: 'Light' },
  dark: { icon: '🌙', label: 'Dark' },
  system: { icon: '💻', label: 'System' },
}

export const ThemeToggle = () => {
  const { userTheme, setTheme } = useTheme()

  const getNextTheme = () => {
    const themes = Object.keys(themeConfig) as UserTheme[]
    const currentIndex = themes.indexOf(userTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    return themes[nextIndex]
  }

  return (
    <Button
      onClick={() => setTheme(getNextTheme())}
      aria-label="Toggle theme"
      variant={'secondary'}
      className="rounded-full transition-all"
      size={'icon'}
    >
      {/* Light */}
      {userTheme === 'light' && <Sun className="h-5 w-5" />}

      {/* Dark */}
      {userTheme === 'dark' && <Moon className="h-5 w-5" />}

      {/* System */}
      {userTheme === 'system' && <Laptop className="h-5 w-5" />}
    </Button>
  )
}
