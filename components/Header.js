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
      h={{ sm: "50px", md: "60px", lg: "80px" }}
    >
      <Flex
        m={{ sm: 1, md: 2, lg: 4 }}
        p={{ sm: 0.5, md: 1, lg: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <NextLink href="/" passHref>
          <Logo color="white" m={2} />
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
      <Flex
        justifyContent="space-between"
        alignItems="center"
        m={{ sm: 2, md: 4, lg: 8 }}
        p={{ sm: 1, md: 2, lg: 4 }}
      >
        {user ? (
          <>
            <NextLink href="#" passHref>
              <Link>Account</Link>
            </NextLink>
            <Link href="/api/auth/logout">Log Out</Link>
            <Avatar
              m={{ sm: 0.5, md: 1, lg: 2 }}
              src={user.picture}
              alt="avatar"
            />
          </>
        ) : (
          <Link href="/api/auth/login">Log In</Link>
        )}
      </Flex>
    </Flex>
  )
}

export default Header
