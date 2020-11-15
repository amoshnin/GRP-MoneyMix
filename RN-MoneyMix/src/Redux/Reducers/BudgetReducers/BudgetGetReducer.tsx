//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"

////////////////////////////////////////////////////////////////////////

const initialState = {
  BudgetedArrays: {
    Income: [] as Array<any>,
    Expenses: [] as Array<any>,
    Savings: [] as Array<any>,
  },

  NonBudgetedArrays: {
    Income: [] as Array<any>,
    Expenses: [] as Array<any>,
    Savings: [] as Array<any>,
  },
}

type initialStateType = typeof initialState

// *REDUCER* //
const BudgetGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_BUDGETED_ARRAYS") {
    return {
      ...state,
      BudgetedArrays: action.budgets,
    }
  }

  if (action.type === "SET_NON_BUDGETED_ARRAYS") {
    return {
      ...state,
      NonBudgetedArrays: action.nonBudgets,
    }
  }

  return state
}

export default BudgetGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setBudgetedArraysActionCreator: (budgets: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }) =>
    ({
      type: "SET_BUDGETED_ARRAYS",
      budgets,
    } as const),

  setNonBudgetedArraysActionCreator: (nonBudgets: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }) =>
    ({
      type: "SET_NON_BUDGETED_ARRAYS",
      nonBudgets,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

//
export const getBudgetsThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const incomeCategoriesList = state.CategoriesGetState.incomeCategoriesList
    const expensesCategoriesList =
      state.CategoriesGetState.expensesCategoriesList
    const savingsBillsList = state.BillsGetState.savingsBillsList

    // BUDGETED ARRAYS
    const budgetedIncomeCategories =
      incomeCategoriesList &&
      incomeCategoriesList.filter((category: any) => category.budget > 0)
    const budgetedExpensesCategories =
      expensesCategoriesList &&
      expensesCategoriesList.filter((category: any) => category.budget > 0)
    const budgetedSavingsBills =
      savingsBillsList &&
      savingsBillsList.filter((saving: any) => saving.budget > 0)

    dispatch(
      ActionCreatorsList.setBudgetedArraysActionCreator({
        Income: budgetedIncomeCategories,
        Expenses: budgetedExpensesCategories,
        Savings: budgetedSavingsBills,
      })
    )

    // NON BUDGETED ARRAYS
    const nonBudgetedIncomeCategoriesList =
      incomeCategoriesList &&
      incomeCategoriesList
        .filter((el) => !budgetedIncomeCategories.includes(el))
        .filter(
          (category: any) =>
            category.icon !== "dollar" && category.icon !== "creditcard"
        )
    const nonBudgetedExpensesCategoriesList =
      expensesCategoriesList &&
      expensesCategoriesList.filter(
        (el) => !budgetedExpensesCategories.includes(el)
      )
    const nonBudgetedSavingsBillsList =
      savingsBillsList &&
      savingsBillsList.filter((x) => {
        return !budgetedSavingsBills.some((t) => t.name === x.name)
      })

    dispatch(
      ActionCreatorsList.setNonBudgetedArraysActionCreator({
        Income: nonBudgetedIncomeCategoriesList,
        Expenses: nonBudgetedExpensesCategoriesList,
        Savings: nonBudgetedSavingsBillsList,
      })
    )
  }
}
