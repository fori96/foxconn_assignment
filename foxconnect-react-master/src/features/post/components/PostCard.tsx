import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { DeletePostDialog } from './DeleteConfirm'
import { EditPostDialog } from './EditPostDialog'
import type { Post } from '../postTypes'
import { Trash2 } from 'lucide-react'
import { useDeletePost } from '../api/deletePost'
import { usePatchPost } from '@/features/post/api/patchPost'

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const patchPost = usePatchPost()

  const deletePost = useDeletePost()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          {post.createdBy} - {new Date(post.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-justify">{post.body}</CardContent>
      <CardFooter className="flex justify-end items-end mb-2">
        <EditPostDialog handleSubmit={patchPost.mutateAsync} post={post} />
        <DeletePostDialog handleSubmit={deletePost.mutateAsync} postId={post.id} />
      </CardFooter>
    </Card>
  )
}

export { PostCard }
