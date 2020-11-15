// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Budget from "./Budget"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getBudgetsThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetGetReducer"
import {
  setFastBudgetThunkCreator,
  deleteAllBudgetsThunkCreator,
} from "~/Redux/Reducers/BudgetReducers/BudgetSetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { getCategoriesListsThunkCreator } from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import { getIncomeAndExpensesAmountThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import { getBudgetedArrays } from "~/Redux/Selectors/BudgetSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any

  BudgetedArrays: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }
}

type MapDispatchToPropsType = {
  setFastBudgetThunkCreator: (timeRange: string) => void
  deleteAllBudgetsThunkCreator: () => void

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
    BudgetedArrays: getBudgetedArrays(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    setFastBudgetThunkCreator,
    deleteAllBudgetsThunkCreator,
    getBudgetsThunkCreator,
    getBillsListsThunkCreator,
    getBillsMoneyAmountThunkCreator,
    getCategoriesListsThunkCreator,
    getIncomeAndExpensesAmountThunkCreator,
  })
)(Budget)
