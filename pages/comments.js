import CommentsTable from "@/components/CommentsTable"
import Header from "@/components/Header"
import { Box } from "@chakra-ui/react"
import React from "react"
import useSWR from "swr"

const Comments = () => {
  const { data } = useSWR("/api/comments")
  console.log(data)

  return (
    <>
      <Header />
      <Box mx={32} my={8} p={4} direction="column">
        {data ? (
          <CommentsTable comments={data.comments} />
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
    </>
  )
}

export default Comments
