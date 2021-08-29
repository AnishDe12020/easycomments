import React from "react"
import { useUser } from "@auth0/nextjs-auth0"
import {
  Text,
  useColorModeValue,
  Box,
  Center,
  Stack,
  Skeleton,
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

  if (preferredColorMode) {
    if (colorMode !== preferredColorMode) {
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

  return (
    <>
      <CommentsLink paths={router?.query?.site || []} />
      <Box
        backgroundColor={commentsBg}
        p={{ md: 2, lg: 4 }}
        m={{ md: 1, lg: 2 }}
        borderRadius={4}
      >
        {allComments && siteData ? (
          allComments?.length > 0 ? (
            allComments.map(comment => (
              <Comment
                authorName={comment.authorName}
                authorAvatar={comment.authorAvatar}
                comment={comment.comment}
                createdAt={comment.createdAt}
                key={comment.id}
                status={comment.status}
                isEmbed
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
          <Stack>
            <Skeleton width="100%" height="70px" />
            <Skeleton width="100%" height="70px" />
            <Skeleton width="100%" height="70px" />
          </Stack>
        )}
      </Box>
    </>
  )
}

export default SiteComments
