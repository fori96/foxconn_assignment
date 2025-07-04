import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { MutationConfig } from '@/utils/query'
import { apiClient } from '@/utils/api'
import { z } from 'zod'

const patchPostSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  body: z
    .string()
    .nonempty('Body is required')
    .min(3, { message: 'Body must be at least 3 characters long' })
    .max(1000, { message: 'Body must be less than 1000 characters' }),
})

type PatchPostSchema = z.infer<typeof patchPostSchema>

const patchPost = async (input: PatchPostSchema): Promise<any> => {
  const response = await apiClient.patch(`/posts/${input.id}`, input)
  return response.data
}

type UsePatchPostOptions = {
  mutationConfig?: MutationConfig<typeof patchPost>
}

const usePatchPost = ({ mutationConfig }: UsePatchPostOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    ...restConfig,
    mutationFn: patchPost,
  })
}

export type { PatchPostSchema }
export { patchPostSchema, patchPost, usePatchPost }
