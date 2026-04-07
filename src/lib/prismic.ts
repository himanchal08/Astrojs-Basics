import * as prismic from '@prismicio/client'

export const client = prismic.createClient('Astrojs')

export const getSingleDoc = (type: string) => 
  client.getSingle(type)