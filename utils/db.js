import { firestore } from "@/lib/firebase"

export const createSite = async data => {
  return await firestore.collection("sites").add(data)
}
