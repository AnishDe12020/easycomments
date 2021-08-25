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
          {sites.map(site => (
            <Tr key={site.id}>
              <Td>
                <NextLink href={`/comments/${site.id}`} passHref>
                  <Link>{site.name}</Link>
                </NextLink>
              </Td>
              <Td>
                <NextLink href={site.url} passHref>
                  <Link>{site.url}</Link>
                </NextLink>
              </Td>
              <Td>
                <NextLink href={`/sites/${site.id}`} passHref>
                  <Link>View Comments</Link>
                </NextLink>
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
