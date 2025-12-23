import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLink, useRouter } from '@tanstack/react-router'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Switch } from '../ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/functions/auth'
import { useAuthenticatedUser } from '@/services/auth'

const ItemLink = createLink(DropdownMenuItem)

export function UserMenu() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    data: { user },
  } = useAuthenticatedUser()
  const [open, setOpen] = useState(false)

  const logout = useServerFn(signOut)
  const { mutateAsync } = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      setOpen(false)
      toast.success('Logged Out')
      queryClient.resetQueries()
      router.invalidate()
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  async function onLogout() {
    await mutateAsync()
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full" size={'icon'}>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
            />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata.username ?? 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ItemLink
          className="cursor-pointer"
          to="/products"
          onClick={() => setOpen(false)}
        >
          Products
        </ItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center justify-between w-full">
            Dark Mode
            <Switch
              // checked={theme === "dark"}
              disabled
              //   onCheckedChange={() =>
              //     setTheme(theme === "light" ? "dark" : "light")
              //   }
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onSelect={onLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
