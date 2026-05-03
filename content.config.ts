import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const featureSchema = z.object({
  icon: z.string(),
  title: z.string(),
  desc: z.string(),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        hero_image: z.string().optional(),
        features: z.array(featureSchema).optional(),
      }),
    }),
  },
})
