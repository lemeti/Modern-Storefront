import { z } from 'zod';
import { insertPuppySchema, puppies } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  puppies: {
    list: {
      method: 'GET' as const,
      path: '/api/puppies',
      responses: {
        200: z.array(z.custom<typeof puppies.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/puppies/:id',
      responses: {
        200: z.custom<typeof puppies.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/puppies',
      input: insertPuppySchema,
      responses: {
        201: z.custom<typeof puppies.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal, // Unauthorized
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/puppies/:id',
      input: insertPuppySchema.partial(),
      responses: {
        200: z.custom<typeof puppies.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.internal, // Unauthorized
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/puppies/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.internal, // Unauthorized
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PuppyInput = z.infer<typeof api.puppies.create.input>;
export type PuppyResponse = z.infer<typeof api.puppies.create.responses[201]>;
