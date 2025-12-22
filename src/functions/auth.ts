import { createServerFn } from '@tanstack/react-start'
import type { AuthState } from '@/schema/auth'
import { authMiddleware } from '@/middlewares/auth'
import { logMiddleware } from '@/middlewares/logging'
import { SignInSchema, SignUpSchema, UserMetaSchema } from '@/schema/auth'
import { getSupabaseServerClient } from '@/utils/supabase'

export const signUp = createServerFn({ method: 'POST' })
  .inputValidator(SignUpSchema)
  .middleware([logMiddleware])
  .handler(async ({ data }) => {
    const { data: userData, error } =
      await getSupabaseServerClient().auth.signUp({
        email: data.email,
        password: data.password,
      })

    if (error) {
      switch (error.code) {
        case 'email_exists':
          throw new Error('Email already exists')
        case 'weak_password':
          throw new Error('Your password is too weak')
        default:
          throw new Error(error.message)
      }
    }

    if (userData.user) {
      return userData.user.id
    }

    throw new Error('Something went wrong')
  })

export const signIn = createServerFn({ method: 'POST' })
  .inputValidator(SignInSchema)
  .middleware([logMiddleware])
  .handler(async ({ data }) => {
    const { error } = await getSupabaseServerClient().auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return { error: error.message }
    }
  })

export const signOut = createServerFn()
  .middleware([logMiddleware])
  .handler(async () => {
    await getSupabaseServerClient().auth.signOut()
  })

export async function getAuthUser(): Promise<AuthState> {
  const supabase = getSupabaseServerClient()

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return { isAuthenticated: false }
  }

  return {
    isAuthenticated: true,
    user: {
      email: data.user.email,
      meta: { username: data.user.user_metadata.username },
    },
  }
}
export const getUser = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler<AuthState>(({ context }) => {
    return context.auth
  })

export const updateUser = createServerFn()
  // .middleware([logMiddleware, authMiddleware])
  .inputValidator(UserMetaSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.auth.updateUser({
      data: { username: data.username },
    })

    if (error) {
      throw new Error(error.message)
    }
  })
