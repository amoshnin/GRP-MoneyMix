import { AppStateType } from "~/Redux/ReduxStore"

export const getIncomeCategoriesList = (state: AppStateType) => {
  return state.CategoriesGetState.incomeCategoriesList
}

export const getExpensesCategoriesList = (state: AppStateType) => {
  return state.CategoriesGetState.expensesCategoriesList
}

export const getTotalIncome = (state: AppStateType) => {
  return state.GeneralGetState.totalIncome
}

export const getTotalExpenses = (state: AppStateType) => {
  return state.GeneralGetState.totalExpenses
}

export const getImportantBills = (state: AppStateType) => {
  return state.CategoriesGetState.ImportantBills
}

export const getProfilesList = (state: AppStateType) => {
  return state.GeneralGetState.ProfilesList
}

export const getTotalIncomeCategoriesList = (state: AppStateType) => {
  return state.GeneralGetState.totalIncomeCategoriesList
}

export const getTotalExpensesCategoriesList = (state: AppStateType) => {
  return state.GeneralGetState.totalExpensesCategoriesList
}

export const getUsedIconsArray = (state: AppStateType) => {
  return state.CategoriesGetState.usedIconsArray
}
