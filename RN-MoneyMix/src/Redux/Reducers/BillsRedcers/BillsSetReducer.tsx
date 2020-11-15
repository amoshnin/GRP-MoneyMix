//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"

import {
  mergeArrays,
  concat,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
  getDefaultBillThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { getBudgetsThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetGetReducer"
import { ChangeImportantBillThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesSetReducer"
import { getCategoriesListsThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"
import { MoneyBillsRefillBalanceThunkCreator } from "~/Redux/Reducers/MoneyTransferReducers/MoneyTransferSetReducer"
import { getTemplatesArrayThunkCreator } from "~/Redux/Reducers/TemplatesReducers/TemplatesGetReducer"
import { TemplateItemType } from "~/Redux/Types/TemplatesTypes"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const BillsReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default BillsReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const SubmitNewBillThunkCreator = (
  billEditData: any,
  billType: string,

  billData: {
    name: string
    description: string
    accountBalance: string
    creditLimit: string
    takeIntoTotalBalance: boolean
    iOwe: string
    goal: string
    totalDebtSum: string
    icon: string
  },

  BillsArraysData: {
    normalBillsList: Array<any>
    savingsBillsList: Array<any>
    debtsBillsList: Array<any>
  }
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => (await json) || [])
    if (billEditData && billEditData.name) {
      if (billType === "NormalBill") {
        await AsyncStorage.getItem("normalBillsList")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const objIndex = json.findIndex(
              (obj: any) => obj.name === billEditData.name
            )

            const NewObject = (json[objIndex] = {
              name: billData.name,
              description: billData.description || null,
              accountBalance: billData.accountBalance,
              creditLimit: billData.creditLimit,
              takeIntoTotalBalance: billData.takeIntoTotalBalance || null,
              type: "NormalBill",
              icon: billData.icon || null,
            })

            const NewTrash = mergeArrays(json, [NewObject])

            await AsyncStorage.setItem(
              "normalBillsList",
              JSON.stringify(json ? NewTrash : NewObject)
            )
          })
      } else if (billType === "SavingsBill") {
        await AsyncStorage.getItem("savingsBillsList")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const objIndex = json.findIndex(
              (obj: any) => obj.name === billEditData.name
            )

            const NewObject = (json[objIndex] = {
              name: billData.name,
              description: billData.description || null,
              accountBalance: billData.accountBalance,
              goal: billData.goal,
              takeIntoTotalBalance: billData.takeIntoTotalBalance || null,
              type: "SavingsBill",
              budget: 0,
              icon: billData.icon || null,
            })

            const NewTrash = mergeArrays(json, [NewObject])

            await AsyncStorage.setItem(
              "savingsBillsList",
              JSON.stringify(json ? NewTrash : NewObject)
            )
          })
      } else if (billType === "DebtBill") {
        await AsyncStorage.getItem("debtsBillsList")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const objIndex = json.findIndex(
              (obj: any) => obj.name === billEditData.name
            )

            const NewObject = (json[objIndex] = {
              name: billData.name,
              description: billData.description || null,
              iOwe: billData.iOwe,
              totalDebtSum: billData.totalDebtSum,
              takeIntoTotalBalance: billData.takeIntoTotalBalance || null,
              type: "DebtBill",
              icon: billData.icon || null,
            })

            const NewTrash = mergeArrays(json, [NewObject])

            await AsyncStorage.setItem(
              "debtsBillsList",
              JSON.stringify(json ? NewTrash : NewObject)
            )
          })
      }

      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getBudgetsThunkCreator())

      const filteredOperations = await operations
        .filter((operation: any) => {
          if (operation.bill && Object.values(operation.bill).length > 0) {
            return operation.bill.name !== billEditData.name
          } else {
            return operation
          }
        })
        .filter((operation: any) => {
          if (operation.operation === "Transaction") {
            return operation.category.title !== billEditData.name
          } else {
            return operation
          }
        })

      const renewedOperations = await operations
        .filter((operation: any) => {
          if (operation.bill) {
            return operation.bill.name === billEditData.name
          }
        })
        .map((operation: any) => {
          return {
            ...operation,
            bill: {
              ...operation.bill,
              name: billData.name,
              icon: billData.icon,
            },
          }
        })

      const renewdTransactionOperations = await operations
        .filter((operation: any) => {
          if (operation.operation === "Transaction") {
            return operation.category.title === billEditData.name
          }
        })
        .map((operation: any) => {
          return {
            ...operation,
            category: {
              ...operation.category,
              icon: billData.icon,
              title: billData.name,
            },
          }
        })

      Promise.all([
        filteredOperations,
        renewedOperations,
        renewdTransactionOperations,
      ]).then(async () => {
        const newOperations = concat(
          filteredOperations,
          renewedOperations,
          renewdTransactionOperations
        )
        await AsyncStorage.setItem("operations", JSON.stringify(newOperations))
      })

      const importantBillArr = state.CategoriesGetState.ImportantBills.filter(
        (obj: any) => obj.name === billEditData.name
      )

      if (importantBillArr[0]) {
        dispatch(
          ChangeImportantBillThunkCreator(importantBillArr[0], {
            ...importantBillArr[0],
            name: billData.name,
          })
        )
      }

      if (
        Number(billData.accountBalance || billData.iOwe) !==
        Number(billEditData.accountBalance || billEditData.iOwe)
      ) {
        dispatch(
          MoneyBillsRefillBalanceThunkCreator(
            billEditData,
            billData.accountBalance || billData.iOwe,
            true
          )
        )
      }

      dispatch(getOperationsListThunkCreator([]))
      dispatch(getCategoriesListsThunkCreator())

      const templates = await AsyncStorage.getItem("templates")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => json && json)

      const renewdTemplates = templates
        .filter((template: TemplateItemType) => {
          return template.bill.name === billEditData.name
        })
        .map((template: TemplateItemType) => {
          return {
            ...template,
            bill: {
              ...template.bill,
              name: billData.name,
              icon: billData.icon,
            },
          }
        })

      const filteredTemplates = templates.filter(
        (template: TemplateItemType) => template.bill.name !== billEditData.name
      )

      await AsyncStorage.setItem(
        "templates",
        JSON.stringify([...renewdTemplates, ...filteredTemplates])
      )

      dispatch(getTemplatesArrayThunkCreator())
      dispatch(RestoreDataFromDeviceThunkCreator())
    } else {
      if (billType === "NormalBill") {
        const NewObject = {
          ...billData,
          name: billData.name || null,
          description: billData.description || null,
          icon: billData.icon || null,
          type: "NormalBill",
        }

        await AsyncStorage.setItem(
          "normalBillsList",
          JSON.stringify(
            BillsArraysData.normalBillsList
              ? [...BillsArraysData.normalBillsList, NewObject]
              : [NewObject]
          )
        )

        const billsMoneyValue = (await AsyncStorage.getItem(
          "billsMoneyAmount"
        )) as string
        const newValue =
          Number(billsMoneyValue) + Number(billData.accountBalance)

        await AsyncStorage.setItem("billsMoneyAmount", newValue.toString())

        if (Number(billData.accountBalance || billData.iOwe) > 0) {
          dispatch(
            MoneyBillsRefillBalanceThunkCreator(
              {
                ...NewObject,
                accountBalance: 0,
              },
              billData.accountBalance || billData.iOwe,
              true
            )
          )
        }
      } else if (billType === "SavingsBill") {
        const NewObject = {
          name: billData.name,
          description: billData.description || null,
          accountBalance: billData.accountBalance,
          goal: billData.goal,
          takeIntoTotalBalance: billData.takeIntoTotalBalance || null,
          type: "SavingsBill",
          budget: 0,
          icon: billData.icon || null,
        }

        await AsyncStorage.setItem(
          "savingsBillsList",
          JSON.stringify(
            BillsArraysData.savingsBillsList
              ? [...BillsArraysData.savingsBillsList, NewObject]
              : [NewObject]
          )
        )

        const savingsMoneyAmount = (await AsyncStorage.getItem(
          "savingsMoneyAmount"
        )) as string
        const newValue =
          Number(billData.accountBalance) + Number(savingsMoneyAmount)

        await AsyncStorage.setItem("savingsMoneyAmount", newValue.toString())

        if (Number(billData.accountBalance || billData.iOwe) > 0) {
          dispatch(
            MoneyBillsRefillBalanceThunkCreator(
              {
                ...NewObject,
                accountBalance: 0,
              },
              billData.accountBalance || billData.iOwe,
              true
            )
          )
        }
      } else if (billType === "DebtBill") {
        const NewObject = {
          name: billData.name,
          description: billData.description || null,
          iOwe: billData.iOwe,
          totalDebtSum: billData.totalDebtSum,
          takeIntoTotalBalance: billData.takeIntoTotalBalance || null,
          type: "DebtBill",
          icon: billData.icon || null,
        }

        await AsyncStorage.setItem(
          "debtsBillsList",
          JSON.stringify(
            BillsArraysData.debtsBillsList
              ? [...BillsArraysData.debtsBillsList, NewObject]
              : [NewObject]
          )
        )

        const debtsMoneyAmount = (await AsyncStorage.getItem(
          "debtsMoneyAmount"
        )) as string
        const newValue =
          Number(billData.totalDebtSum) -
          Number(billData.iOwe) +
          Number(debtsMoneyAmount)

        await AsyncStorage.setItem("debtsMoneyAmount", newValue.toString())

        if (Number(billData.accountBalance || billData.iOwe) > 0) {
          dispatch(
            MoneyBillsRefillBalanceThunkCreator(
              {
                ...NewObject,
                iOwe: 0,
              },
              billData.accountBalance || billData.iOwe,
              true
            )
          )
        }
      }

      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getBudgetsThunkCreator())

      dispatch(getOperationsListThunkCreator([]))
      dispatch(getCategoriesListsThunkCreator())

      dispatch(RestoreDataFromDeviceThunkCreator())
    }
  }
}

