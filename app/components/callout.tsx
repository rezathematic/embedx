'use client'

import { InformationCircleIcon } from '@/app/icons'
import cn from 'clsx'
import type { ReactElement, ReactNode } from 'react'

const TypeToEmoji = {
  default: '💡',
  error: '🚫',
  info: <InformationCircleIcon className="emx-mt-1" />,
  warning: '⚠️'
}

type CalloutType = keyof typeof TypeToEmoji

const classes: Record<CalloutType, string> = {
  default: cn(
    'emx-border-orange-100 emx-bg-orange-50 emx-text-orange-800 dark:emx-border-orange-400/30 dark:emx-bg-orange-400/20 dark:emx-text-orange-300'
  ),
  error: cn(
    'emx-border-red-200 emx-bg-red-100 emx-text-red-900 dark:emx-border-red-200/30 dark:emx-bg-red-900/30 dark:emx-text-red-200'
  ),
  info: cn(
    'emx-border-blue-200 emx-bg-blue-100 emx-text-blue-900 dark:emx-border-blue-200/30 dark:emx-bg-blue-900/30 dark:emx-text-blue-200'
  ),
  warning: cn(
    'emx-border-yellow-100 emx-bg-yellow-50 emx-text-yellow-900 dark:emx-border-yellow-200/30 dark:emx-bg-yellow-700/30 dark:emx-text-yellow-200'
  )
}

export type CalloutProps = {
  type?: CalloutType
  emoji?: string | ReactNode
  children: ReactNode
}

export function Callout({
  children,
  type = 'default',
  emoji = TypeToEmoji[type]
}: CalloutProps): ReactElement {
  return (
    <div
      className={cn(
        'emx-callout emx-overflow-x-auto emx-mt-6 emx-flex emx-rounded-lg emx-border emx-py-2 ltr:emx-pr-4 rtl:emx-pl-4',
        'contrast-more:emx-border-current contrast-more:dark:emx-border-current',
        classes[type]
      )}
    >
      <div
        className="emx-select-none emx-text-xl ltr:emx-pl-3 ltr:emx-pr-2 rtl:emx-pr-3 rtl:emx-pl-2"
        style={{
          fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        }}
      >
        {emoji}
      </div>
      <div className="emx-w-full emx-min-w-0 emx-leading-7">{children}</div>
    </div>
  )
}
