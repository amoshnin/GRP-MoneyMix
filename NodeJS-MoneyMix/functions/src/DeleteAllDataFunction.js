const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.handler = functions.https.onRequest(async (request, response) => {
  let { userEmail, selectedProfile, selectedCurrency } = request.body

  const firestore = admin.firestore()

  await firestore.collection(userEmail).doc("GeneralInfo").update({
    SecretCode: null,
    avatar: null,
  })

  await firestore
    .collection(userEmail)
    .doc("Profiles")
    .collection(selectedProfile)
    .doc("billsList")
    .set({
      normalBillsList: [
        {
          name: "Cash",
          type: "NormalBill",
          accountBalance: 0,
          icon: "dollar",
          takeIntoTotalBalance: true,
        },
        {
          name: "Card",
          type: "NormalBill",
          accountBalance: 0,
          icon: "credit-card",
          takeIntoTotalBalance: true,
        },
      ],
      savingsBillsList: null,
      debtsBillsList: null,
    })

  await firestore
    .collection(userEmail)
    .doc("Profiles")
    .collection(selectedProfile)
    .doc("GeneralInfo")
    .set({
      budgetEnabled: false,
      selectedCurrency: selectedCurrency,
      importantBills: [
        { type: "Cash", name: "Cash" },
        { type: "Card", name: "Card" },
      ],
    })

  await firestore
    .collection(userEmail)
    .doc("Profiles")
    .collection(selectedProfile)
    .doc("operations")
    .set({
      operations: [],
    })

  await firestore
    .collection(userEmail)
    .doc("Profiles")
    .collection(selectedProfile)
    .doc("templates")
    .set({
      templates: [],
    })
})
