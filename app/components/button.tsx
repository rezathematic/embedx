'use client'

import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'

export const Button = ({
  children,
  className,
  ...props
}: ComponentProps<'button'>): ReactElement => {
  return (
    <button
      className={cn(
        'emx-button emx-transition-all active:emx-opacity-50',
        'emx-bg-blue-700/5 emx-border emx-border-black/5 emx-text-gray-600 hover:emx-text-gray-900 emx-rounded-md emx-p-1.5',
        'dark:emx-bg-blue-300/10 dark:emx-border-white/10 dark:emx-text-gray-400 dark:hover:emx-text-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
