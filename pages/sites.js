import AddSiteModal from "@/components/AddSiteModal"
import Header from "@/components/Header"
import SiteTable from "@/components/SiteTable"
import SiteTableSkeleton from "@/components/SiteTableSkeleton"
import fetcher from "@/utils/fetcher"
import useSWR from "swr"

const Sites = () => {
  const { data } = useSWR("/api/sites", fetcher)
  console.log(data)

  return (
    <>
      <Header />
      <AddSiteModal>+ Add Site</AddSiteModal>

      {data ? <SiteTable items={data.sites} /> : <SiteTableSkeleton />}
    </>
  )
}

export default Sites
