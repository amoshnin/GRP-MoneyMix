import * as RNIap from "react-native-iap"

export const initilizeIAPConnection = async (nextFunction: () => void) => {
  await RNIap.initConnection()
    .then(async (connection) => {
      nextFunction()
    })
    .catch((error) => {
      console.warn(`IAP ERROR ${error.code}`, error.message)
    })
}
