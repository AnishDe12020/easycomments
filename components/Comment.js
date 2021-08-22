import { Flex, Heading } from "@chakra-ui/react"
import React from "react"

const Comment = ({ authorName, comment, createdAt }) => {
  return (
    <Flex align="center">
      <Heading>{authorName}</Heading>
      <p>{comment}</p>
    </Flex>
  )
}

export default Comment
