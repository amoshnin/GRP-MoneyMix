// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Main from "./Main"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
  getDefaultBillThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { setDefaultBillThunkCreator } from "~/Redux/Reducers/BillsRedcers/BillsSetReducer"
import { getFullCategoriesListThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"

// >>Selectors<< //
import {
  getNormalBillsList,
  getDebtsBillsList,
  getSavingsBillsList,
  getBillsMoneyAmount,
  getDebtsMoneyAmount,
  getSavingsMoneyAmount,
} from "~/Redux/Selectors/BillsSelectors"
import {
  getTotalIncomeCategoriesList,
  getTotalExpensesCategoriesList,
} from "~/Redux/Selectors/CategoriesSelectors"
import { getDefaultBill, getSelectedCurrency } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  selectedCurrency: string

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  debtsBillsList: Array<{
    description: string
    iOwe: string
    name: string
    takeIntoTotalBalance: boolean
    totalDebtSum: string
    type: string
    icon: string
  }>

  savingsBillsList: Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  billsMoneyAmount: number | string
  debtsMoneyAmount: number | string
  savingsMoneyAmount: number | string

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  defaultBill: any
}

type MapDispatchToPropsType = {
  getBillsListsThunkCreator: () => void
  getBillsMoneyAmountThunkCreator: () => void
  getFullCategoriesListThunkCreator: () => void
  getDefaultBillThunkCreator: () => void
  setDefaultBillThunkCreator: (defaultBill: any) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    selectedCurrency: getSelectedCurrency(state),
    defaultBill: getDefaultBill(state),

    normalBillsList: getNormalBillsList(state),
    debtsBillsList: getDebtsBillsList(state),
    savingsBillsList: getSavingsBillsList(state),

    billsMoneyAmount: getBillsMoneyAmount(state),
    debtsMoneyAmount: getDebtsMoneyAmount(state),
    savingsMoneyAmount: getSavingsMoneyAmount(state),

    totalIncomeCategoriesList: getTotalIncomeCategoriesList(state),
    totalExpensesCategoriesList: getTotalExpensesCategoriesList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    getBillsListsThunkCreator,
    getBillsMoneyAmountThunkCreator,
    getFullCategoriesListThunkCreator,
    getDefaultBillThunkCreator,
    setDefaultBillThunkCreator,
  })
)(Main)
