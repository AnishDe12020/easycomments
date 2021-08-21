import { firestore } from "@/lib/firebase"

export const createSite = async data => {
  return await firestore.collection("sites").add(data)
}

export const addComment = async data => {
  return await firestore.collection("comments").add(data)
}
