import { AppStateType } from "~/Redux/ReduxStore"

export const getNormalBillsList = (state: AppStateType) => {
  return state.BillsGetState.normalBillsList
}

export const getDebtsBillsList = (state: AppStateType) => {
  return state.BillsGetState.debtsBillsList
}

export const getSavingsBillsList = (state: AppStateType) => {
  return state.BillsGetState.savingsBillsList
}

//

export const getBillsMoneyAmount = (state: AppStateType) => {
  return state.BillsGetState.billsMoneyAmount
}

export const getDebtsMoneyAmount = (state: AppStateType) => {
  return state.BillsGetState.debtsMoneyAmount
}

export const getSavingsMoneyAmount = (state: AppStateType) => {
  return state.BillsGetState.savingsMoneyAmount
}
