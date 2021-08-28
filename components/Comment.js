import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Avatar,
  useColorMode,
} from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  dracula,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism"

const Comment = ({
  authorName,
  authorAvatar,
  comment,
  createdAt,
  status,
  isOwner,
}) => {
  const { colorMode } = useColorMode()
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
      <ReactMarkdown
        children={comment}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={colorMode === "light" ? solarizedlight : dracula}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </Box>
  )
}

export default Comment
