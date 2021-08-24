import React, { cloneElement } from "react"
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
} from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import { Form, Formik } from "formik"

const CommentsTable = ({ comments }) => {
  const selectOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "removed", label: "Removed" },
  ]
  if (comments.length > 0) {
    const handleChange = (e, id) => {
      console.log(e.target.value, id)
    }
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Author Name</Th>
            <Th>Comment</Th>
            <Th>Site</Th>
            <Th>Site URL</Th>
            <Th>Route</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map(comment => (
            <Tr key={comment.id}>
              <Td>
                <Link>{comment.authorName}</Link>
              </Td>
              <Td>{comment.comment}</Td>
              <Td>{comment.siteName}</Td>
              <Td>
                <NextLink href={comment.siteUrl} passHref>
                  <Link>{comment.siteUrl}</Link>
                </NextLink>
              </Td>
              <Td>
                <Code>{comment.route}</Code>
              </Td>
              <Td>{format(parseISO(comment.createdAt), "PPpp")}</Td>
              <Td>
                <Select
                  onChange={e => handleChange(e, comment.id)}
                  name="status"
                >
                  {selectOptions.map(option => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Td>
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
