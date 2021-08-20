const { getAllSites } = require("@/utils/db-admin")

const sites = async (req, res) => {
  const { sites, error } = await getAllSites()

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ sites })
}

export default sites
