'use client'

import { Button, CopyToClipboard } from '@/app/components'
import { WordWrapIcon } from '@/app/icons'
import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'
import { useCallback, useRef } from 'react'

export const Pre = ({
  children,
  className,
  hasCopyCode,
  filename,
  ...props
}: ComponentProps<'pre'> & {
  filename?: string
  hasCopyCode?: boolean
}): ReactElement => {
  const preRef = useRef<HTMLPreElement | null>(null)

  const toggleWordWrap = useCallback(() => {
    const htmlDataset = document.documentElement.dataset
    const hasWordWrap = 'nextraWordWrap' in htmlDataset
    if (hasWordWrap) {
      delete htmlDataset.nextraWordWrap
    } else {
      htmlDataset.nextraWordWrap = ''
    }
  }, [])

  return (
    <div className="emx-code-block emx-relative emx-mt-6 first:emx-mt-0">
      {filename && (
        <div className="emx-absolute emx-top-0 emx-z-[1] emx-w-full emx-truncate emx-rounded-t-xl emx-bg-primary-700/5 emx-py-2 emx-px-4 emx-text-xs emx-text-gray-700 dark:emx-bg-primary-300/10 dark:emx-text-gray-200">
          {filename}
        </div>
      )}
      <pre
        className={cn(
          'emx-bg-primary-700/5 emx-mb-4 emx-overflow-x-auto emx-rounded-xl emx-subpixel-antialiased dark:emx-bg-primary-300/10 emx-text-[.9em]',
          'contrast-more:emx-border contrast-more:emx-border-primary-900/20 contrast-more:emx-contrast-150 contrast-more:dark:emx-border-primary-100/40',
          filename ? 'emx-pt-12 emx-pb-4' : 'emx-py-4',
          className
        )}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
      <div
        className={cn(
          'emx-opacity-0 emx-transition [div:hover>&]:emx-opacity-100 focus-within:emx-opacity-100',
          'emx-flex emx-gap-1 emx-absolute emx-m-[11px] emx-right-0',
          filename ? 'emx-top-8' : 'emx-top-0'
        )}
      >
        <Button
          onClick={toggleWordWrap}
          className="md:emx-hidden"
          title="Toggle word wrap"
        >
          <WordWrapIcon className="emx-pointer-events-none emx-h-4 emx-w-4" />
        </Button>
        {hasCopyCode && (
          <CopyToClipboard
            getValue={() =>
              preRef.current?.querySelector('code')?.textContent || ''
            }
          />
        )}
      </div>
    </div>
  )
}
