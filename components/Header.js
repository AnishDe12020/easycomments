import React from "react"
import { Flex, Link, Avatar } from "@chakra-ui/react"
import { CopyIcon } from "@chakra-ui/icons"
const Header = () => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    backgroundColor="gray.900"
  >
    <Flex
      m={4}
      p={2}
      justifyContent="space-between"
      alignItems="center"
      height="50px"
    >
      <CopyIcon m={2} />
      <Link m={2} textAlign="center">
        Sites
      </Link>
      <Link m={2}>Feedback</Link>
    </Flex>
    <Flex justifyContent="space-between" alignItems="center" m={8} p={4}>
      <Link m={2}>Account</Link>
      <Link m={2}>Log Out</Link>
      <Avatar m={2} />
    </Flex>
  </Flex>
)

export default Header
