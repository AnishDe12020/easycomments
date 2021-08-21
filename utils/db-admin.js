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
