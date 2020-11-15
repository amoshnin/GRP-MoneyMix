// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import StorageSubscriptionsScreen from "./StorageSubscriptionsScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getStorageData } from "~/Redux/Selectors/GeneralSelectors"
import { setStorageLimitThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralSetReducer"
// >>Selectors<< //

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any

  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }
}

type MapDispatchToPropsType = {
  setStorageLimitThunkCreator: (newStorageLimit: string) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (
  state: AppStateType,
  props: any
): MapStateToPropsType => {
  return {
    navigation: props.navigation,

    storageData: getStorageData(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps as any,
    {
      setStorageLimitThunkCreator,
    }
  )
)(StorageSubscriptionsScreen)
