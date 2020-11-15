// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import BottomTabNavigator from "./BottomTabNavigator"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getInitialGeneralDataThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import { getBudgetEnabledStatus } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  budgetEnabledStatus: boolean
}

type MapDispatchToPropsType = {
  getInitialGeneralDataThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    budgetEnabledStatus: getBudgetEnabledStatus(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,

    {
      getInitialGeneralDataThunkCreator: getInitialGeneralDataThunkCreator,
    }
  )
)(BottomTabNavigator)
