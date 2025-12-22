import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordField } from '@/components/ui/password-input'
import { signIn } from '@/functions/auth'
import { SignInSchema } from '@/schema/auth'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (s) => z.object({ redirect: z.string().optional() }).parse(s),
  component: RouteComponent,
})

function RouteComponent() {
  const userLogin = useServerFn(signIn)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: SignInSchema) => userLogin({ data }),
    onSuccess() {
      toast.success('Logged In')
    },
    onError(error) {
      toast.error(error.message)
    },
  })
  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  const search = useSearch({ from: '/_auth/login' })
  // 2. Define a submit handler.
  async function onSubmit(values: SignInSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await mutateAsync(values)

    navigate({ to: search.redirect ?? '/', replace: true })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4 space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordField placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
