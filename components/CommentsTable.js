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
} from "@chakra-ui/react"

const CommentsTable = ({ comments }) => {
  if (comments.length > 0) {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Comment</Th>
            <Th>Route</Th>
            <Th>{""}</Th>
            <Th>{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map(comment => (
            <Tr key={comment.id}>
              <Td>
                <Link>{comment.authorName}</Link>
              </Td>
              <Td>{comment.comment}</Td>
              <Td>
                <Code>{comment.route}</Code>
              </Td>
              <Td>Will be approve comment button</Td>
              <Td>Will be delete comment button</Td>
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
}

export default CommentsTable
