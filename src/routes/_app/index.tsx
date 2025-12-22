import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/_app/')({ component: App })

function App() {
  const router = useRouter()
  // const logout = useServerFn(logoutFn)
  // const { mutateAsync } = useMutation({
  //   mutationFn: () => logout(),
  // })
  // const { user } = Route.useRouteContext()

  // async function onLogout() {
  //   await mutateAsync()
  //   router.invalidate()
  // }
  return (
    <>
      {/* <h1>Welcome, {JSON.stringify(user)}!</h1> */}
      <Button variant={'destructive'}>Logut</Button>
      <h1>home page</h1>
    </>
  )
}
