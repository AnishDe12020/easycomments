import { deleteComment } from "@/utils/db"
import { DeleteIcon } from "@chakra-ui/icons"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react"
import React, { useState, useRef } from "react"
import { mutate } from "swr"

const DeleteCommentButton = ({
  commentId,
  siteId,
  route,
  isMyComments,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  const onClose = () => {
    setIsOpen(false)
  }

  const commentsApiUrl = route
    ? `/api/comments/${siteId}/${route}`
    : `/api/comments/${siteId}`

  console.log(commentsApiUrl)

  const onDeleteConfirm = () => {
    console.log(`Deleting comment with id ${siteId}`)
    deleteComment(commentId)
      .then(() => {
        mutate(
          isMyComments ? `/api/my-comments` : commentsApiUrl,
          async data => {
            return {
              comments: data.comments.filter(
                comment => comment.id !== commentId
              ),
            }
          },
          false
        )

        toast({
          title: "Comment Deleted",
          description: "Your comment has been deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(err => {
        console.error(err)
        toast({
          title: "An error occured when deleteing your comment",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
    onClose()
  }

  const cancelRef = useRef()

  return (
    <>
      <IconButton
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
        {...props}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default DeleteCommentButton
