import { Box, Heading, Text, Flex } from "@chakra-ui/react"
import React from "react"

const Comment = ({ authorName, comment, createdAt }) => {
  return (
    <Box m={8} p={4}>
      <Flex align="end" p={0.5}>
        <Heading fontSize="2xl">{authorName}</Heading>
        <Text fontSize="md" ml={2}>
          {createdAt}
        </Text>
      </Flex>
      <Text fontSize="lg" p={0.5}>
        {comment}
      </Text>
    </Box>
  )
}

export default Comment
