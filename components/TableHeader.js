import { Breadcrumb, BreadcrumbLink } from "@chakra-ui/breadcrumb"
import { Heading } from "@chakra-ui/layout"
import React from "react"

const TableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex>
      <Heading m={8}>All Sites</Heading>
    </Flex>
  </>
)

export default TableHeader
