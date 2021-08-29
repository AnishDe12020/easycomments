import CommentsTable from "@/components/CommentsTable"
import CommentsTableSkeleton from "@/components/CommentsTableSkeleton"
import Header from "@/components/Header"
import fetcher from "@/utils/fetcher"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend"
import { Box } from "@chakra-ui/react"
import React from "react"
import useSWR from "swr"
import { NextSeo } from "next-seo"

const Comments = () => {
  const { data } = useSWR("/api/my-comments", fetcher)

  return (
    <>
      <Header />
      <NextSeo
        title="My Comments"
        description="Easycomments - A web app that allows you to easily and quickly add comments to your site"
      />
      <Box mx={32} my={8} p={4} direction="column">
        {data ? (
          <CommentsTable isMyComments comments={data.comments} />
        ) : (
          <CommentsTableSkeleton />
        )}
      </Box>
    </>
  )
}

export default withPageAuthRequired(Comments)
