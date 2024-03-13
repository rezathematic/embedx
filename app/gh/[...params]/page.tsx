import { CustomMDX } from '@/app/components/mdx'
import { checkMarkdownExtension, fetchGitHubContent } from '@/app/lib'
import { notFound } from 'next/navigation'

export default async function GitHubContent({
  params
}: {
  params: { params: string[] }
}) {
  const data = await fetchGitHubContent(params)

  const isMarkdown = checkMarkdownExtension(
    params.params[params.params.length - 1]
  )

  if (!data) {
    return notFound()
  }

  if (isMarkdown) {
    return (
      <main className="emx-w-full emx-px-6 emx-mx-auto emx-prose emx-prose-lg">
        <CustomMDX source={data} />
      </main>
    )
  }

  return (
    <main className="emx-w-full emx-px-6 emx-mx-auto">
      <pre>{data}</pre>
    </main>
  )
}
