//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import * as RNIap from "react-native-iap"

import { DefaultInitialData } from "~/Components/Shared/Helpers/Constants/GeneralInfo"
import { setLocaleLanguage } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

import {
  getInitialGeneralDataThunkCreator,
  getProfilesListThunkCreator,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import {
  getCategoriesListsThunkCreator,
  getImporantBillsThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { deleteUserThunkCreator } from "~/Redux/Reducers/AuthReducers/AuthSetReducer"
import { createReserveCopyThunkCreator } from "~/Redux/Reducers/ReserveDataReducers/ReserveDataSetReducer"

import dayjs from "dayjs"
import { getOnlineStatus } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////

const initialState = {
  isSubscribed: false as boolean,
}

type initialStateType = typeof initialState

// *REDUCER* //
const PremiumAuthSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default PremiumAuthSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setSubscriptionStatusActionCreator: (isSubscribed: boolean) =>
    ({
      type: "SET_SUBSCRIPTION_STATUS",
      isSubscribed,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Create new profile
export const createNewProfileThunkCreator = (
  newProfileName: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()

    await firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .update({
        ProfilesList: firestore.FieldValue.arrayUnion(newProfileName),
      })

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(newProfileName)
      .doc("operations")
      .set({
        operations: DefaultInitialData.operations,
      })

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(newProfileName)
      .doc("GeneralInfo")
      .set(DefaultInitialData.GeneralInfo)

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(newProfileName)
      .doc("billsList")
      .set(DefaultInitialData.billsList)

    dispatch(getProfilesListThunkCreator())
    await AsyncStorage.setItem("selectedProfile", newProfileName)
    await dispatch(RestoreDataFromCloudThunkCreator())
  }
}

// Delete profile
export const deleteProfileThunkCreator = (
  oldProfileName: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()

    dispatch(createReserveCopyThunkCreator())

    await firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .update({
        ProfilesList: firestore.FieldValue.arrayRemove(oldProfileName),
      })

    await dispatch(getProfilesListThunkCreator())

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(oldProfileName)
      .doc("operations")
      .delete()

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(oldProfileName)
      .doc("GeneralInfo")
      .delete()

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(oldProfileName)
      .doc("billsList")
      .delete()

    await firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(oldProfileName)
      .doc("templates")
      .delete()

    await dispatch(RestoreDataFromCloudThunkCreator())
  }
}

// Restore data from cloud
export const RestoreDataFromCloudThunkCreator = (
  email?: string | null
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    const userEmail = email ? email : firebase.auth().currentUser.email
    const setData = () => {
      dispatch(getCategoriesListsThunkCreator())
      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getInitialGeneralDataThunkCreator())
      dispatch(getOperationsListThunkCreator([]))
      dispatch(getImporantBillsThunkCreator())
    }

    const selectedProfile = await AsyncStorage.getItem("selectedProfile")
    await firestore
      .collection(userEmail)
      .doc("Profiles")
      .collection(selectedProfile)
      .doc("GeneralInfo")
      .get()
      .then(async (doc: any) => {
        const data = await doc.data()
        if (data) {
          const selectedCurrency = [
            "selectedCurrency",
            JSON.stringify(
              data.selectedCurrency.replace(/[^a-zA-Z ]/g, "") || "RusRuble"
            ),
          ]

          const importantBills = [
            "importantBills",
            JSON.stringify(data.importantBills || []),
          ]

          await AsyncStorage.multiSet([selectedCurrency, importantBills])

          setData()
        }
      })

    await firestore
      .collection(userEmail)
      .doc("Profiles")
      .collection(selectedProfile)
      .doc("operations")
      .get()
      .then(async (doc: any) => {
        const data = await doc.data()
        if (data) {
          const operationsList = [
            "operations",
            JSON.stringify(data.operations || []),
          ]
          await AsyncStorage.multiSet([operationsList])

          setData()
        }
      })

    await firestore
      .collection(userEmail)
      .doc("Profiles")
      .collection(selectedProfile)
      .doc("billsList")
      .get()
      .then(async (doc: any) => {
        const data = await doc.data()
        if (data) {
          const normalBillsList = [
            "normalBillsList",
            JSON.stringify(data.normalBillsList || []),
          ]

          const debtsBillsList = [
            "debtsBillsList",
            JSON.stringify(data.debtsBillsList || []),
          ]

          const savingsBillsList = [
            "savingsBillsList",
            JSON.stringify(data.savingsBillsList || []),
          ]

          await AsyncStorage.multiSet([
            normalBillsList,
            debtsBillsList,
            savingsBillsList,
          ])

          setData()
        }
      })

    await firestore
      .collection(userEmail)
      .doc("Profiles")
      .collection(selectedProfile)
      .doc("templates")
      .get()
      .then(async (doc: any) => {
        const data = await doc.data()

        if (data) {
          const templates = ["templates", JSON.stringify(data.templates || [])]
          await AsyncStorage.multiSet([templates])
        }

        setData()
      })

    // await firestore
    //   .collection(userEmail)
    //   .doc("Profiles")
    //   .collection(selectedProfile)
    //   .doc("BankSMSsList")
    //   .onSnapshot(async (doc: any) => {
    //     if (doc.data()) {
    //       await AsyncStorage.setItem(
    //         "BankSMSsList",
    //         JSON.stringify(doc.data().BankSMSsList)
    //       )

    //       await AsyncStorage.setItem(
    //         "bankSmsIncomeKeyWords",
    //         JSON.stringify(doc.data().incomeBankSMSKeywords)
    //       )

    //       await AsyncStorage.setItem(
    //         "bankSmsExpensesKeyWords",
    //         JSON.stringify(doc.data().expensesBankSMSKeywords)
    //       )
    //     }

    //     setData()
    //   })

    setData()
  }
}

