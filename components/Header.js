import React from "react"
import NextLink from "next/link"
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Flex, Link, Avatar, Button } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { useUser } from "@auth0/nextjs-auth0"
import { Logo } from "@/styles/icons"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const headerBg = useColorModeValue("gray.100", "gray.900")
  const { user } = useUser()
  console.log(user)

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={headerBg}
      h="80px"
    >
      <Flex m={4} p={2} justifyContent="space-between" alignItems="center">
        <NextLink href="/" passHref>
          <Logo m={2} />
        </NextLink>
        <NextLink href="/sites" passHref>
          <Link m={2}>Sites</Link>
        </NextLink>
        <NextLink href="/comments" passHref>
          <Link m={2}>Comments</Link>
        </NextLink>
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
            <Link href="/api/auth/logout" m={2}>
              Log Out
            </Link>
            <Avatar m={2} src={user.picture} />
          </>
        ) : (
          <Link href="/api/auth/login" m={2}>
            Log In
          </Link>
        )}
      </Flex>
    </Flex>
  )
}

export default Header
