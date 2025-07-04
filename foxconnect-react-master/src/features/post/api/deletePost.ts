import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/utils/api'

const deletePost = async (postId: string): Promise<any> => {
  const response = await apiClient.delete(`/posts/${postId}`)
  return response.data
}

const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export { deletePost, useDeletePost }
