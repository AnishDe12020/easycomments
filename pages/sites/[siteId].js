import CommentsTable from "@/components/CommentsTable"
import CommentsTableSkeleton from "@/components/CommentsTableSkeleton"
import Header from "@/components/Header"
import fetcher from "@/utils/fetcher"
import { Box } from "@chakra-ui/react"
import React from "react"
import useSWR from "swr"
import { useRouter } from "next/router"

const Comments = () => {
  const router = useRouter()
  const siteId = router.query.siteId
  const { data } = useSWR(`/api/comments/${siteId}`, fetcher)
  console.log(data)

  return (
    <>
      <Header />
      <Box mx={32} my={8} p={4} direction="column">
        {data ? (
          <CommentsTable comments={data.comments} />
        ) : (
          <CommentsTableSkeleton />
        )}
      </Box>
    </>
  )
}

export default Comments
