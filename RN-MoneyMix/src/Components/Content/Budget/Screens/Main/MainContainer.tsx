// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Budget from "./Main"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getBudgetsThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetGetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { getCategoriesListsThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getIncomeAndExpensesAmountThunkCreator,
  ActionCreatorsList,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import { getSavingsMoneyAmount } from "~/Redux/Selectors/BillsSelectors"
import {
  getTotalIncome,
  getTotalExpenses,
} from "~/Redux/Selectors/CategoriesSelectors"
import {
  getSelectedCurrency,
  getInitialDate,
  getFinalDate,
} from "~/Redux/Selectors/GeneralSelectors"
import {
  getBudgetedArrays,
  getNonBudgetedArrays,
} from "~/Redux/Selectors/BudgetSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any

  selectedCurrency: string
  //
  BudgetedArrays: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }
  NonBudgetedArrays: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }
  //
  totalIncome: number | string | number
  totalExpenses: number | string | number
  savingsMoneyAmount: number | string
  //
  InitialDate: any
  FinalDate: any
}

type MapDispatchToPropsType = {
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  getBudgetsThunkCreator: () => void
  getBillsListsThunkCreator: () => void
  getBillsMoneyAmountThunkCreator: () => void
  getCategoriesListsThunkCreator: () => void
  getIncomeAndExpensesAmountThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    //
    selectedCurrency: getSelectedCurrency(state),
    BudgetedArrays: getBudgetedArrays(state),
    NonBudgetedArrays: getNonBudgetedArrays(state),
    //
    totalIncome: getTotalIncome(state),
    totalExpenses: getTotalExpenses(state),
    savingsMoneyAmount: getSavingsMoneyAmount(state),
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
      getBudgetsThunkCreator,
      getBillsListsThunkCreator,
      getBillsMoneyAmountThunkCreator,
      getCategoriesListsThunkCreator,
      getIncomeAndExpensesAmountThunkCreator,
    }
  )
)(Budget)
