import { useAuthentication } from '@/services/auth'

export const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const { data } = useAuthentication()

  if (data.isAuthenticated) return null

  return <>{children}</>
}
