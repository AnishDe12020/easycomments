import Header from "@/components/Header"
import { Box, Flex } from "@chakra-ui/react"
import IframeResizer from "iframe-resizer-react"
import Head from "next/head"
import React from "react"

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
      <Box m={8} height="100%">
        <IframeResizer
          style={{
            width: "1px",
            minWidth: "100%",
            height: "1px",
            minHeight: "100%",
          }}
          src={process.env.NEXT_PUBLIC_SITE_EMBED_URL}
          title="Comments"
        />
      </Box>
    </Box>
  )
}
