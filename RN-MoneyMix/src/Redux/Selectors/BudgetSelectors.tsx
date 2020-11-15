import { AppStateType } from "~/Redux/ReduxStore"

export const getBudgetedArrays = (state: AppStateType) => {
  return state.BudgetGetState.BudgetedArrays
}

export const getNonBudgetedArrays = (state: AppStateType) => {
  return state.BudgetGetState.NonBudgetedArrays
}
