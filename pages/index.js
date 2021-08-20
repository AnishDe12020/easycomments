import Header from "@/components/Header"
import { Box, Flex } from "@chakra-ui/react"
import Head from "next/head"

export default function Home() {
  return (
    <Box h="100vh">
      <Head>
        <title>Easy Comments</title>
        <meta
          name="description"
          content="A web app that allows you to easily and quickly add comments to your site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Flex as="main" p={8} direction="column" margin="0 auto" maxW="800px">
        <h1>Welcome to Easy Comments</h1>
        <h3>
          Easy Comments provides you with an easy and quick way to add comments
          to your site
        </h3>
      </Flex>
    </Box>
  )
}
