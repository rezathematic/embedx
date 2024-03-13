export const fetchGitHubContent = async (pathname: { params: string[] }) => {
  // SERVER SIDE
  const pathSegments = pathname['params']

  if (pathSegments.length < 5) {
    throw new Error('Invalid GitHub URL')
  }

  const [user, repository, , branch, ...filePathParts] = pathSegments

  // IN CASE OF CLIENT SIDE
  // const pathSegments = pathname.split('/').filter(Boolean)
  // if (pathSegments.length < 5) {
  //   throw new Error('Invalid GitHub URL')
  // }
  // const [, user, repository, , branch, ...filePathParts] = pathSegments

  const filePath = filePathParts.join('/')
  const jsDelivrUrl = `https://cdn.jsdelivr.net/gh/${user}/${repository}@${branch}/${filePath}`
  const githubRawUrl = `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${filePath}`

  let response = await fetch(jsDelivrUrl)
  if (!response.ok) {
    console.log('Falling back to GitHub direct URL')
    response = await fetch(githubRawUrl)
  }

  if (!response.ok) {
    throw new Error('Failed to fetch the GitHub content')
  }

  const data = await response.text()

  return data
}

export const generateXmlResponse = (oEmbedResponse: any): string => {
  const xmlItems = Object.keys(oEmbedResponse).map(key => {
    return `<${key}>${oEmbedResponse[key]}</${key}>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?><oembed>${xmlItems.join('')}</oembed>`
}
