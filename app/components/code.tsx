'use client'

import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'

export const Code = ({
  children,
  className,
  ...props
}: ComponentProps<'code'>): ReactElement => {
  const hasLineNumbers = 'data-line-numbers' in props
  return (
    <code
      className={cn(
        'emx-border-black emx-border-opacity-[0.04] emx-bg-opacity-[0.03] emx-bg-black emx-break-words emx-rounded-md emx-border emx-py-0.5 emx-px-[.25em] emx-text-[.9em]',
        'dark:emx-border-white/10 dark:emx-bg-white/10',
        hasLineNumbers && '[counter-reset:line]',
        className
      )}
      // always show code blocks in ltr
      dir="ltr"
      {...props}
    >
      {children}
    </code>
  )
}
