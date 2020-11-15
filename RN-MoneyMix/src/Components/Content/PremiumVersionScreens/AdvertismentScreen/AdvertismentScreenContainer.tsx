// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import AdvertismentScreen from "./AdvertismentScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { setNewSubscriptionDataThunkCreator } from "~/Redux/Reducers/AuthReducers/AuthSetReducer"
// >>Selectors<< //
import {
  getSelectedCurrency,
  getSubscriptionStatus,
  getAuthentificationStatus,
} from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  selectedCurrency: string
  isSubscribed: boolean
  isAuthentificated: boolean
}

type MapDispatchToPropsType = {
  setNewSubscriptionDataThunkCreator: (
    PremiumFinishDate: string | null,
    productId: string
  ) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    selectedCurrency: getSelectedCurrency(state),
    isSubscribed: getSubscriptionStatus(state),
    isAuthentificated: getAuthentificationStatus(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      setNewSubscriptionDataThunkCreator,
    }
  )
)(AdvertismentScreen)
