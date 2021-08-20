import React from "react"
import { Table, Thead, Tr, Td, Tbody } from "@chakra-ui/react"

const Table = () => {
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
    </Table>
  )
}

export default Table
