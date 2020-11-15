// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import ResetPasswordScreen from "./ResetPasswordScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
import {
  sendResetPasswordEmailThunkCreator,
  ActionCreatorsList,
} from "~/Redux/Reducers/AuthReducers/AuthSetReducer"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  ResetPassResponseData: {
    popupVisible: boolean
    positive: boolean
  }
}

type MapDispatchToPropsType = {
  setResetPassResponseDataActionCreator: (newResponseData: {
    popupVisible: boolean
    positive: boolean
  }) => void
  sendResetPasswordEmailThunkCreator: (emailAddress: string) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    ResetPassResponseData: state.AuthSetState.ResetPassResponseData,
  }
}

const RegistrationScreenContainer = compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      sendResetPasswordEmailThunkCreator,
      setResetPassResponseDataActionCreator:
        ActionCreatorsList.setResetPassResponseDataActionCreator,
    }
  )
)(ResetPasswordScreen)

export default RegistrationScreenContainer
