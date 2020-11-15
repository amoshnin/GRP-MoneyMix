const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.handler = functions.https.onRequest(async (request, response) => {
  let { userEmail, ID } = request.body

  const firestore = admin.firestore()

  const profilesNames = await firestore
    .collection(userEmail)
    .doc("ReservedCopies")
    .collection(ID)
    .doc("ProfilesList")
    .get()
    .then(async (doc) => {
      const data = await doc.data()
      if (data) {
        return data.ProfilesNames
      } else {
        return []
      }
    })

  await profilesNames.forEach(async (profileName) => {
    const snapshot = await firestore
      .collection(userEmail)
      .doc("ReservedCopies")
      .collection(ID)
      .doc("Doc")
      .collection(profileName)
      .get()

    const docsNames = await snapshot.docs.map((doc) => doc.id)

    docsNames.forEach(async (docName) => {
      await firestore
        .collection(userEmail)
        .doc("ReservedCopies")
        .collection(ID)
        .doc("Doc")
        .collection(profileName)
        .doc(docName)
        .delete()
    })
  })

  await firestore
    .collection(userEmail)
    .doc("ReservedCopies")
    .collection(ID)
    .doc("ProfilesList")
    .delete()
})