export const DeleteBillThunkCreator = (
  billType: string,
  billEditData: any,
  accountBalance: string,
  totalDebtSum: string,
  iOwe: string,
  normalBillsList: Array<any>,
  debtsBillsList: Array<any>,
  savingsBillsList: Array<any>
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    if (billType === "NormalBill") {
      const CleanedArray = normalBillsList.filter((bill: any) => {
        return bill.name !== billEditData.name
      })

      await AsyncStorage.setItem(
        "normalBillsList",
        JSON.stringify(CleanedArray)
      )

      const billsMoneyAmount = (await AsyncStorage.getItem(
        "billsMoneyAmount"
      )) as string
      const newValue = Number(billsMoneyAmount) - Number(accountBalance)

      await AsyncStorage.setItem("billsMoneyAmount", newValue.toString())

      dispatch(ChangeImportantBillThunkCreator(billEditData))
    } else if (billType === "SavingsBill") {
      const CleanedArray = savingsBillsList.filter((bill: any) => {
        return bill.name !== billEditData.name
      })

      await AsyncStorage.setItem(
        "savingsBillsList",
        JSON.stringify(CleanedArray)
      )

      const savingsMoneyAmount = (await AsyncStorage.getItem(
        "savingsMoneyAmount"
      )) as string
      const newValue = Number(savingsMoneyAmount) - Number(accountBalance)

      await AsyncStorage.setItem("savingsMoneyAmount", newValue.toString())
    } else if (billType === "DebtBill") {
      const CleanedArray = debtsBillsList.filter((bill: any) => {
        return bill.name !== billEditData.name
      })

      await AsyncStorage.setItem("debtsBillsList", JSON.stringify(CleanedArray))

      const debtsMoneyAmount = (await AsyncStorage.getItem(
        "debtsMoneyAmount"
      )) as string
      const newValue =
        Number(debtsMoneyAmount) - (Number(totalDebtSum) - Number(iOwe))

      await AsyncStorage.setItem("debtsMoneyAmount", newValue.toString())
    }

    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const filteredOperations = await operations
      .filter((operation: any) => {
        if (operation.bill) {
          return operation.bill.name !== billEditData.name
        } else {
          return operation
        }
      })
      .filter((operation: any) => {
        if (operation.operation === "Transaction") {
          return operation.category.title !== billEditData.name
        } else {
          return operation
        }
      })

    await AsyncStorage.setItem("operations", JSON.stringify(filteredOperations))

    dispatch(getBillsListsThunkCreator())
    dispatch(getBillsMoneyAmountThunkCreator())

    dispatch(getOperationsListThunkCreator([]))
    dispatch(getCategoriesListsThunkCreator())

    const templates = await AsyncStorage.getItem("templates")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const filteredTemplates = templates.filter((template: any) => {
      return template.bill.name !== billEditData.name
    })

    await AsyncStorage.setItem("templates", JSON.stringify(filteredTemplates))
    dispatch(getTemplatesArrayThunkCreator())

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const setDefaultBillThunkCreator = (defaultBill: any): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.setItem("defaultBill", JSON.stringify(defaultBill))
    dispatch(getDefaultBillThunkCreator())

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}
