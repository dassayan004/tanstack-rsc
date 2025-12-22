import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import Header from '@/components/Header'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  // const getAuthedUser = useServerFn(getCurrentUserFn)

  return (
    <section>
      <>
        <Header />
        <h1>App Layout</h1>

        <Outlet />
      </>
    </section>
  )
}
