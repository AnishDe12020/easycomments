import Header from "@/components/Header"
import SiteTable from "@/components/SiteTable"
import SiteTableSkeleton from "@/components/SiteTableSkeleton"
import TableHeader from "@/components/TableHeader"
import fetcher from "@/utils/fetcher"
import { Box } from "@chakra-ui/react"
import useSWR from "swr"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend"

const Sites = () => {
  const { data } = useSWR("/api/sites", fetcher)
  console.log(data)

  return (
    <>
      <Header />
      <Box mx={32} my={8} p={4} direction="column">
        <TableHeader />

        {data ? <SiteTable items={data.sites} /> : <SiteTableSkeleton />}
      </Box>
    </>
  )
}

export default withPageAuthRequired(Sites)
