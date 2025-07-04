import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

type DeletePostDialogProps = {
  postId: string
  handleSubmit: (postId: string) => Promise<unknown> | unknown
}

const DeletePostDialog = ({ handleSubmit, postId }: DeletePostDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleFormSubmit = async () => {
    await handleSubmit(postId)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-[8px]">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you really want to delete this post?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => handleFormSubmit()}>
            Delete post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeletePostDialog }
