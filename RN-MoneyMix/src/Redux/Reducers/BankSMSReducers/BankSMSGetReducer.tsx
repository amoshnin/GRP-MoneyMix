//    *GENERAL IMPORTS*   //
import { PermissionsAndroid } from "react-native"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import dayjs from "dayjs"
// @ts-ignore
// import SmsAndroid from "react-native-get-sms-android"

import { MoneyBillsRefillBalanceThunkCreator } from "~/Redux/Reducers/MoneyTransferReducers/MoneyTransferSetReducer"

////////////////////////////////////////////////////////////////////////

const initialState = {
  TemplatesList: [] as Array<{
    bill: any
    originatingAddress: string
    templateMessage: string
  }>,

  incomeKeywords: [] as Array<{
    ID: string
    text: string
  }>,
  expensesKeywords: [] as Array<{
    ID: string
    text: string
  }>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const BankSMSGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_TEMPLATES_LIST") {
    return {
      ...state,
      TemplatesList: action.templatesLsit,
    }
  }

  if (action.type === "SET_BANK_SMS_KEYWORDS") {
    return {
      ...state,
      incomeKeywords: action.incomeKeywords,
      expensesKeywords: action.expensesKeywords,
    }
  }

  return state
}

export default BankSMSGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setTemplatesListActionCreator: (
    templatesLsit: Array<{
      bill: any
      originatingAddress: string
      templateMessage: string
    }>
  ) =>
    ({
      type: "SET_TEMPLATES_LIST",
      templatesLsit,
    } as const),

  setBankSMSKeywordsActionCreator: (
    incomeKeywords: Array<{
      ID: string
      text: string
    }>,
    expensesKeywords: Array<{
      ID: string
      text: string
    }>
  ) =>
    ({
      type: "SET_BANK_SMS_KEYWORDS",
      incomeKeywords,
      expensesKeywords,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getTemplatesListThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const BankSMSsList = await AsyncStorage.getItem("BankSMSsList")
      .then((req: any) => JSON.parse(req))
      .then((json) => json)

    dispatch(ActionCreatorsList.setTemplatesListActionCreator(BankSMSsList))
  }
}

export const getBankSMSKeywordsThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const incomeKeywords = await AsyncStorage.getItem("bankSmsIncomeKeyWords")
      .then((req: any) => JSON.parse(req))
      .then((json) => json)

    const expensesKeywords = await AsyncStorage.getItem(
      "bankSmsExpensesKeyWords"
    )
      .then((req: any) => JSON.parse(req))
      .then((json) => json)

    dispatch(
      ActionCreatorsList.setBankSMSKeywordsActionCreator(
        incomeKeywords,
        expensesKeywords
      )
    )
  }
}

