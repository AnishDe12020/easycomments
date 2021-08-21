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
} from "@chakra-ui/react"
import AddSiteModal from "./AddSiteModal"

const SiteTable = ({ sites }) => {
  if (sites.length > 0) {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>URL</Th>
            <Th>Comments</Th>
            <Th>{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(item => (
            <Tr key={item.id}>
              <Td>
                <Link>{item.name}</Link>
              </Td>
              <Td>
                <NextLink href={item.url} passHref>
                  <Link>{item.url}</Link>
                </NextLink>
              </Td>
              <Td>
                <Link>View Comments</Link>
              </Td>
              <Td>Will be delete site button</Td>
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
          Add some sites first!
        </Text>
        <AddSiteModal>+ Add your first site</AddSiteModal>
      </Flex>
    )
  }
}

export default SiteTable
