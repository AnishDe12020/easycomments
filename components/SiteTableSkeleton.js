import { Tr, Table, Td, Th, Thead, Tbody, Skeleton } from "@chakra-ui/react"
import React from "react"

const SkeletonRow = ({ width }) => (
  <Tr>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Tr>
)

const SiteTableSkeleton = () => (
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
      <SkeletonRow width="100px" />
      <SkeletonRow width="150px" />
      <SkeletonRow width="100px" />
      <SkeletonRow width="75px" />
    </Tbody>
  </Table>
)

export default SiteTableSkeleton
