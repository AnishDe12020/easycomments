import React, { useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import {
  Textarea,
  Text,
  Button,
  useToast,
  useColorModeValue,
  Box,
  Center,
} from "@chakra-ui/react"
import Header from "@/components/Header"
import { useRouter } from "next/router"
import Comment from "@/components/Comment"

import { Formik, Form, ErrorMessage } from "formik"
import { addComment } from "@/utils/db"
import useSWR, { mutate } from "swr"
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

  const { data: commentsData } = useSWR(commentsApiUrl, fetcher)
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher)

  let allComments = []

  if (commentsData) {
    const allCommentsData = commentsData.comments

    const othersComments = allCommentsData.filter(
      comment =>
        comment.status === "approved" && comment.authorEmail !== user?.email
    )

    const userComments = allCommentsData.filter(
      comment => comment.authorEmail === user?.email
    )

    allComments = [...userComments, ...othersComments]
  }

  console.log(siteData)

  const toast = useToast()

  const handleLoginClick = e => {
    e.preventDefault()
    router.push("/api/auth/login")
  }

  return (
    <>
      <Header />
      <Box m={8} p={4} flexDirection="column">
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
                siteName: siteData?.name,
                siteUrl: siteData?.url,
                route: route || "/",
                authorName: user.given_name + " " + user.family_name,
                authorEmail: user.email,
                authorAvatar: user.picture,
                comment: values.comment,
                createdAt: new Date().toISOString(),
                status: "pending",
              }

              console.log(newComment)

              addComment(newComment)
                .then(() => {
                  mutate(commentsApiUrl)

                  toast({
                    title: "Comment added",
                    description: "Your comment has been successfully added",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                })
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
              </Form>
            )}
          </Formik>
        ) : (
          <Button onClick={handleLoginClick}>Log in to leave a comment</Button>
        )}
      </Box>

      <Box backgroundColor={commentsBg} m={8} borderRadius={16} p={4}>
        {allComments && siteData ? (
          allComments.length > 0 ? (
            allComments.map(comment => (
              <Comment
                authorName={comment.authorName}
                authorAvatar={comment.authorAvatar}
                comment={comment.comment}
                createdAt={comment.createdAt}
                key={comment.id}
                status={comment.status}
                isOwner={comment.authorEmail === user?.email}
                siteSettings={siteData.settings}
              />
            ))
          ) : (
            <Center>
              <Text p={2} fontSize="20px">
                No comments yet
              </Text>
            </Center>
          )
        ) : (
          <Text>Loading comments...</Text>
        )}
      </Box>
    </>
  )
}

export default SiteComments
