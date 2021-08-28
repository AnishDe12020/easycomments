import { Box, Heading, Text, Flex, Badge, Avatar } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Comment = ({
  authorName,
  authorAvatar,
  comment,
  createdAt,
  status,
  isOwner,
}) => {
  return (
    <Box m={8} p={4}>
      <Flex align="end" p={0.5}>
        <Avatar src={authorAvatar} size="xs" mb={1} />
        <Heading fontSize="2xl" ml={2}>
          {authorName}
        </Heading>
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
      <ReactMarkdown children={comment} remarkPlugins={[remarkGfm]} />
    </Box>
  )
}

export default Comment
