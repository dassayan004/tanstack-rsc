import { getUser } from '@/functions/auth'
import { queryOptions } from '@tanstack/react-query'

export const authQueries = {
  all: ['auth'],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, 'user'],
      queryFn: () => getUser(),
    }),
}
