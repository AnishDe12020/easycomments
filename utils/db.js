import { firestore } from "@/lib/firebase"

export const createSite = async data => {
  return await firestore.collection("sites").add(data)
}

export const updateSite = async (id, newData) => {
  return await firestore.collection("sites").doc(id).update(newData)
}

export const addComment = async data => {
  return await firestore.collection("comments").add(data)
}

export const updateComment = async (id, newData) => {
  return await firestore.collection("comments").doc(id).update(newData)
}

export const deleteSite = async id => {
  const batch = firestore.batch()

  const snapshot = await firestore
    .collection("comments")
    .where("siteId", "==", id)
    .get()

  snapshot.forEach(doc => {
    batch.delete(doc.ref)
  })

  const siteRef = firestore.collection("sites").doc(id)

  batch.delete(siteRef)

  return await batch.commit()
}
