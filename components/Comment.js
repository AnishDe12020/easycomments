import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Avatar,
  IconButton,
  useColorMode,
  useToast,
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
import { DeleteIcon } from "@chakra-ui/icons"
import { deleteComment } from "@/utils/db"
import DeleteCommentButton from "./DeleteCommentButton"
import EditCommentModal from "./EditCommentModal"

const Comment = ({
  commentId,
  authorName,
  authorAvatar,
  comment,
  createdAt,
  status,
  isOwner,
  siteSettings,
  siteId,
  route,
  isEmbed,
}) => {
  const { colorMode } = useColorMode()
  const toast = useToast()
  console.log("e", siteSettings)

  const handleDelete = async () => {
    console.log("delete")
    await deleteComment(id)
      .then(() => {
        toast({
          title: "Comment Deleted",
          description: "Your comment has been successfully deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(err => {
        console.error(err)
        toast({
          title: "An error occured when deleting your comment",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
  }

  return (
    <Box m={8} p={4}>
      <Flex justifyContent="space-between">
        <Flex align="end" p={0.5}>
          {siteSettings.showAvatar && (
            <Avatar src={authorAvatar} size="xs" mb={1} mr={2} />
          )}
          <Heading fontSize={{ sm: "md", md: "lg", lg: "xl", xl: "2xl" }}>
            {authorName}
          </Heading>
          {(siteSettings.showDate || siteSettings.showTime) && (
            <Text fontSize={{ sm: "xs", md: "sm", lg: "md", xl: "lg" }} ml={2}>
              {format(
                parseISO(createdAt),
                siteSettings.showDate && siteSettings.showTime
                  ? "PPpp"
                  : siteSettings.showDate
                  ? "PPP"
                  : "pp"
              )}
            </Text>
          )}
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
        {isOwner && !isEmbed && (
          <Box>
            <EditCommentModal
              siteId={siteId}
              route={route}
              comment={comment}
              commentId={commentId}
            />
            <DeleteCommentButton
              ml={2}
              siteId={siteId}
              route={route}
              commentId={commentId}
            />
          </Box>
        )}
      </Flex>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={colorMode === "light" ? solarizedlight : dracula}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {comment}
      </ReactMarkdown>
    </Box>
  )
}

export default Comment
