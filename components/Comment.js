import { Box, Heading, Text, Flex, Badge } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import React from "react"

const Comment = ({ authorName, comment, createdAt, status, isOwner }) => {
  return (
    <Box m={8} p={4}>
      <Flex align="end" p={0.5}>
        <Heading fontSize="2xl">{authorName}</Heading>
        <Text fontSize="md" ml={2}>
          {format(parseISO(createdAt), "PPpp")}
        </Text>
        {isOwner && (
          <Badge
            colorScheme={
              status === "pending"
                ? "yellow"
                : status === "approved"
                ? "green"
                : "red"
            }
            ml={2}
            mb={1}
          >
            {status === "pending"
              ? "Pending"
              : status === "approved"
              ? "Approved"
              : "Removed"}
          </Badge>
        )}
      </Flex>
      <Text fontSize="lg" p={0.5}>
        {comment}
      </Text>
    </Box>
  )
}

export default Comment
