// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Main from "./Main"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getTemplatesListThunkCreator } from "~/Redux/Reducers/BankSMSReducers/BankSMSGetReducer"
// >>Selectors<< //
import { getSelectedCurrency } from "~/Redux/Selectors/GeneralSelectors"
import { getBankTemplatesList } from "~/Redux/Selectors/BankSMSSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  selectedCurrency: string

  TemplatesList: Array<{
    bill: any
    originatingAddress: string
    templateMessage: string
  }>
}

type MapDispatchToPropsType = {
  getTemplatesListThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,

    selectedCurrency: getSelectedCurrency(state),
    TemplatesList: getBankTemplatesList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    getTemplatesListThunkCreator: getTemplatesListThunkCreator,
  })
)(Main)
