import Header from "@/components/Header"
import SiteTable from "@/components/SiteTable"
import SiteTableSkeleton from "@/components/SiteTableSkeleton"
import TableHeader from "@/components/TableHeader"
import fetcher from "@/utils/fetcher"
import { Box } from "@chakra-ui/react"
import useSWR from "swr"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend"
import { NextSeo } from "next-seo"
import Footer from "@/components/Footer"

const Sites = () => {
  const { data } = useSWR("/api/sites", fetcher)

  return (
    <>
      <Header />
      <NextSeo
        title="My Sites"
        description="Easycomments - A web app that allows you to easily and quickly add comments to your site"
      />
      <Box mx={32} my={8} p={4} direction="column">
        <TableHeader />

        {data ? <SiteTable sites={data.sites} /> : <SiteTableSkeleton />}
      </Box>
      <Footer />
    </>
  )
}

export default withPageAuthRequired(Sites)
