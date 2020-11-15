//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"

import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"
import { mergeArrays } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { deleteImagesFromStorage } from "~/Components/Shared/Helpers/Functions/ReducersFunctions"

import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
  getDefaultBillThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import {
  getImporantBillsThunkCreator,
  getCategoriesListsThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import { getBudgetsThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const OperationsSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default OperationsSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Duplicate operation
export const DuplicateOperationThunkCreator = (operation: any): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          await AsyncStorage.setItem(
            "operations",
            JSON.stringify([
              ...json,
              {
                ...operation,
                id: generateRandomID(),
              },
            ])
          )
        }
      })

    if (operation.bill.type === "NormalBill") {
      await AsyncStorage.getItem("normalBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const certainBill = json.filter(
            (obj: any) => obj.name === operation.bill.name
          )[0]

          const NewObject = {
            ...certainBill,
            accountBalance: operation.isIncome
              ? Number(certainBill.accountBalance) +
                Number(operation.moneyAmount)
              : Number(certainBill.accountBalance) -
                Number(operation.moneyAmount),
          }

          const NewTrash = mergeArrays(json, [NewObject])

          await AsyncStorage.setItem(
            "normalBillsList",
            JSON.stringify(NewTrash)
          )
        })
    } else if (operation.bill.type === "DebtBill") {
      await AsyncStorage.getItem("debtsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const certainBill = json.filter(
            (obj: any) => obj.name === operation.bill.name
          )[0]

          const NewObject = {
            ...certainBill,
            iOwe: operation.isIncome
              ? Number(certainBill.iOwe) + Number(operation.moneyAmount)
              : Number(certainBill.iOwe) - Number(operation.moneyAmount),
          }

          const NewTrash = mergeArrays(json, [NewObject])

          await AsyncStorage.setItem("debtsBillsList", JSON.stringify(NewTrash))
        })
    } else if (operation.bill.type === "SavingsBill") {
      await AsyncStorage.getItem("savingsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const certainBill = json.filter(
            (obj: any) => obj.name === operation.bill.name
          )[0]

          const NewObject = {
            ...certainBill,
            accountBalance: operation.isIncome
              ? Number(certainBill.accountBalance) +
                Number(operation.moneyAmount)
              : Number(certainBill.accountBalance) -
                Number(operation.moneyAmount),
          }

          const NewTrash = mergeArrays(json, [NewObject])

          await AsyncStorage.setItem(
            "savingsBillsList",
            JSON.stringify(NewTrash)
          )
        })
    }
    dispatch(getOperationsListThunkCreator([]))
    dispatch(getCategoriesListsThunkCreator())
    dispatch(getBillsListsThunkCreator())
    dispatch(getBillsMoneyAmountThunkCreator())
    dispatch(getImporantBillsThunkCreator())
    dispatch(getDefaultBillThunkCreator())

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

