import { firestore } from "@/lib/firebase"

export const createSite = async data => {
  try {
    return await firestore.collection("sites").add(data)
  } catch (error) {
    console.log(error)
  }
}

export const updateSite = async (id, newData) => {
  try {
    return await firestore.collection("sites").doc(id).update(newData)
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async data => {
  try {
    return await firestore.collection("comments").add(data)
  } catch (error) {
    console.log(error)
  }
}

export const updateComment = async (id, newData) => {
  try {
    return await firestore.collection("comments").doc(id).update(newData)
  } catch (error) {
    console.log(error)
  }
}

export const deleteComment = async id => {
  try {
    return await firestore.collection("comments").doc(id).delete()
  } catch (error) {
    console.log(error)
  }
}

export const deleteSite = async id => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}
