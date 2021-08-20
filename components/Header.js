import React from "react"
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Flex, Link, Avatar, Button } from "@chakra-ui/react"
import { CopyIcon, SunIcon, MoonIcon } from "@chakra-ui/icons"
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const headerBg = useColorModeValue("gray.100", "gray.900")
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={headerBg}
      h="80px"
    >
      <Flex m={4} p={2} justifyContent="space-between" alignItems="center">
        <CopyIcon m={2} />
        <Link m={2} textAlign="center">
          Sites
        </Link>
        <Link m={2}>Feedback</Link>
      </Flex>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </Button>
      <Flex justifyContent="space-between" alignItems="center" m={8} p={4}>
        <Link m={2}>Account</Link>
        <Link m={2}>Log Out</Link>
        <Avatar m={2} />
      </Flex>
    </Flex>
  )
}

export default Header
