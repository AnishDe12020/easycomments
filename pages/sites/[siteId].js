import CommentsTable from "@/components/CommentsTable"
import CommentsTableSkeleton from "@/components/CommentsTableSkeleton"
import Header from "@/components/Header"
import fetcher from "@/utils/fetcher"
import { Box } from "@chakra-ui/react"
import React from "react"
import useSWR from "swr"
import { useRouter } from "next/router"
import { NextSeo } from "next-seo"

const Comments = () => {
  const router = useRouter()
  const siteId = router.query.siteId
  const { data } = useSWR(`/api/comments/${siteId}`, fetcher)

  return (
    <>
      <Header />
      <NextSeo
        title="Site Comments"
        description="Easycomments - A web app that allows you to easily and quickly add comments to your site"
      />
      <Box mx={32} my={8} p={4} direction="column">
        {data ? (
          <CommentsTable siteId={siteId} comments={data.comments} />
        ) : (
          <CommentsTableSkeleton />
        )}
      </Box>
    </>
  )
}

export default Comments