export const reviewIncomeSMSThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    // try {
    //   let granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_SMS
    //   )
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     const bankSMSLatestReadTimestamp = await AsyncStorage.getItem(
    //       "bankSMSLatestReadTimestamp"
    //     )
    //     await AsyncStorage.getItem("BankSMSsList")
    //       .then((req: any) => JSON.parse(req))
    //       .then(async (json) => {
    //         const incomeBankSMSKeywords = await AsyncStorage.getItem(
    //           "bankSmsIncomeKeyWords"
    //         )
    //           .then((req: any) => JSON.parse(req))
    //           .then((keywordsJson) => keywordsJson)
    //         const expensesBankSMSKeywords = await AsyncStorage.getItem(
    //           "bankSmsExpensesKeyWords"
    //         )
    //           .then((req: any) => JSON.parse(req))
    //           .then((keywordsJson) => keywordsJson)
    //         json.forEach((bankSMS: any) => {
    //           incomeBankSMSKeywords &&
    //             incomeBankSMSKeywords.forEach((incomeKeyword: any) => {
    //               var filter = {
    //                 box: "inbox",
    //                 address: bankSMS.originatingAddress.replace(/\s/g, ""),
    //                 minDate: bankSMSLatestReadTimestamp,
    //                 bodyRegex: `(.*)${incomeKeyword.text}(.*)`,
    //               }
    //               // SmsAndroid.list(
    //               //   JSON.stringify(filter),
    //               //   (fail: any) => {},
    //               //   (count: any, smsList: any) => {
    //               //     var arr = JSON.parse(smsList)
    //               //     let moneyAmount = null
    //               //     arr.forEach((object: any) => {
    //               //       moneyAmount = object.body.match(/\d/g)
    //               //         ? object.body.match(/\d/g).join("")
    //               //         : null
    //               //       if (moneyAmount) {
    //               //         dispatch(
    //               //           refillBillFromSMSThunkCreator(
    //               //             bankSMS.bill,
    //               //             moneyAmount,
    //               //             true
    //               //           )
    //               //         )
    //               //       }
    //               //     })
    //               //   }
    //               // )
    //             })
    //           expensesBankSMSKeywords &&
    //             expensesBankSMSKeywords.forEach((expenseKeyword: any) => {
    //               var filter = {
    //                 box: "inbox",
    //                 address: bankSMS.originatingAddress.replace(/\s/g, ""),
    //                 minDate: bankSMSLatestReadTimestamp,
    //                 bodyRegex: `(.*)${expenseKeyword.text}(.*)`,
    //               }
    //               let moneyAmount = null
    //               // SmsAndroid.list(
    //               //   JSON.stringify(filter),
    //               //   (fail: any) => {},
    //               //   (count: any, smsList: any) => {
    //               //     var arr = JSON.parse(smsList)
    //               //     arr.forEach((object: any) => {
    //               //       moneyAmount = object.body.match(/\d/g)
    //               //         ? object.body.match(/\d/g).join("")
    //               //         : null
    //               //       if (moneyAmount) {
    //               //         dispatch(
    //               //           refillBillFromSMSThunkCreator(
    //               //             bankSMS.bill,
    //               //             moneyAmount,
    //               //             false
    //               //           )
    //               //         )
    //               //       }
    //               //     })
    //               //   }
    //               // )
    //             })
    //         })
    //         const currentDate = new Date(dayjs() as any).getTime()
    //         await AsyncStorage.setItem(
    //           "bankSMSLatestReadTimestamp",
    //           JSON.stringify(currentDate)
    //         )
    //       })
    //   }
    // } catch (err) {}
  }
}

export const refillBillFromSMSThunkCreator = (
  billInfo: any,
  moneyAmount: string,
  isIncome: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const addValues = (oldBalance: string) => {
      if (isIncome) {
        return Number(oldBalance) + Number(moneyAmount)
      } else {
        return Number(oldBalance) - Number(moneyAmount)
      }
    }

    if (billInfo.type === "NormalBill") {
      await AsyncStorage.getItem("normalBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const certainBill = json.filter(
            (bill: any) => bill.name === billInfo.name
          )[0]
          const newBalance = addValues(certainBill.accountBalance)

          if (certainBill) {
            dispatch(
              MoneyBillsRefillBalanceThunkCreator(
                certainBill,
                String(newBalance)
              )
            )
          }
        })
    } else if (billInfo.type === "DebtBill") {
      await AsyncStorage.getItem("debtsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const certainBill = json.filter(
            (bill: any) => bill.name === billInfo.name
          )[0]
          const newBalance = addValues(certainBill.iOwe)

          if (certainBill) {
            dispatch(
              MoneyBillsRefillBalanceThunkCreator(
                certainBill,
                String(newBalance)
              )
            )
          }
        })
    } else if (billInfo.type === "SavingsBill") {
      await AsyncStorage.getItem("savingsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const certainBill = json.filter(
            (bill: any) => bill.name === billInfo.name
          )[0]
          const newBalance = addValues(certainBill.accountBalance)

          if (certainBill) {
            dispatch(
              MoneyBillsRefillBalanceThunkCreator(
                certainBill,
                String(newBalance)
              )
            )
          }
        })
    }
  }
}
