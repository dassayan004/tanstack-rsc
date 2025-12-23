import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import Header from '@/components/Header'
import { Navbar } from '@/components/navbar1'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
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
        <Navbar />
        <Outlet />
      </>
    </section>
  )
}
