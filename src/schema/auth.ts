import { z } from 'zod'
import { User } from '@supabase/supabase-js'

export const UserMetaSchema = z.object({
  username: z.string().min(3).max(20),
})

export type UserMeta = z.infer<typeof UserMetaSchema>

// TODO: Refine password === confirmPassword
export const SignUpSchema = z
  .object({
    username: UserMetaSchema.shape.username,
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpSchema = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type SignInSchema = z.infer<typeof SignInSchema>

export type AuthState =
  | {
      isAuthenticated: false
    }
  | {
      isAuthenticated: true
      user: User
    }

export type AuthedAuth = Extract<AuthState, { isAuthenticated: true }>
