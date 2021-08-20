import { getAllSites } from "@/utils/db-admin"
import { withApiAuthRequired } from "@auth0/nextjs-auth0"

const sites = async (req, res) => {
  const { sites, error } = await getAllSites()

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ sites })
}

export default withApiAuthRequired(sites)
