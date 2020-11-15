// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import ReserveDataScreen from "./ReserveDataScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getReservedCopiesListThunkCreator } from "~/Redux/Reducers/ReserveDataReducers/ReserveDataGetReducer"
import {
  createReserveCopyThunkCreator,
  removeReserveCopyThunkCreator,
  applyReserveCopyThunkCreator,
} from "~/Redux/Reducers/ReserveDataReducers/ReserveDataSetReducer"
// >>Selectors<< //

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any
  ReservedCopiesList: Array<string>
}

type MapDispatchToPropsType = {
  getReservedCopiesListThunkCreator: () => void
  createReserveCopyThunkCreator: () => void
  removeReserveCopyThunkCreator: (ID: string) => void
  applyReserveCopyThunkCreator: (ID: string) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (
  state: AppStateType,
  props: any
): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    ReservedCopiesList: state.ReserveDataGetState.ReservedCopiesList,
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps as any,
    {
      getReservedCopiesListThunkCreator,
      createReserveCopyThunkCreator,
      removeReserveCopyThunkCreator,
      applyReserveCopyThunkCreator,
    }
  )
)(ReserveDataScreen)
