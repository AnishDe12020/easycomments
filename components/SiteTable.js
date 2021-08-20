import React from "react"
import { Table, Thead, Tr, Td, Th, Tbody, Link } from "@chakra-ui/react"

const SiteTable = ({ items }) => {
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
            <Td>{item.url}</Td>
            <Td>
              <Link>View Comments</Link>
            </Td>
            <Td>Will be delete site button</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default SiteTable
