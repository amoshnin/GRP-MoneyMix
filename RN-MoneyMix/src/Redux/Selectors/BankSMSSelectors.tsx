import { AppStateType } from "~/Redux/ReduxStore"

export const getBankTemplatesList = (state: AppStateType) => {
  return state.BankSMSGetState.TemplatesList
}

export const getIncomeKeywords = (state: AppStateType) => {
  return state.BankSMSGetState.incomeKeywords
}

export const getExpensesKeywords = (state: AppStateType) => {
  return state.BankSMSGetState.expensesKeywords
}
