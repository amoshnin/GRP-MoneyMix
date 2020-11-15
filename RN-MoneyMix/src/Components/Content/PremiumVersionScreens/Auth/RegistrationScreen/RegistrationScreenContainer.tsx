// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import RegistrationScreen from "./RegistrationScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
import { RegisterUserThunkCreatior } from "~/Redux/Reducers/AuthReducers/AuthSetReducer"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any
}

type MapDispatchToPropsType = {
  RegisterUserThunkCreatior: (
    email: string,
    password: string,
    PremiumFinishDate: string | null,
    productId: string,
    userInfo: {
      avatarURL: string | null
      name: string | null
      email: string | null
    }
  ) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
  }
}

const RegistrationScreenContainer = compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      RegisterUserThunkCreatior,
    }
  )
)(RegistrationScreen)

export default RegistrationScreenContainer
