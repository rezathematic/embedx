'use client'

import { config } from '@/app.config'
import { useState } from 'react'

export default function Home() {
  const [gitHubUrl, setGitHubUrl] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [apiUrl, setApiUrl] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitHubUrl(e.target.value)
  }

  const generateUrls = () => {
    const urlSlug = gitHubUrl.replace('https://github.com/', '')
    const base = `${config.siteUrl}/gh/${urlSlug}`
    const api = `${config.siteUrl}/api/oembed?url=${encodeURIComponent(base)}&format=json`
    setBaseUrl(base)
    setApiUrl(api)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div>
          <pre className="mb-5">
            https://github.com/octocat/Hello-World/blob/master/README
          </pre>
          <input
            type="text"
            value={gitHubUrl}
            onChange={handleChange}
            placeholder="Paste a GitHub URL"
            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={generateUrls}
          >
            Generate
          </button>
          {baseUrl && (
            <div className="mt-4 flex flex-col text-3xl">
              Base URL:{' '}
              <a className="text-base" href={baseUrl}>
                {baseUrl}
              </a>
            </div>
          )}
          {apiUrl && (
            <div className="mt-4 flex flex-col text-3xl">
              API URL:{' '}
              <a className="text-base" href={apiUrl}>
                {apiUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
