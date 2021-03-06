import React from "react"
import NextLink from "next/link"
import {
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Link,
  Flex,
  Text,
  Code,
  Select,
  useToast,
} from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import { updateComment } from "@/utils/db"
import { mutate } from "swr"
import EditCommentModal from "./EditCommentModal"
import DeleteCommentButton from "./DeleteCommentButton"

const CommentsTable = ({ siteId, comments, isMyComments }) => {
  const toast = useToast()

  const selectOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "removed", label: "Removed" },
  ]
  if (comments) {
    if (comments.length > 0) {
      const handleChange = async (e, id) => {
        const { value } = e.target
        await updateComment(id, { status: value })
          .then(() => {
            if (siteId) {
              mutate(
                `/api/comments/${siteId}`,
                async () => {
                  const otherComments = comments.filter(
                    comment => comment.id !== id
                  )
                  return {
                    comments: [
                      ...otherComments,
                      {
                        ...comments.find(comment => comment.id === id),
                        status: value,
                      },
                    ],
                  }
                },
                false
              )
            } else {
              mutate(
                "/api/comments",
                async () => {
                  const otherComments = comments.filter(
                    comment => comment.id !== id
                  )
                  return {
                    comments: [
                      ...otherComments,
                      {
                        ...comments.find(comment => comment.id === id),
                        status: value,
                      },
                    ],
                  }
                },
                false
              )
            }

            toast({
              title: "Comment Status Updated",
              description: `The status of the comment has been changed to ${value}.`,
              status: "success",
              duration: 5000,
              isClosable: true,
            })
          })
          .catch(err => {
            toast({
              title: "An error occured",
              description: err.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          })
      }
      return (
        <Table>
          <Thead>
            <Tr>
              <Th>Author Name</Th>
              <Th>Comment</Th>
              <Th>Site</Th>
              <Th>Route</Th>
              <Th>Date and Time</Th>
              {isMyComments ? (
                <>
                  <Th>{""}</Th>
                  <Th>{""}</Th>
                </>
              ) : (
                <Th>Status</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {comments.map(comment => (
              <Tr key={comment.id}>
                <Td>{comment.authorName}</Td>
                <Td>
                  <Text w={{ sm: 32, md: 64, lg: 128, xl: 256 }}>
                    {comment.comment}
                  </Text>
                </Td>
                <Td>
                  <NextLink
                    href={
                      comment.route === "/"
                        ? `${comment.siteUrl}/comments/${comment.siteId}`
                        : `${comment.siteUrl}/comments/${comment.siteId}/${comment.route}`
                    }
                    passHref
                  >
                    <Link>{comment.siteName}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <Code>{comment.route}</Code>
                </Td>
                <Td>{format(parseISO(comment.createdAt), "PPpp")}</Td>
                {isMyComments ? (
                  <>
                    <Td>
                      <EditCommentModal
                        siteId={comment.siteId}
                        route={comment.route}
                        commentId={comment.id}
                        comment={comment.comment}
                        isMyComments
                      />
                    </Td>
                    <Td>
                      <DeleteCommentButton
                        siteId={comment.siteId}
                        route={comment.route}
                        commentId={comment.id}
                        isMyComments
                      />
                    </Td>
                  </>
                ) : (
                  <Td>
                    <Select
                      onChange={e => handleChange(e, comment.id)}
                      name="status"
                      value={comment.status}
                    >
                      {selectOptions.map(option => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )
    } else {
      return (
        <Flex
          direction="column"
          p={4}
          m={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text pb={8} fontSize="30px">
            You don&apos;t have any comments yet.
          </Text>
        </Flex>
      )
    }
  } else {
    return <h1>Loading</h1>
  }
}

export default CommentsTable
