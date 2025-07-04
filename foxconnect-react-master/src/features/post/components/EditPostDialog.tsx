import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { Post } from '../postTypes'
import { patchPostSchema, type PatchPostSchema } from '../api/patchPost'

type EditPostDialogProps = {
  post: Post
  handleSubmit: (formData: PatchPostSchema) => Promise<unknown> | unknown
}

const EditPostDialog = ({ handleSubmit, post }: EditPostDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm<PatchPostSchema>({
    resolver: zodResolver(patchPostSchema),
    defaultValues: { body: post.body, title: post.title },
  })

  const handleFormSubmit = async (formData: any) => {
    const submitData = {
      id: post.id,
      title: formData.get('title'),
      body: formData.get('body'),
    }
    await handleSubmit(submitData)
    setIsOpen(false)
    form.reset({ id: post.id, body: post.body, title: post.title })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-[8px]">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>Modify post.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" /* onSubmit={form.handleSubmit(handleFormSubmit)} */ action={handleFormSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Give it a short title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share a thought, a vibe, anything..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />} Edit post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { EditPostDialog }