// Delete operation
export const DeleteOperationsThunkCreator = (
  operations: Array<any>
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firebase = getFirebase()
    const storage = firebase.storage()

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const CleanedOperations = json.filter(
            (el: any) => !operations.find((operation) => el.id === operation.id)
          )
          await AsyncStorage.setItem(
            "operations",
            JSON.stringify(CleanedOperations)
          )
        }
      })

    dispatch(getOperationsListThunkCreator([]))
    dispatch(getCategoriesListsThunkCreator())
    dispatch(getBudgetsThunkCreator())

    const callBack = async () => {
      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getDefaultBillThunkCreator())
      dispatch(getImporantBillsThunkCreator())

      dispatch(RestoreDataFromDeviceThunkCreator())
    }

    let normalBillsList = await AsyncStorage.getItem("normalBillsList")
      .then((req: any) => JSON.parse(req))
      .then((json) => (json ? json : []))

    let debtsBillsList = await AsyncStorage.getItem("debtsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => (json ? json : []))

    let savingsBillsList = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => (json ? json : []))

    let arr = [] as Array<any>

    operations.map(async (operation: any) => {
      const isTransaction = operation.operation === "Transaction"
      if (operation.bill.type === "NormalBill") {
        const certainBill = normalBillsList.filter(
          (obj: any) => obj.name === operation.bill.name
        )[0]

        const NewObject = {
          ...certainBill,
          accountBalance:
            !operation.isIncome || isTransaction
              ? Number(certainBill.accountBalance) +
                Math.abs(Number(operation.moneyAmount))
              : Number(certainBill.accountBalance) -
                Number(operation.moneyAmount),
        }

        const NewTrash = mergeArrays(normalBillsList, [NewObject])
        normalBillsList = NewTrash
        await AsyncStorage.setItem("normalBillsList", JSON.stringify(NewTrash))
      } else if (operation.bill.type === "DebtBill") {
        const certainBill = debtsBillsList.filter(
          (obj: any) => obj.name === operation.bill.name
        )[0]

        const NewObject = {
          ...certainBill,
          iOwe:
            !operation.isIncome || isTransaction
              ? Number(certainBill.iOwe) +
                Math.abs(Number(operation.moneyAmount))
              : Number(certainBill.iOwe) - Number(operation.moneyAmount),
        }

        const NewTrash = mergeArrays(debtsBillsList, [NewObject])
        debtsBillsList = NewTrash
        await AsyncStorage.setItem("debtsBillsList", JSON.stringify(NewTrash))
      } else if (operation.bill.type === "SavingsBill") {
        const certainBill = savingsBillsList.filter(
          (obj: any) => obj.name === operation.bill.name
        )[0]

        const NewObject = {
          ...certainBill,
          accountBalance:
            !operation.isIncome || isTransaction
              ? Number(certainBill.accountBalance) +
                Math.abs(Number(operation.moneyAmount))
              : Number(certainBill.accountBalance) -
                Number(operation.moneyAmount),
        }

        const NewTrash = mergeArrays(savingsBillsList, [NewObject])
        savingsBillsList = NewTrash
        await AsyncStorage.setItem("savingsBillsList", JSON.stringify(NewTrash))
      }

      if (isTransaction) {
        if (operation.category.type === "NormalBill") {
          const certainBill = normalBillsList.filter(
            (obj: any) => obj.name === operation.category.title
          )[0]

          const NewObject = {
            ...certainBill,
            accountBalance: operation.isIncome
              ? Number(certainBill.accountBalance) -
                Number(operation.moneyAmount)
              : Number(certainBill.accountBalance) +
                Math.abs(Number(operation.moneyAmount)),
          }

          const NewTrash = mergeArrays(normalBillsList, [NewObject])
          normalBillsList = NewTrash
          await AsyncStorage.setItem(
            "normalBillsList",
            JSON.stringify(NewTrash)
          )
        } else if (operation.category.type === "DebtBill") {
          const certainBill = debtsBillsList.filter(
            (obj: any) => obj.name === operation.category.title
          )[0]

          const NewObject = {
            ...certainBill,
            iOwe: operation.isIncome
              ? Number(certainBill.iOwe) - Number(operation.moneyAmount)
              : Number(certainBill.iOwe) +
                Math.abs(Number(operation.moneyAmount)),
          }

          const NewTrash = mergeArrays(debtsBillsList, [NewObject])
          debtsBillsList = NewTrash
          await AsyncStorage.setItem("debtsBillsList", JSON.stringify(NewTrash))
        } else if (operation.category.type === "SavingsBill") {
          const certainBill = savingsBillsList.filter(
            (obj: any) => obj.name === operation.category.title
          )[0]

          const NewObject = {
            ...certainBill,
            accountBalance: operation.isIncome
              ? Number(certainBill.accountBalance) -
                Number(operation.moneyAmount)
              : Number(certainBill.accountBalance) +
                Math.abs(Number(operation.moneyAmount)),
          }

          const NewTrash = mergeArrays(savingsBillsList, [NewObject])
          savingsBillsList = NewTrash
          await AsyncStorage.setItem(
            "savingsBillsList",
            JSON.stringify(NewTrash)
          )
        }
      }

      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getDefaultBillThunkCreator())
      dispatch(getImporantBillsThunkCreator())

      dispatch(RestoreDataFromDeviceThunkCreator())

      arr = [...arr, operation.id]
      if (arr.length === operations.length) {
        callBack()
      }

      if (operation.PhotosURLsList && operation.PhotosURLsList.length > 0) {
        deleteImagesFromStorage(
          operation.PhotosURLsList,
          state.firebase.auth.email as string,
          storage
        )
      }
    })
  }
}

// Change operation date
export const ChangeOperationDateThunkCreator = (
  oldOperation: any,
  newDate: Date
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const NewOperation = {
      ...oldOperation,
      createdAt: new Date(newDate).getTime(),
    }

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        const CleanedOperation = json.filter(
          (operation: any) => operation.id !== oldOperation.id
        )

        await AsyncStorage.setItem(
          "operations",
          JSON.stringify([...CleanedOperation, NewOperation])
        )
      })

    dispatch(getOperationsListThunkCreator([]))

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

// Add operation comment
export const addOperationCommentThunkCreator = (
  oldOperation: any,
  newComment: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const NewOperation = {
      ...oldOperation,
      comment: newComment,
    }

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        const CleanedOperation = json.filter(
          (operation: any) => operation.id !== oldOperation.id
        )

        await AsyncStorage.setItem(
          "operations",
          JSON.stringify([...CleanedOperation, NewOperation])
        )
      })

    dispatch(getOperationsListThunkCreator([]))

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}
