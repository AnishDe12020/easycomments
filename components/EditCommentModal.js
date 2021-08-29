import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { Formik, Form, ErrorMessage } from "formik"
import { updateComment } from "@/utils/db"
import { mutate } from "swr"
import { RiPencilFill } from "react-icons/ri"

const EditCommentModal = ({
  comment,
  commentId,
  siteId,
  route,
  isMyComments,
}) => {
  console.log("ee", comment)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()

  const toast = useToast()

  const commentsApiUrl = route
    ? `/api/comments/${siteId}/${route}`
    : `/api/comments/${siteId}`

  return (
    <>
      <IconButton onClick={onOpen} icon={<RiPencilFill />} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            commentText: comment,
          }}
          validate={values => {
            const errors = {}
            if (!values.commentText) {
              errors.commentText = "Required"
            }
            return errors
          }}
          onSubmit={async ({ commentText }, { setSubmitting }) => {
            const newCommentData = {
              comment: commentText,
              isEdited: true,
            }
            await updateComment(commentId, newCommentData)
              .then(() => {
                mutate(isMyComments ? `/api/my-comments` : commentsApiUrl)

                toast({
                  title: "Comment Editted",
                  description: "Your comment has been editted",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
                onClose()
              })
              .catch(error => {
                console.error(error)
                toast({
                  title: "An error occured when editting your comment",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              })

            setSubmitting(false)
          }}
        >
          {({ isSubmitting, values, handleBlur, handleChange }) => (
            <ModalContent>
              <Form>
                <ModalHeader>Edit Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Comment</FormLabel>
                    <Textarea
                      ref={initialRef}
                      value={values.commentText}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="commentText"
                      placeholder="Enter your comment here"
                    />
                    <ErrorMessage name="commentText" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default EditCommentModal
