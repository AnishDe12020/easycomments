import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Avatar,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons"
import { useUser } from "@auth0/nextjs-auth0"
import { Logo } from "@/styles/icons"
import { useRouter } from "next/router"

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()
  const { user } = useUser()
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Logo />

          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            variant={"ghost"}
            ml={8}
            aria-label={"Toggle Color Mode"}
          />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user ? (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/api/auth/logout"}
              >
                Sign Out
              </Button>
              <Avatar m={2} src={user.picture} alt="avatar" />
            </>
          ) : (
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={`/api/auth/login?returnTo=${router.asPath}`}
            >
              Sign In
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("gray.800", "white")

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href ?? "#"} passHref>
            <Link
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack spacing={4}>
      <NextLink href={href ?? "#"} passHref>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Flex>
      </NextLink>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: "Sites",
    href: "/sites",
  },
  {
    label: "Comments",
    href: "/comments",
  },
  {
    label: "My Comments",
    href: "/my-comments",
  },
]
