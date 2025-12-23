import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeToggle } from '@/components/theme-toggle'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.authState.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const active = pathname.includes('register') ? 'register' : 'login'
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md bg-background p-6 rounded-xl shadow">
        <Tabs value={active}>
          <div className=" flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="login" asChild>
                <Link to="/login">Login</Link>
              </TabsTrigger>
              <TabsTrigger value="register" asChild>
                <Link to="/register">Register</Link>
              </TabsTrigger>
            </TabsList>
            <ThemeToggle />
          </div>
          <TabsContent value="login">
            <Outlet />
          </TabsContent>

          <TabsContent value="register">
            <Outlet />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
