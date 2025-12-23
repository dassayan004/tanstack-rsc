import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Button } from '@/components/ui/button'
import { signOut } from '@/functions/auth'
import { toast } from 'sonner'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export const Route = createFileRoute('/_app/')({ component: App })

function App() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const logout = useServerFn(signOut)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      toast.success('Logged Out')
      queryClient.resetQueries()
      router.invalidate()
    },
    onError(error) {
      toast.error(error.message)
    },
  })
  const { authState } = Route.useRouteContext()
  const user = authState.isAuthenticated ? authState.user : null!
  async function onLogout() {
    await mutateAsync()
    router.invalidate()
  }
  return (
    <section className="mx-auto max-w-2xl p-6 space-y-6">
      {/* Greeting */}
      <h1 className="text-2xl font-semibold">
        Welcome, {user.user_metadata?.username ?? user.email}
      </h1>

      {/* Account Card */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Account</CardTitle>
            <CardDescription>Logged in as {user.email}</CardDescription>
          </div>

          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={onLogout}
          >
            {isPending ? 'Logging out…' : 'Logout'}
          </Button>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono">{user.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Username</span>
            <span>{user.user_metadata?.username ?? '—'}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground">
          Your account details are managed via Supabase authentication
        </CardFooter>
      </Card>
    </section>
  )
}
