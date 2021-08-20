import Header from "@/components/Header"
import { Box } from "@chakra-ui/react"
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
    </Box>
  )
}
