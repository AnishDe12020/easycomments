import React from "react"
import NextLink from "next/link"
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Flex, Link, Avatar, Button } from "@chakra-ui/react"
import { CopyIcon, SunIcon, MoonIcon } from "@chakra-ui/icons"
import { useUser } from "@auth0/nextjs-auth0"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const headerBg = useColorModeValue("gray.100", "gray.900")
  const { user } = useUser()

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
        <Link m={2}>Comments</Link>
      </Flex>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </Button>
      <Flex justifyContent="space-between" alignItems="center" m={8} p={4}>
        {user ? (
          <>
            <NextLink href="#" passHref>
              <Link m={2}>Account</Link>
            </NextLink>
            <NextLink href="/api/auth/logout" passHref>
              <Link m={2}>Log Out</Link>
            </NextLink>
            <Avatar m={2} src={user.picture} />
          </>
        ) : (
          <NextLink href="/api/auth/login" passHref>
            <Link m={2}>Log In</Link>
          </NextLink>
        )}
      </Flex>
    </Flex>
  )
}

export default Header
