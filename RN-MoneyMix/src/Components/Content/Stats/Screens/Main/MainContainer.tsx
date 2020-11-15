// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Main from "./Main"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //

import {
  ActionCreatorsList,
  getIncomeAndExpensesAmountThunkCreator,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import { getCategoriesListsThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
// >>Selectors<< //
import {
  getSelectedCurrency,
  getInitialDate,
  getFinalDate,
  getDefaultBill,
} from "~/Redux/Selectors/GeneralSelectors"
import {
  getTotalIncome,
  getTotalExpenses,
  getIncomeCategoriesList,
  getExpensesCategoriesList,
} from "~/Redux/Selectors/CategoriesSelectors"
import { getOperationsList } from "~/Redux/Selectors/OperationsSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  selectedCurrency: string

  totalIncome: number | string
  totalExpenses: number | string

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  defaultBill: any
  operationsList: Array<any>

  InitialDate: any
  FinalDate: any
}

type MapDispatchToPropsType = {
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  getOperationsListThunkCreator: (selectedFilters: Array<string>) => void
  getCategoriesListsThunkCreator: (includeArchived?: boolean) => any
  getIncomeAndExpensesAmountThunkCreator: () => any
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    selectedCurrency: getSelectedCurrency(state),
    //
    totalIncome: getTotalIncome(state),
    totalExpenses: getTotalExpenses(state),
    //
    incomeCategoriesList: getIncomeCategoriesList(state),
    expensesCategoriesList: getExpensesCategoriesList(state),
    //
    operationsList: getOperationsList(state),
    defaultBill: getDefaultBill(state),
    //
    InitialDate: getInitialDate(state),
    FinalDate: getFinalDate(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      setDateActionCreator: ActionCreatorsList.setDateActionCreator,
      getOperationsListThunkCreator,
      getIncomeAndExpensesAmountThunkCreator,
      getCategoriesListsThunkCreator,
    }
  )
)(Main)
