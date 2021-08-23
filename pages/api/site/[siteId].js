import { getSite } from "@/utils/db-admin"

const siteApi = async (req, res) => {
  const siteId = req.query.siteId
  const { site, error } = await getSite(siteId)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json(site)
}

export default siteApi
