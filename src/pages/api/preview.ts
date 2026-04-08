import type { APIRoute } from 'astro'
import { client } from '../../lib/prismic'

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = await client.resolvePreviewURL({
    defaultURL: '/',
  })
  return redirect(url)
}
