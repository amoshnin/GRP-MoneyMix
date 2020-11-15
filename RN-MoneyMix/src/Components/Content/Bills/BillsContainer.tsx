// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Bills from "./Bills"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Selectors<< //
import {
  getNormalBillsList,
  getDebtsBillsList,
  getSavingsBillsList,
} from "~/Redux/Selectors/BillsSelectors"
import { getAuthentificationStatus } from "~/Redux/Selectors/GeneralSelectors"

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
}

type MapDispatchToPropsType = {}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    isAuthentificated: getAuthentificationStatus(state),

    normalBillsList: getNormalBillsList(state),
    debtsBillsList: getDebtsBillsList(state),
    savingsBillsList: getSavingsBillsList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {}
  )
)(Bills)
