import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react"
import React from "react"
import AddSiteModal from "./AddSiteModal"

const TableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  </>
)

export default TableHeader
