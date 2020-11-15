const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.handler = functions.https.onRequest(async (request, response) => {
  let { userEmail, date } = request.body

  const firestore = admin.firestore()
  const fieldValue = admin.firestore.FieldValue

  const profilesNames = await firestore
    .collection(userEmail)
    .doc("GeneralInfo")
    .get()
    .then((doc) => doc.data().ProfilesList)

  firestore
    .collection(userEmail)
    .doc("ReservedCopies")
    .collection(date)
    .doc("ProfilesList")
    .set({
      ProfilesNames: profilesNames,
    })

  await profilesNames.forEach(async (profileName) => {
    const snapshot = await firestore
      .collection(userEmail)
      .doc("Profiles")
      .collection(profileName)
      .get()

    await snapshot.docs.map((doc) => {
      firestore
        .collection(userEmail)
        .doc("ReservedCopies")
        .collection(date)
        .doc("Doc")
        .collection(profileName)
        .doc(doc.id)
        .set(doc.data())
    })

    firestore
      .collection(userEmail)
      .doc("GeneralInfo")
      .update({
        ReservedCopiesList: fieldValue.arrayUnion(date),
      })
  })
})
