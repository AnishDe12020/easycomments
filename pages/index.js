import Features from "@/components/Features"
import Header from "@/components/Header"
import { Box, Flex, Heading, Center } from "@chakra-ui/react"
import IframeResizer from "iframe-resizer-react"
import Head from "next/head"
import React from "react"
import { NextSeo } from "next-seo"

export default function Home() {
  return (
    <Box h="100vh">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Easy Comments"
        description="A web app that allows you to easily and quickly add comments to your site"
      />
      <Header />
      <Flex as="main" p={8} direction="column" margin="0 auto" maxW="800px">
        <Center>
          <Heading>Welcome to Easy Comments</Heading>
        </Center>
        <Features mt={8} />
      </Flex>
      <Box m={{ sm: 2, md: 4, lg: 8 }} height="100%">
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
