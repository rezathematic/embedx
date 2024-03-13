import { Code, Pre } from '@/app/components'
import { CalloutProps } from '@/app/components/callout'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import React, { AnchorHTMLAttributes, ReactNode } from 'react'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...rest} />
}

function Callout(props: CalloutProps) {
  return (
    <div className="emx-px-4 emx-py-3 emx-border emx-border-neutral-200 dark:emx-border-neutral-700 emx-bg-neutral-50 dark:emx-bg-neutral-800 emx-rounded emx-p-1 emx-text-sm emx-flex emx-items-center emx-text-neutral-900 dark:emx-text-neutral-100 emx-mb-8">
      <div className="emx-flex emx-items-center emx-w-4 emx-mr-4">
        {props.emoji}
      </div>
      <div className="emx-w-full callout">{props.children}</div>
    </div>
  )
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps {
  children: ReactNode
}

function createHeading(level: HeadingLevel) {
  // Generate the component for the given heading level
  const HeadingComponent = ({ children }: HeadingProps): JSX.Element => {
    const content = React.Children.toArray(children).join('')
    let slug = slugify(content)

    const element = React.createElement(
      `h${level}`,
      { id: slug },
      React.createElement(
        'a',
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor'
        },
        children
      )
    )

    return element
  }

  // Set a dynamic displayName based on the heading level
  HeadingComponent.displayName = `Heading${level}`

  return HeadingComponent
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Callout,
  code: Code,
  pre: Pre
}

// @ts-ignore
export function CustomMDX(props) {
  return (
    <div>
      <MDXRemote
        {...props}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypePrettyCode]
          }
        }}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  )
}
