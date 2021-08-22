import { db } from "@/lib/firebase-admin"

export const getAllSites = async () => {
  try {
    const snapshot = await db.collection("sites").get()
    const sites = []

    snapshot.forEach(doc => {
      sites.push({ id: doc.id, ...doc.data() })
    })

    return { sites }
  } catch (error) {
    return { error }
  }
}

export const getUserSites = async email => {
  try {
    const snapshot = await db
      .collection("sites")
      .where("authorEmail", "==", email)
      .get()
    const sites = []

    snapshot.forEach(doc => {
      sites.push({ id: doc.id, ...doc.data() })
    })

    return { sites }
  } catch (error) {
    return { error }
  }
}

export const getUserComments = async email => {
  try {
    const data = await getUserSites(email)
    // console.log(data.sites)

    let i,
      j,
      tmp,
      chunk = 10
    const comments = []

    for (i = 0, j = data.sites.length; i < j; i += chunk) {
      tmp = data.sites.slice(i, i + chunk)
      const snapshot = await db
        .collection("comments")
        .where(
          "siteId",
          "in",
          tmp.map(site => site.id)
        )
        .get()

      console.log(snapshot)

      snapshot.forEach(doc => {
        comments.push({ id: doc.id, ...doc.data() })
      })
    }

    return { comments }
  } catch (error) {
    return { error }
  }
}
