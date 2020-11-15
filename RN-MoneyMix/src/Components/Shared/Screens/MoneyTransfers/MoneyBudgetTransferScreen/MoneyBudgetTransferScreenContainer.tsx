// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import MoneyBudgetTransferScreen from "./MoneyBudgetTransferScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { addCertainCategoryBudgetThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetSetReducer"
import { addCertainSavingBillBudgetThunkCreator } from "~/Redux/Reducers/BudgetReducers/BudgetSetReducer"
// >>Selectors<< //
import { getSelectedCurrency } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any
  selectedCurrency: string
}

type MapDispatchToPropsType = {
  addCertainCategoryBudgetThunkCreator: (
    category: any,
    isIncome: boolean,
    budget: string | number
  ) => void
  addCertainSavingBillBudgetThunkCreator: (savingBill: any, budget: number) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    selectedCurrency: getSelectedCurrency(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    addCertainCategoryBudgetThunkCreator: addCertainCategoryBudgetThunkCreator,
    addCertainSavingBillBudgetThunkCreator: addCertainSavingBillBudgetThunkCreator,
  })
)(MoneyBudgetTransferScreen)
