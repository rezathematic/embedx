A quick way to generate embed code compatible with Embedly and oEmbed.

## Getting Started

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## oEmbed

oEmbed's `rich` type is used for rich HTML content that does not fall under one
of the other categories. The following parameters are defined:

- `html` (required): The HTML required to display the resource.
- `width` (required): The width in pixels required to display the HTML.
- `height` (required): The height in pixels required to display the HTML.

Learn more about oEmbed [here](https://oembed.com/).

### Endpoints and Parameters

The oEmbed endpoint is located at `/api/oembed`. The following parameters are
supported:

- `url` (required): The URL of the resource to be embedded.
- `format` (optional): The requested response format. It can be `json` or `xml`,
  with `json` being the default.

### Example

```
url: https://github.com/octocat/Hello-World/blob/master/README

page: http://localhost:3000/gh/octocat/Hello-World/blob/master/README

API: http://localhost:3000/api/oembed?url=http%3A%2F%2Flocalhost%3A3000%2Fgh%2Foctocat%2FHello-World%2Fblob%2Fmaster%2FREADME&format=json

Response:
{
  "title": "Embed X",
  "author_name": "Reza Baharvand",
  "author_url": "https://rezabaharvand.dev",
  "type": "rich",
  "height": 113,
  "width": 200,
  "version": "1.0",
  "provider_name": "Reza Baharvand",
  "provider_url": "http://localhost:3000",
  "html": "<iframe width=\"100%\" height=\"113\" src=\"http://localhost:3000/gh/octocat/Hello-World/blob/master/README\" frameborder=\"0\" allowfullscreen=\"true\"></iframe>"
}
```

## Generate Embed Code

To Generate Embed code, go to `/preview` and enter the GitHub URL.

## Deploy

Copy the `.env.example` file and rename it to `.env.local`. Then, set the
environment variables to the appropriate values.
