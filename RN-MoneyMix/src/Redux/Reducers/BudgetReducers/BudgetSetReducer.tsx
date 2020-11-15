//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import dayjs from "dayjs"

import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"

import { getBudgetsThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetGetReducer"
import { getCategoriesListsThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"
import { initialCategoriesFilter } from "~/Components/Shared/Helpers/Functions/CategoriesFunctions"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const BudgetSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default BudgetSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

//
export const addCertainCategoryBudgetThunkCreator = (
  category: any,
  isIncome: boolean,
  budget: string | number
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const localUserName = await AsyncStorage.getItem("localUserName")
    category = {
      ...category,
      budget: Number(budget),
      price: 0,
    }

    let OperationObject = {
      isIncome: isIncome,
      bill: null,
      moneyAmount: null,
      comment: null,
      category: category,
      createdAt: new Date(dayjs() as any).getTime(),
      image: null,
      imageStorageID: null,
      user: localUserName,
      id: generateRandomID(),
    }

    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const cleanedOperations = operations.filter((operation: any) => {
      if (operation.category.title === category.title) {
        const budget = operation.category.budget
        if (
          budget == 0 ||
          budget == null ||
          budget == undefined ||
          budget == "0"
        ) {
          return operation
        }
      } else {
        return operation
      }
    })

    await AsyncStorage.setItem(
      "operations",
      JSON.stringify([...cleanedOperations, OperationObject])
    )

    await dispatch(getCategoriesListsThunkCreator())
    await dispatch(getBudgetsThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const addCertainSavingBillBudgetThunkCreator = (
  savingBill: any,
  budget: number
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const NewSavingBill = {
      ...savingBill,
      budget: Number(budget),
    }

    const savingsBillsList = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const cleanedSavingsBillsList = savingsBillsList.filter(
      (obj: any) => obj.name !== savingBill.name
    )

    await AsyncStorage.setItem(
      "savingsBillsList",
      JSON.stringify([...cleanedSavingsBillsList, NewSavingBill])
    )

    await dispatch(getBillsListsThunkCreator())
    await dispatch(getBillsMoneyAmountThunkCreator())
    await dispatch(getBudgetsThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const setFastBudgetThunkCreator = (timeRange: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFireestore }: any) => {
    const state = getState()

    // DEFAULT INFO
    let operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    let savingsBillsList = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const isCurrent = timeRange === "current"
    const incomeCheckCategories = isCurrent
      ? state.BudgetGetState.NonBudgetedArrays.Income || []
      : initialCategoriesFilter(state, operations, {
          income: true,
          withDate: true,
          lastMonth: true,
          dayjs: dayjs,
        }) || []

    const expensesCheckCategories = isCurrent
      ? state.BudgetGetState.NonBudgetedArrays.Expenses || []
      : initialCategoriesFilter(state, operations, {
          income: false,
          withDate: true,
          lastMonth: true,
          dayjs: dayjs,
        }) || []

    const savingsCheckBills = isCurrent
      ? state.BudgetGetState.NonBudgetedArrays.Savings
      : []

    const localUserName = await AsyncStorage.getItem("localUserName")

    // INCOME
    incomeCheckCategories.forEach((incomeObj: any) => {
      const category = {
        ...incomeObj,
        budget: Number(incomeObj.price),
        price: 0,
      }

      let OperationObject = {
        isIncome: true,
        bill: null,
        moneyAmount: null,
        comment: null,
        category: category,
        createdAt: new Date(dayjs() as any).getTime(),
        image: null,
        imageStorageID: null,
        user: localUserName,
        id: generateRandomID(),
      }

      operations.push(OperationObject)
    })

    // EXPENSES
    expensesCheckCategories.forEach((expenseObj: any) => {
      const category = {
        ...expenseObj,
        budget: Number(expenseObj.price),
        price: 0,
      }

      let OperationObject = {
        isIncome: false,
        bill: null,
        moneyAmount: null,
        comment: null,
        category: category,
        createdAt: new Date(dayjs() as any).getTime(),
        image: null,
        imageStorageID: null,
        user: localUserName,
        id: generateRandomID(),
      }

      operations.push(OperationObject)
    })

    // SAVINGS
    savingsCheckBills.forEach((savingBill: any) => {
      const bill = savingsBillsList.filter(
        (obj: any) => obj.name === savingBill.name
      )[0]

      const newSavingBill = {
        ...bill,
        budget: Number(savingBill.accountBalance),
      }

      const filteredArray = savingsBillsList.filter(
        (obj: any) => obj.name !== savingBill.name
      )

      savingsBillsList = [...filteredArray, newSavingBill]
    })

    await AsyncStorage.setItem(
      "savingsBillsList",
      JSON.stringify(savingsBillsList)
    )
    await AsyncStorage.setItem("operations", JSON.stringify(operations))

    await dispatch(getCategoriesListsThunkCreator())
    await dispatch(getBillsListsThunkCreator())
    await dispatch(getBillsMoneyAmountThunkCreator())
    await dispatch(getBudgetsThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const deleteAllBudgetsThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const filteredOperations = operations.filter(
      (operation: any) =>
        operation.category.budget === 0 ||
        operation.category.budget === undefined ||
        operation.category.budget === null
    )

    await AsyncStorage.setItem("operations", JSON.stringify(filteredOperations))

    const savingsBillsList = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const filteredSavingsBills = savingsBillsList.map((bill: any) => {
      return { ...bill, budget: null }
    })

    await AsyncStorage.setItem(
      "savingsBillsList",
      JSON.stringify(filteredSavingsBills)
    )

    await dispatch(getCategoriesListsThunkCreator())
    await dispatch(getBillsListsThunkCreator())
    await dispatch(getBillsMoneyAmountThunkCreator())
    await dispatch(getBudgetsThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}
