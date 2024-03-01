'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const GitHubContent = () => {
  const pathname = usePathname()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGitHubContent = async () => {
      // Extract the necessary parts from the pathname
      const pathSegments = pathname.split('/').filter(Boolean) // Remove any empty segments
      if (pathSegments.length < 5) {
        // Ensuring the path has at least: gh, user, repo, blob, branch, and file path
        setError('Invalid GitHub URL')
        return
      }

      const [, user, repository, , branch, ...filePathParts] = pathSegments
      const filePath = filePathParts.join('/')
      const jsDelivrUrl = `https://cdn.jsdelivr.net/gh/${user}/${repository}@${branch}/${filePath}`
      const githubRawUrl = `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${filePath}`

      setLoading(true)
      try {
        let response = await fetch(jsDelivrUrl)
        if (!response.ok) {
          console.log('Falling back to GitHub direct URL')
          response = await fetch(githubRawUrl)
        }

        if (!response.ok) {
          throw new Error('Failed to fetch the GitHub content')
        }

        const data = await response.text()
        setContent(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    if (pathname.includes('/gh/')) {
      fetchGitHubContent()
    }
  }, [pathname])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return <pre>{content}</pre>
}

export default GitHubContent
