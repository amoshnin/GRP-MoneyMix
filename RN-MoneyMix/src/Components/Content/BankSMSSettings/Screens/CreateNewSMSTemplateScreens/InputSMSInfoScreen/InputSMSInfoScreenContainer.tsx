// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import InputSMSInfoScreen from "./InputSMSInfoScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { createNewBankSMSThunkCreator } from "~/Redux/Reducers/BankSMSReducers/BankSMSSetReducer"
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
  createNewBankSMSThunkCreator: (
    bill: any,
    originatingAddress: string,
    templateMessage: string
  ) => void
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
    createNewBankSMSThunkCreator: createNewBankSMSThunkCreator,
  })
)(InputSMSInfoScreen)
