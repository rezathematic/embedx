// File: /pages/api/oembed.ts
import { type NextRequest } from 'next/server'

function generateXmlResponse(oEmbedResponse: any): string {
  const xmlItems = Object.keys(oEmbedResponse).map(key => {
    return `<${key}>${oEmbedResponse[key]}</${key}>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?><oembed>${xmlItems.join('')}</oembed>`
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  const format = searchParams.get('format') || 'json' // Default to JSON

  // Validate the URL parameter
  if (!url || !url.startsWith('http://localhost:3000/gh/')) {
    return new Response(JSON.stringify({ error: 'Invalid URL parameter.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const pathSegments = url.replace('http://localhost:3000/gh/', '').split('/')
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
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const provider_url = request.nextUrl.origin
    const iframeSrc = url

    const oEmbedResponse = {
      title: 'Embed X',
      author_name: 'Reza Baharvand',
      author_url: 'https://rezabaharvand.dev',
      type: 'rich',
      height: 113,
      width: 200,
      version: '1.0',
      provider_name: 'Reza Baharvand',
      provider_url: provider_url,
      html: `<iframe width="100%" height="400" src="${iframeSrc}" frameborder="0" allowfullscreen="true"></iframe>`
    }

    if (format === 'xml') {
      const xml = generateXmlResponse(oEmbedResponse)
      return new Response(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml'
        }
      })
    } else {
      return new Response(JSON.stringify(oEmbedResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
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
