import { getMyComments } from "@/utils/db-admin"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

const comments = async (req, res) => {
  const { user } = getSession(req)
  const { comments, error } = await getMyComments(user.email)

  if (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ comments })
}

export default withApiAuthRequired(comments)
