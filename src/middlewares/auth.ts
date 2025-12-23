import { createMiddleware } from '@tanstack/react-start'
import { logMiddleware } from './logging'

import { getSupabaseServerClient } from '@/utils/supabase'
import { AuthState } from '@/schema/auth'

async function getAuthUser(): Promise<AuthState> {
  const supabase = getSupabaseServerClient()

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return { isAuthenticated: false }
  }

  return {
    isAuthenticated: true,
    user: data.user,
  }
}
export const authMiddleware = createMiddleware({ type: 'function' })
  .middleware([logMiddleware])
  .server(async ({ next }) => {
    const auth = await getAuthUser()

    // return context values to handler
    return next({
      context: { auth },
    })
  })
