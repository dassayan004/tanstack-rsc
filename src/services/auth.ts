import {
  queryOptions,
  useSuspenseQuery
} from '@tanstack/react-query'
import type {
  UseSuspenseQueryResult} from '@tanstack/react-query';
import { getUser } from '@/functions/auth'

export const authQueries = {
  all: ['auth'],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, 'user'],
      queryFn: () => getUser(),
    }),
}

export const useAuthentication = () => {
  return useSuspenseQuery(authQueries.user())
}

export const useAuthenticatedUser = () => {
  const authQuery = useAuthentication()

  if (authQuery.data.isAuthenticated === false) {
    throw new Error('User is not authenticated!')
  }

  return authQuery as UseSuspenseQueryResult<typeof authQuery.data>
}
