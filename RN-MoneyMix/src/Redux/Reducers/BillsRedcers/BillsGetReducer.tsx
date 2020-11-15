//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import { sum } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

////////////////////////////////////////////////////////////////////////

const initialState = {
  normalBillsList: [] as Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>,

  debtsBillsList: [] as Array<{
    description: string
    iOwe: string
    name: string
    takeIntoTotalBalance: boolean
    totalDebtSum: string
    type: string
    icon: string
  }>,

  savingsBillsList: [] as Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>,

  billsMoneyAmount: 0 as number | string,
  debtsMoneyAmount: 0 as number | string,
  savingsMoneyAmount: 0 as number | string,

  defaultBill: {} as any,
}

type initialStateType = typeof initialState

// *REDUCER* //
const BillsReducer = (state = initialState, action: ActionTypes): initialStateType => {
  if (action.type === "SET_BILLS_LISTS") {
    return {
      ...state,
      normalBillsList: action.normalBillsList,
      debtsBillsList: action.debtsBillsList,
      savingsBillsList: action.savingsBillsList,
    }
  }

  if (action.type === "SET_BILLS_MONEY_AMOUNT") {
    return {
      ...state,
      billsMoneyAmount: action.billsMoneyAmount,
      debtsMoneyAmount: action.debtsMoneyAmount,
      savingsMoneyAmount: action.savingsMoneyAmount,
    }
  }

  if (action.type === "SET_DEFAULT_BILL") {
    return {
      ...state,
      defaultBill: action.defaultBill,
    }
  }

  return state
}

export default BillsReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setBillsListsActionCreator: (
    normalBillsList: Array<any>,
    debtsBillsList: Array<any>,
    savingsBillsList: Array<any>
  ) =>
    ({
      type: "SET_BILLS_LISTS",
      normalBillsList,
      debtsBillsList,
      savingsBillsList,
    } as const),

  setBillsMoneyAmountActionCreator: (
    billsMoneyAmount: number | string,
    debtsMoneyAmount: number | string,
    savingsMoneyAmount: number | string
  ) =>
    ({
      type: "SET_BILLS_MONEY_AMOUNT",
      billsMoneyAmount,
      debtsMoneyAmount,
      savingsMoneyAmount,
    } as const),

  setDefaultBillActionCreator: (defaultBill: any) =>
    ({
      type: "SET_DEFAULT_BILL",
      defaultBill,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getBillsListsThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    let normalBillsList = [] as Array<any>
    let debtsBillsList = [] as Array<any>
    let savingsBillsList = [] as Array<any>

    await AsyncStorage.getItem("normalBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        normalBillsList = json
      })

    await AsyncStorage.getItem("debtsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        debtsBillsList = json
      })

    await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        savingsBillsList = json
      })

    dispatch(
      ActionCreatorsList.setBillsListsActionCreator(
        normalBillsList,
        debtsBillsList,
        savingsBillsList
      )
    )
  }
}

export const getBillsMoneyAmountThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const normalBillsMoneyAmount = await AsyncStorage.getItem("normalBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const arr = json.filter((bill: any) => bill.takeIntoTotalBalance === true)
          return sum(arr, "accountBalance")
        }
      })

    const debtsMoneyAmount = await AsyncStorage.getItem("debtsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const arr = json.filter((bill: any) => bill.takeIntoTotalBalance === true)
          return (Number(sum(arr, "totalDebtSum")) - Number(sum(arr, "iOwe"))) as any
        }
      })

    const savingsMoneyAmount = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const arr = json.filter((bill: any) => bill.takeIntoTotalBalance === true)
          return sum(arr, "accountBalance")
        }
      })

    dispatch(
      ActionCreatorsList.setBillsMoneyAmountActionCreator(
        normalBillsMoneyAmount,
        debtsMoneyAmount,
        savingsMoneyAmount
      )
    )
  }
}

export const getDefaultBillThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("defaultBill")
      .then((req: any) => JSON.parse(req))
      .then(async (defaultBill) => {
        if (defaultBill) {
          const billsList = [] as Array<any>

          await AsyncStorage.getItem("normalBillsList")
            .then((req: any) => JSON.parse(req))
            .then(async (json) => json && billsList.push(...json))

          await AsyncStorage.getItem("debtsBillsList")
            .then((req: any) => JSON.parse(req))
            .then(async (json) => json && billsList.push(...json))

          await AsyncStorage.getItem("savingsBillsList")
            .then((req: any) => JSON.parse(req))
            .then(async (json) => json && billsList.push(...json))

          const billItem = billsList.filter((bill: any) => bill.name === defaultBill.name)

          dispatch(ActionCreatorsList.setDefaultBillActionCreator(billItem[0]))
        }
      })
  }
}
