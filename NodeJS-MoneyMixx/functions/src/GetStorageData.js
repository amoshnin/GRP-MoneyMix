const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.handler = functions.https.onRequest(async (request, response) => {
  let { userEmail } = request.body

  const firestore = admin.firestore()
  const bucket = admin.storage().bucket()

  let fileURLs = []
  let usedValue = 0
  const callBack = async () => {
    await firestore
      .collection(userEmail)
      .doc("StorageUsage")
      .get()
      .then(async (doc) => {
        if (doc.data()) {
          await firestore.collection(userEmail).doc("StorageUsage").update({
            value: usedValue,
            imagesURLs: fileURLs,
          })
        } else {
          await firestore.collection(userEmail).doc("StorageUsage").set({
            value: usedValue,
            imagesURLs: fileURLs,
          })
        }

        return null
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signedUrlConfig = { action: "read", expires: "03-17-2099" }
  bucket.getFiles({ prefix: `${userEmail}/operations` }, (err, files) => {
    console.log(err)

    if (files && files.length > 0) {
      files.forEach((file) => {
        file
          .getMetadata()
          .then((data) => {
            const metadata = data[0]
            usedValue = usedValue + Math.round(Number(metadata.size / 1000))

            return null
          })
          .catch((err) => {
            console.log(err)
          })

        file.getSignedUrl(signedUrlConfig, (err, fileURL) => {
          console.log(err)

          console.log(fileURL)
          const fileName = String(file.name)
            .replace("/", "")
            .replace(userEmail, "")
            .replace("operations", "")
            .replace("/", "")
          fileURLs = [
            ...fileURLs,
            {
              url: fileURL,
              storageID: fileName,
            },
          ]

          if (fileURLs.length === files.length) {
            callBack()
          }
        })
      })
    } else {
      callBack()
    }
  })
})
