import React, { useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import {
  Textarea,
  Button,
  useToast,
  useColorModeValue,
  Box,
  Flex,
} from "@chakra-ui/react"
import Header from "@/components/Header"
import { useRouter } from "next/dist/client/router"
import Comment from "@/components/Comment"

import { Formik, Form, ErrorMessage } from "formik"
import { addComment } from "@/utils/db"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"

const SiteComments = () => {
  const { user } = useUser()
  const router = useRouter()

  const commentsBg = useColorModeValue("gray.100", "gray.900")

  const siteAndRoute = router.query?.site
  const siteId = siteAndRoute ? siteAndRoute[0] : null
  const route = siteAndRoute ? siteAndRoute[1] : null

  const commentsApiUrl = route
    ? `/api/comments/${siteId}/${route}`
    : `/api/comments/${siteId}`

  const { data } = useSWR(commentsApiUrl, fetcher)

  const allComments = data?.comments

  const toast = useToast()

  const handleLoginClick = e => {
    e.preventDefault()
    router.push("/api/auth/login")
  }

  return (
    <>
      <Header />
      {user ? (
        <Formik
          initialValues={{ comment: "" }}
          validate={values => {
            const errors = {}
            if (!values.comment) {
              errors.comment = "Required"
            }

            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const newComment = {
              siteId,
              route: route || "/",
              authorName: user.given_name + " " + user.family_name,
              authorEmail: user.email,
              comment: values.comment,
              createdAt: new Date().toISOString(),
              status: "pending",
            }

            console.log(newComment)

            addComment(newComment)
              .then(
                toast({
                  title: "Comment added",
                  description: "Your comment has been successfully added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              )
              .catch(error => {
                console.error(error)
                toast({
                  title: "An error occured when adding your comment",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              })
            setSubmitting(false)
          }}
        >
          {({ isSibmitting, handleChange, handleBlur }) => (
            <Form>
              <Box m={8} p={4} flexDirection="column">
                <Textarea
                  placeholder="Write a comment..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="comment"
                />
                <ErrorMessage name="comment" />
                <Button type="submit" mt={4} isLoading={isSibmitting}>
                  Leave a Comment
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      ) : (
        <Button onClick={handleLoginClick}>Log in to leave a comment</Button>
      )}

      <Box backgroundColor={commentsBg} m={8} borderRadius={16} p={4}>
        {allComments &&
          allComments.map(comment => (
            <Comment
              authorName={comment.authorName}
              comment={comment.comment}
              createdAt={comment.createdAt}
              key={comment.id}
            />
          ))}
      </Box>
    </>
  )
}

export default SiteComments
