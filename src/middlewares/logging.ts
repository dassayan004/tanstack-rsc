import { createMiddleware } from '@tanstack/react-start'

export const logMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next, functionId }) => {
    const now = Date.now()

    const result = await next()

    const duration = Date.now() - now
    console.log('Server Req/Res:', { duration: `${duration}ms`, functionId })

    return result
  },
)
