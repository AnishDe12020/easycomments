import CommentsTable from "@/components/CommentsTable"
import CommentsTableSkeleton from "@/components/CommentsTableSkeleton"
import Header from "@/components/Header"
import fetcher from "@/utils/fetcher"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend"
import { Box } from "@chakra-ui/react"
import React from "react"
import useSWR from "swr"

const Comments = () => {
  const { data } = useSWR("/api/my-comments", fetcher)

  return (
    <>
      <Header />
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
