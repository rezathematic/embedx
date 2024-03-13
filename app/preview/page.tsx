'use client'

import { config } from '@/app.config'
import { CopyToClipboard } from '@/app/components/copy-to-clipboard'
import React, { useState } from 'react'

interface Line {
  originalContent: string
  isValid: boolean
  outputUrl: string
}

const GitHubLinkProcessor: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [lines, setLines] = useState<Line[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const processGitHubLinks = () => {
    const inputLines = inputText.split('\n').map(content => {
      const isValid =
        /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/blob\/[a-zA-Z0-9_-]+\/(.+)$/.test(
          content
        )
      let outputUrl = ''
      if (isValid) {
        const urlSlug = content.replace('https://github.com/', '')
        const encodedUrl = encodeURIComponent(`${config.siteUrl}/gh/${urlSlug}`)
        outputUrl = `${config.siteUrl}/api/oembed?url=${encodedUrl}&format=json`
      }
      return {
        originalContent: content, // Keeping the original content for reference
        isValid,
        outputUrl // Using outputUrl instead of apiUrl for clarity
      }
    })
    setLines(inputLines)
  }

  return (
    <div className=" emx-container emx-mx-auto emx-max-w-3xl emx-mt-4">
      <h2 className="emx-my-4 emx-text-2xl emx-font-semibold">
        EmbedX GitHub Link Processor
      </h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Paste GitHub links here..."
        rows={15}
        className="emx-w-full emx-mb-3"
      />
      <button
        className="emx-rounded-md emx-bg-blue-600 emx-px-3 emx-py-2 emx-text-sm emx-font-semibold emx-text-white emx-shadow-sm emx-hover:bg-blue-500 focus-visible:emx-outline focus-visible:emx-outline-2 focus-visible:emx-outline-offset-2 focus-visible:emx-outline-blue-600"
        onClick={processGitHubLinks}
      >
        Process Links
      </button>

      {lines.length > 0 && (
        <div>
          <h2 className="emx-mt-8 emx-text-2xl emx-font-semibold">
            oEmbed API URL
          </h2>
          <div className="emx-whitespace-pre-wrap emx-font-mono emx-text-sm border emx-p-4 emx-overflow-scroll emx-bg-neutral-100 emx-mt-3 emx-relative emx-rounded-md">
            <div className="emx-opacity-0 emx-transition [div:hover>&]:emx-opacity-100 focus-within:emx-opacity-100 emx-flex emx-gap-1 emx-absolute emx-m-[11px] emx-right-0 emx-top-0">
              <CopyToClipboard
                getValue={() => lines.map(line => line.outputUrl).join('\n')}
              />
            </div>
            {lines.map((line, index) => (
              <div key={index} className="emx-mb-2">
                {line.isValid ? (
                  <span className="emx-text-green-700">{line.outputUrl}</span>
                ) : (
                  <span className="emx-text-red-600">
                    {line.originalContent}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubLinkProcessor
