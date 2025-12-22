import * as React from 'react'

import { useToggle } from '@uidotdev/usehooks'
import { Eye, EyeClosed } from 'lucide-react'
import { cn } from '@/lib/utils'

function PasswordField({ className, ...props }: React.ComponentProps<'input'>) {
  const [passwordVisible, togglePasswordVisible] = useToggle(false)
  return (
    <div className="relative w-full">
      <input
        type={passwordVisible ? 'text' : 'password'}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      <button
        className="focus:outline-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/80"
        type="button"
        disabled={props.disabled}
        onClick={() => togglePasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? <Eye size={16} /> : <EyeClosed size={16} />}
      </button>
    </div>
  )
}

export { PasswordField }
