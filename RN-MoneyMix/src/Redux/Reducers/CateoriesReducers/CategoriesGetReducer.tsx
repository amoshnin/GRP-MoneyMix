//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import {
  initialCategoriesFilter,
  removeCategoriesDuplicates,
} from "~/Components/Shared/Helpers/Functions/CategoriesFunctions"
import { getFullCategoriesListThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { getDefaultBillThunkCreator } from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"

////////////////////////////////////////////////////////////////////////

const initialState = {
  incomeCategoriesList: [] as Array<any>,
  expensesCategoriesList: [] as Array<any>,
  ImportantBills: [] as Array<any>,

  usedIconsArray: [] as Array<string>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const CategoriesGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_CATEGORIES_LISTS") {
    return {
      ...state,
      incomeCategoriesList: action.incomeCategoriesList,
      expensesCategoriesList: action.expensesCategoriesList,
    }
  }

  if (action.type === "SET_IMPORTANT_BILLS") {
    return {
      ...state,
      ImportantBills: action.importantBills,
    }
  }

  if (action.type === "SET_USED_ICONS_ARRAY") {
    return {
      ...state,
      usedIconsArray: action.usedIconsArray,
    }
  }

  return state
}

export default CategoriesGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setCategoriesListsActionCreator: (
    incomeCategoriesList: Array<any>,
    expensesCategoriesList: Array<any>
  ) =>
    ({
      type: "SET_CATEGORIES_LISTS",
      incomeCategoriesList,
      expensesCategoriesList,
    } as const),

  setImportantBillsActionCreator: (importantBills: Array<any>) =>
    ({
      type: "SET_IMPORTANT_BILLS",
      importantBills,
    } as const),

  setUsedIconsArrayActionCreator: (usedIconsArray: Array<string>) =>
    ({
      type: "SET_USED_ICONS_ARRAY",
      usedIconsArray,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getCategoriesListsThunkCreator = (
  includeArchived?: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const isInfinite = state.GeneralGetState.DateType === "Infinite"

          const incomeCategoriesArray = initialCategoriesFilter(state, json, {
            income: true,
            withDate: !isInfinite,
          })

          const IncomeFilteredCategories =
            incomeCategoriesArray &&
            removeCategoriesDuplicates(incomeCategoriesArray, "id")

          const expensesCategoriesArray = initialCategoriesFilter(state, json, {
            income: false,
            withDate: !isInfinite,
          })

          const ExpensesFilteredCategories = removeCategoriesDuplicates(
            expensesCategoriesArray,
            "id"
          )

          dispatch(
            ActionCreatorsList.setCategoriesListsActionCreator(
              IncomeFilteredCategories.filter((obj: any) =>
                includeArchived ? obj : !obj.archived
              ),
              ExpensesFilteredCategories.filter((obj: any) =>
                includeArchived ? obj : !obj.archived
              )
            )
          )

          dispatch(getFullCategoriesListThunkCreator())
          dispatch(getDefaultBillThunkCreator())
        } else {
          dispatch(ActionCreatorsList.setCategoriesListsActionCreator([], []))
        }
      })
  }
}

export const getImporantBillsThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("importantBills")
      .then((req: any) => JSON.parse(req))
      .then(async (importantBills) => {
        if (importantBills) {
          await AsyncStorage.getItem("normalBillsList")
            .then((req: any) => JSON.parse(req))
            .then(async (normalBills) => {
              if (normalBills) {
                const finalArray = normalBills.filter((normalBill: any) =>
                  importantBills.some(
                    (importantBill: any) =>
                      normalBill.name === importantBill.name
                  )
                )

                dispatch(
                  ActionCreatorsList.setImportantBillsActionCreator(finalArray)
                )
              } else {
                dispatch(ActionCreatorsList.setImportantBillsActionCreator([]))
              }
            })
        } else {
          dispatch(ActionCreatorsList.setImportantBillsActionCreator([]))
        }
      })
  }
}

export const getUsedIconsArrayThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const CategoriesArray = state.OperationsGetState.operationsList.map(
      (operation: any) => operation.category
    )

    const IconsArray = CategoriesArray.map((category: any) => category.icon)

    dispatch(ActionCreatorsList.setUsedIconsArrayActionCreator(IconsArray))
  }
}
