// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import LoginScreen from "./LoginScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"

// >>Reducers<< //
import { LoginUserThunkCreatior } from "~/Redux/Reducers/AuthReducers/AuthSetReducer"
import { ActionCreatorsList } from "~/Redux/Reducers/AuthReducers/AuthSetReducer"
// >>Selectors<< //
import { getOnlineStatus } from "~/Redux/Selectors/GeneralSelectors"
import { getLoginResponse } from "~/Redux/Selectors/AuthSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any

  isOnline: boolean
  LoginResponse: string | null
}

type MapDispatchToPropsType = {
  LoginUserThunkCreatior: (
    email: string,
    password: string,
    restoreOrigin: string
  ) => void
  setLoginResponseActionCreator: (loginResponse: string | null) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    isOnline: getOnlineStatus(state),
    LoginResponse: getLoginResponse(state),
  }
}

const LoginScreenContainer = compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      LoginUserThunkCreatior,
      setLoginResponseActionCreator:
        ActionCreatorsList.setLoginResponseActionCreator,
    }
  )
)(LoginScreen)

export default LoginScreenContainer