// Restore data from device
export const RestoreDataFromDeviceThunkCreator = (
  email?: string | null
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firestore = getFirestore()
    const isOnline = getOnlineStatus(state)

    const userEmail = email ? email : state.firebase.auth.email
    if (userEmail && isOnline) {
      const selectedProfile = await AsyncStorage.getItem("selectedProfile")

      const operationsList = await AsyncStorage.getItem("operations")
        .then((req: any) => JSON.parse(req))
        .then((json) => json)

      const selectedCurrency = await AsyncStorage.getItem("selectedCurrency")
      const importantBills = await AsyncStorage.getItem("importantBills")
        .then((req: any) => JSON.parse(req))
        .then((json) => json && json)

      const normalBillsList = await AsyncStorage.getItem("normalBillsList")
        .then((req: any) => JSON.parse(req))
        .then((json) => json && json)

      const savingsBillsList = await AsyncStorage.getItem("savingsBillsList")
        .then((req: any) => JSON.parse(req))
        .then((json) => json && json)

      const debtsBillsList = await AsyncStorage.getItem("debtsBillsList")
        .then((req: any) => JSON.parse(req))
        .then((json) => json && json)

      const templates = await AsyncStorage.getItem("templates")
        .then((req: any) => JSON.parse(req))
        .then((json) => json && json)

      // const BankSMSsList = await AsyncStorage.getItem("BankSMSsList")
      //   .then((req: any) => JSON.parse(req))
      //   .then((json) => json && json)

      // const incomeBankSMSKeywords = await AsyncStorage.getItem(
      //   "bankSmsIncomeKeyWords"
      // )
      //   .then((req: any) => JSON.parse(req))
      //   .then((json) => json && json)

      // const expensesBankSMSKeywords = await AsyncStorage.getItem(
      //   "bankSmsExpensesKeyWords"
      // )
      //   .then((req: any) => JSON.parse(req))
      //   .then(async (json) => json && json)

      await firestore
        .collection(userEmail)
        .doc("Profiles")
        .collection(selectedProfile)
        .doc("operations")
        .set({
          operations: operationsList || [],
        })

      await firestore
        .collection(userEmail)
        .doc("Profiles")
        .collection(selectedProfile)
        .doc("billsList")
        .set({
          normalBillsList: normalBillsList || [],
          savingsBillsList: savingsBillsList || [],
          debtsBillsList: debtsBillsList || [],
        })

      await firestore
        .collection(userEmail)
        .doc("Profiles")
        .collection(selectedProfile)
        .doc("GeneralInfo")
        .update({
          selectedCurrency: selectedCurrency
            ? selectedCurrency.replace(/[^a-zA-Z ]/g, "")
            : "RusRuble",
          importantBills: importantBills || [],
        })

      await firestore
        .collection(userEmail)
        .doc("Profiles")
        .collection(selectedProfile)
        .doc("templates")
        .set({
          templates: templates || [],
        })
    }
  }
}

// Set default info
export const SetDefaultInfoThunkCreatior = (i18n: any): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await setLocaleLanguage(i18n)

    await AsyncStorage.setItem(
      "normalBillsList",
      JSON.stringify([
        {
          name: "Cash",
          accountBalance: 0,
          type: "NormalBill",
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
      ])
    )

    await AsyncStorage.setItem(
      "operations",
      JSON.stringify(DefaultInitialData.operations)
    )
    await AsyncStorage.setItem("selectedInitialScreen", "Category")
    await AsyncStorage.setItem("selectedCurrency", "RusRuble")
    await AsyncStorage.setItem(
      "importantBills",
      JSON.stringify(DefaultInitialData.GeneralInfo.importantBills)
    )
    await AsyncStorage.setItem(
      "normalBillsList",
      JSON.stringify(DefaultInitialData.billsList.normalBillsList)
    )

    await AsyncStorage.setItem("selectedProfile", "General")
    await AsyncStorage.setItem("ratePopupShownDate", new Date() as any)
  }
}

// Verify subscription
export const subscriptionVerifierThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firestore = getFirestore()

    await firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .get()
      .then((doc: any) => {
        if (doc.data()) {
          if (dayjs(doc.data().PremiumFinishDate).isSame(dayjs())) {
            dispatch(deleteUserThunkCreator())
          } else if (dayjs(doc.data().PremiumFinishDate).isBefore(dayjs())) {
            dispatch(deleteUserThunkCreator())
          }
        }
      })

    const productId = await AsyncStorage.getItem("PremiumProductId")
    try {
      const availablePurchases = await RNIap.getAvailablePurchases()
      if (availablePurchases !== null && availablePurchases.length > 0) {
        const subscription = availablePurchases.find((element) => {
          return productId === element.productId
        })
        if (subscription) {
          dispatch(ActionCreatorsList.setSubscriptionStatusActionCreator(true))
        } else {
          dispatch(ActionCreatorsList.setSubscriptionStatusActionCreator(false))
          // dispatch(deleteUserThunkCreator())
        }
      }
    } catch (err) {
      console.warn(err)
    }
  }
}
