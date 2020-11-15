// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import MoneyBillsRefillBalanceScreen from "./MoneyBillsRefillBalanceScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { MoneyBillsRefillBalanceThunkCreator } from "~/Redux/Reducers/MoneyTransferReducers/MoneyTransferSetReducer"
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
  MoneyBillsRefillBalanceThunkCreator: (billData: any, newBalance: string) => void
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
    MoneyBillsRefillBalanceThunkCreator: MoneyBillsRefillBalanceThunkCreator,
  })
)(MoneyBillsRefillBalanceScreen)
