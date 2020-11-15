// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Main from "./MainScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"

// >>Reducers<< //
import {
  getCategoriesListsThunkCreator,
  getImporantBillsThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getIncomeAndExpensesAmountThunkCreator,
  ActionCreatorsList,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import {
  getBillsListsThunkCreator,
  getDefaultBillThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { ChangeImportantBillThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesSetReducer"
import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"

// >>Selectors<< //
import {
  getSelectedCurrency,
  getInitialDate,
  getFinalDate,
  getDateType,
  getDefaultBill,
  getBudgetEnabledStatus,
  getAuthentificationStatus,
} from "~/Redux/Selectors/GeneralSelectors"
import {
  getImportantBills,
  getIncomeCategoriesList,
  getExpensesCategoriesList,
  getTotalIncome,
  getTotalExpenses,
} from "~/Redux/Selectors/CategoriesSelectors"
import { getNormalBillsList } from "~/Redux/Selectors/BillsSelectors"
import { getOperationsList } from "~/Redux/Selectors/OperationsSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any
  isAuthentificated: boolean

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  selectedCurrency: string
  //
  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>
  //
  totalIncome: number | string | number
  totalExpenses: number | string | number
  //
  InitialDate: any
  FinalDate: any
  DateType: string
  //
  ImportantBills: Array<any>
  defaultBill: any

  operationsList: Array<any>
  budgetEnabledStatus: boolean
}

type MapDispatchToPropsType = {
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  ChangeImportantBillThunkCreator: (oldBill: any, newBill: any) => void
  getCategoriesListsThunkCreator: () => void
  getImporantBillsThunkCreator: () => void
  getBillsListsThunkCreator: () => void
  getDefaultBillThunkCreator: () => void
  getOperationsListThunkCreator: (selectedFilers: Array<any>) => void
  getIncomeAndExpensesAmountThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    isAuthentificated: getAuthentificationStatus(state),
    selectedCurrency: getSelectedCurrency(state),
    //
    normalBillsList: getNormalBillsList(state),
    ImportantBills: getImportantBills(state),
    //
    incomeCategoriesList: getIncomeCategoriesList(state),
    expensesCategoriesList: getExpensesCategoriesList(state),
    //
    totalIncome: getTotalIncome(state),
    totalExpenses: getTotalExpenses(state),
    //
    InitialDate: getInitialDate(state),
    FinalDate: getFinalDate(state),
    DateType: getDateType(state),
    //
    defaultBill: getDefaultBill(state),
    operationsList: getOperationsList(state),
    budgetEnabledStatus: getBudgetEnabledStatus(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      setDateActionCreator: ActionCreatorsList.setDateActionCreator,
      ChangeImportantBillThunkCreator: ChangeImportantBillThunkCreator,
      getCategoriesListsThunkCreator: getCategoriesListsThunkCreator,
      getImporantBillsThunkCreator: getImporantBillsThunkCreator,
      getBillsListsThunkCreator: getBillsListsThunkCreator,
      getDefaultBillThunkCreator: getDefaultBillThunkCreator,
      getOperationsListThunkCreator: getOperationsListThunkCreator,
      getIncomeAndExpensesAmountThunkCreator: getIncomeAndExpensesAmountThunkCreator,
    }
  )
)(Main)
