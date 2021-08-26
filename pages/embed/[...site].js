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
import CommentsLink from "@/components/CommentsLink"

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
      <CommentsLink />
      <Box backgroundColor={commentsBg} p={4}>
        {allComments ? (
          allComments.length > 0 ? (
            allComments.map(comment => (
              <Comment
                authorName={comment.authorName}
                comment={comment.comment}
                createdAt={comment.createdAt}
                key={comment.id}
                status={comment.status}
                isOwner={comment.authorEmail === user?.email}
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
