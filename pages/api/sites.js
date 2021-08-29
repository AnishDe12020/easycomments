import { getUserSites } from "@/utils/db-admin"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

const sites = async (req, res) => {
  const { user } = getSession(req)
  const { sites, error } = await getUserSites(user.email)

  if (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ sites })
}

export default withApiAuthRequired(sites)
