import React from "react"
import { useUser } from "@auth0/nextjs-auth0"
import {
  Text,
  useColorModeValue,
  Box,
  Center,
  useColorMode,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import Comment from "@/components/Comment"

import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import CommentsLink from "@/components/CommentsLink"

import "iframe-resizer/js/iframeResizer.contentWindow"

const SiteComments = () => {
  const { user } = useUser()
  const router = useRouter()

  const { colorMode, toggleColorMode } = useColorMode()

  const commentsBg = useColorModeValue("gray.100", "gray.900")

  const siteAndRoute = router.query?.site
  const preferredColorMode = router.query?.colorMode
  const siteId = siteAndRoute ? siteAndRoute[0] : null
  const route = siteAndRoute ? siteAndRoute[1] : null

  console.log("e", colorMode, preferredColorMode)

  if (preferredColorMode) {
    if (colorMode !== preferredColorMode) {
      console.log("toggle")
      toggleColorMode()
    }
  }

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

  return (
    <>
      <CommentsLink paths={router?.query?.site || []} />
      <Box backgroundColor={commentsBg} p={4} m={2} borderRadius={4}>
        {allComments ? (
          allComments?.length > 0 ? (
            allComments.map(comment => (
              <Comment
                authorName={comment.authorName}
                authorAvatar={comment.authorAvatar}
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
