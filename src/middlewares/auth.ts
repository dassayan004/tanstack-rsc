import { createMiddleware } from '@tanstack/react-start'
import { logMiddleware } from './logging'

import { getAuthUser } from '@/functions/auth'

export const authMiddleware = createMiddleware({ type: 'function' })
  .middleware([logMiddleware])
  .server(async ({ next }) => {
    const auth = await getAuthUser()

    // return context values to handler
    return next({
      context: { auth },
    })
  })
