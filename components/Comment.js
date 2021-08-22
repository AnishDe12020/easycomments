import { Box, Heading, Text } from "@chakra-ui/react"
import React from "react"

const Comment = ({ authorName, comment, createdAt }) => {
  return (
    <Box m={8} p={4}>
      <Heading>{authorName}</Heading>
      <Text size="lg">{comment}</Text>
    </Box>
  )
}

export default Comment
