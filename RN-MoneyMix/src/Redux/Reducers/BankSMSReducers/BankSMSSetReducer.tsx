//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"

import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"
import {
  getTemplatesListThunkCreator,
  getBankSMSKeywordsThunkCreator,
} from "~/Redux/Reducers/BankSMSReducers/BankSMSGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const BankSMSSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default BankSMSSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const createNewBankSMSThunkCreator = (
  bill: any,
  originatingAddress: string,
  templateMessage: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const BankSMSsList = await AsyncStorage.getItem("BankSMSsList")
      .then((req: any) => JSON.parse(req))
      .then((json) => json)

    const newObject = {
      bill: bill,
      ID: generateRandomID(),
      originatingAddress: originatingAddress,
      templateMessage: templateMessage,
    }

    await AsyncStorage.setItem(
      "BankSMSsList",
      JSON.stringify(BankSMSsList ? [...BankSMSsList, newObject] : [newObject])
    )

    dispatch(getTemplatesListThunkCreator())
    if (state.firebase.auth.email) {
      dispatch(RestoreDataFromDeviceThunkCreator())
    }
  }
}

export const deleteBankSMSThunkCreator = (templateID: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const BankSMSsList = await AsyncStorage.getItem("BankSMSsList")
      .then((req: any) => JSON.parse(req))
      .then((json) => json)

    const cleanedBankSMSsList = BankSMSsList.filter(
      (obj: any) => obj.ID !== templateID
    )

    await AsyncStorage.setItem(
      "BankSMSsList",
      JSON.stringify(cleanedBankSMSsList)
    )

    dispatch(getTemplatesListThunkCreator())
    if (state.firebase.auth.email) {
      dispatch(RestoreDataFromDeviceThunkCreator())
    }
  }
}

export const addBankSmsKeywordThunkCreator = (
  keywordText: string,
  isIncome: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    if (keywordText) {
      const newObject = {
        text: keywordText,
        ID: generateRandomID(),
      }

      if (isIncome) {
        await AsyncStorage.getItem("bankSmsIncomeKeyWords")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            if (json) {
              await AsyncStorage.setItem(
                "bankSmsIncomeKeyWords",
                JSON.stringify([...json, newObject])
              )
            } else {
              await AsyncStorage.setItem(
                "bankSmsIncomeKeyWords",
                JSON.stringify([newObject])
              )
            }
          })
      } else {
        await AsyncStorage.getItem("bankSmsExpensesKeyWords")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            if (json) {
              await AsyncStorage.setItem(
                "bankSmsExpensesKeyWords",
                JSON.stringify([...json, newObject])
              )
            } else {
              await AsyncStorage.setItem(
                "bankSmsExpensesKeyWords",
                JSON.stringify([newObject])
              )
            }
          })
      }

      dispatch(getBankSMSKeywordsThunkCreator())
      if (state.firebase.auth.email) {
        dispatch(RestoreDataFromDeviceThunkCreator())
      }
    }
  }
}

export const editBankSmsKeywordThunkCreator = (
  oldKeywordObj: any,
  editedKeywordText: string,
  isIncome: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const newObject = {
      ...oldKeywordObj,
      text: editedKeywordText,
    }

    if (isIncome) {
      await AsyncStorage.getItem("bankSmsIncomeKeyWords")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const filteredArray =
            json && json.filter((obj: any) => obj.ID !== oldKeywordObj.ID)

          await AsyncStorage.setItem(
            "bankSmsIncomeKeyWords",
            JSON.stringify([...filteredArray, newObject])
          )
        })
    } else {
      await AsyncStorage.getItem("bankSmsExpensesKeyWords")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const filteredArray =
            json && json.filter((obj: any) => obj.ID !== oldKeywordObj.ID)

          await AsyncStorage.setItem(
            "bankSmsExpensesKeyWords",
            JSON.stringify([...filteredArray, newObject])
          )
        })
    }

    dispatch(getBankSMSKeywordsThunkCreator())
    if (state.firebase.auth.email) {
      dispatch(RestoreDataFromDeviceThunkCreator())
    }
  }
}

export const deleteBankSmsKeywordThunkCreator = (
  oldKeywordObj: any,
  isIncome: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    if (isIncome) {
      await AsyncStorage.getItem("bankSmsIncomeKeyWords")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const filteredArray =
            json && json.filter((obj: any) => obj.ID !== oldKeywordObj.ID)

          await AsyncStorage.setItem(
            "bankSmsIncomeKeyWords",
            JSON.stringify(filteredArray)
          )
        })
    } else {
      await AsyncStorage.getItem("bankSmsExpensesKeyWords")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const filteredArray =
            json && json.filter((obj: any) => obj.ID !== oldKeywordObj.ID)

          await AsyncStorage.setItem(
            "bankSmsExpensesKeyWords",
            JSON.stringify(filteredArray)
          )
        })
    }

    dispatch(getBankSMSKeywordsThunkCreator())
    if (state.firebase.auth.email) {
      dispatch(RestoreDataFromDeviceThunkCreator())
    }
  }
}
