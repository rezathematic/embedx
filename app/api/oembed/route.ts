import { generateXmlResponse, toTitleCase } from '@/app/lib'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  const referrer = searchParams.get('referrer')
  const format = searchParams.get('format') || 'json' // Default to JSON

  // Validate the URL parameter
  if (!url || !url.startsWith(`${process.env.NEXT_PUBLIC_SITE_URL}/gh/`)) {
    return new Response(JSON.stringify({ error: 'Invalid URL parameter.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  const pathSegments = url
    .replace(`${process.env.NEXT_PUBLIC_SITE_URL}/gh/`, '')
    .split('/')
  if (pathSegments.length < 4) {
    return new Response(
      JSON.stringify({ error: 'URL does not follow the expected format.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const [user, repository, , branch, ...filePathParts] = pathSegments
  const filePath = filePathParts.join('/')
  const jsDelivrUrl = `https://cdn.jsdelivr.net/gh/${user}/${repository}@${branch}/${filePath}`
  const githubRawUrl = `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${filePath}`

  try {
    let response = await fetch(jsDelivrUrl)
    if (!response.ok) response = await fetch(githubRawUrl)
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch content' }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    const provider_url = request.nextUrl.origin
    const iframeSrc = url

    // calculate the height of the iframe based on the content
    const content = await response.text()
    const lines = content.split('\n')
    const height = Math.min(lines.length, 20) * 25

    // Generate title from the file name
    // Extract the file name from the file path
    const fileName = filePathParts[filePathParts.length - 1] // Gets the last part of the path, which is the file name

    // Remove the file extension if present (assuming there is an extension)
    const fileNameWithoutExtension = fileName.includes('.')
      ? fileName.substring(0, fileName.lastIndexOf('.'))
      : fileName

    // Convert the file name to Title Case
    const title = toTitleCase(fileNameWithoutExtension)

    const oEmbedResponse = {
      title: title,
      author_name: `${process.env.NEXT_PUBLIC_PROVIDER_NAME}`,
      author_url: provider_url,
      type: 'rich',
      height: height,
      width: 400,
      version: '1.0',
      provider_name: `${process.env.NEXT_PUBLIC_PROVIDER_NAME}`,
      provider_url: provider_url,
      html: `<iframe width="100%" height="${height}" src="${iframeSrc}" frameborder="0" allowfullscreen="true"></iframe>`
    }

    if (format === 'xml') {
      const xml = generateXmlResponse(oEmbedResponse)
      return new Response(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
          'Access-Control-Allow-Origin': '*'
        }
      })
    } else {
      return new Response(JSON.stringify(oEmbedResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
