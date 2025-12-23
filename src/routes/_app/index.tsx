import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/_app/')({ component: App })

function App() {
  const { authState } = Route.useRouteContext()
  const user = authState.isAuthenticated ? authState.user : null!

  return (
    <section className="mx-auto max-w-2xl p-6 space-y-6">
      {/* Greeting */}
      <h1 className="text-2xl font-semibold">
        Welcome, {user.user_metadata?.username ?? user.email}
      </h1>

      {/* Account Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Logged in as {user.email}</CardDescription>
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
