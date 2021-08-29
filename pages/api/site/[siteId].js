import { getSite } from "@/utils/db-admin"

const siteApi = async (req, res) => {
  const siteId = req.query.siteId
  const { site, error } = await getSite(siteId)

  if (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json(site)
}

export default siteApi
