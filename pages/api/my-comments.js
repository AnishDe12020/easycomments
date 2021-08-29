import { getAllComments } from "@/utils/db-admin"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

const comments = async (req, res) => {
  const { user } = getSession(req)
  const { comments, error } = await getAllComments(user.email)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ comments })
}

export default withApiAuthRequired(comments)
