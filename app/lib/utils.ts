import { MARKDOWN_URL_EXTENSION_REGEX } from '@/app/lib'

export const toTitleCase = (str: string): string => {
  return str
    .replace(/[-_]+/g, ' ') // Replace hyphens and underscores with spaces
    .split(' ') // Split at spaces to find individual words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' ') // Rejoin the words into a single string
}

// Check if the URL has a markdown extension
export const checkMarkdownExtension = (url: string): boolean => {
  return MARKDOWN_URL_EXTENSION_REGEX.test(url)
}
