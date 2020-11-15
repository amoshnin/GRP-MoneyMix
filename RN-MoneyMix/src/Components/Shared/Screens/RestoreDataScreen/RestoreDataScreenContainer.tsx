// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import RestoreDataScreen from "./RestoreDataScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import {
  RestoreDataFromCloudThunkCreator,
  RestoreDataFromDeviceThunkCreator,
} from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"
// >>Selectors<< //

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any
}

type MapDispatchToPropsType = {
  RestoreDataFromCloudThunkCreator: (email?: string) => void
  RestoreDataFromDeviceThunkCreator: (email?: string) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (
  state: AppStateType,
  props: any
): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps as any,
    {
      RestoreDataFromCloudThunkCreator,
      RestoreDataFromDeviceThunkCreator,
    }
  )
)(RestoreDataScreen)
