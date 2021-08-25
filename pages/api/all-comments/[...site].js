import { getAllSiteComments } from "@/utils/db-admin"

const siteComments = async (req, res) => {
  const [siteId, route] = req.query.site
  const { comments, error } = await getAllSiteComments(siteId, route)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ comments })
}

export default siteComments