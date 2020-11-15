// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import KeywordsScreen from "./KeywordsScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import {
  addBankSmsKeywordThunkCreator,
  editBankSmsKeywordThunkCreator,
  deleteBankSmsKeywordThunkCreator,
} from "~/Redux/Reducers/BankSMSReducers/BankSMSSetReducer"
import { getBankSMSKeywordsThunkCreator } from "~/Redux/Reducers/BankSMSReducers/BankSMSGetReducer"
// >>Selectors<< //
import { getIncomeKeywords, getExpensesKeywords } from "~/Redux/Selectors/BankSMSSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  incomeKeywords: Array<{
    ID: string
    text: string
  }>
  expensesKeywords: Array<{
    ID: string
    text: string
  }>
}

type MapDispatchToPropsType = {
  addBankSmsKeywordThunkCreator: (keywordText: string, isIncome: boolean) => void
  editBankSmsKeywordThunkCreator: (
    oldKeywordObj: any,
    editedKeywordText: string,
    isIncome: boolean
  ) => void
  deleteBankSmsKeywordThunkCreator: (oldKeywordObj: any, isIncome: boolean) => void
  getBankSMSKeywordsThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    incomeKeywords: getIncomeKeywords(state),
    expensesKeywords: getExpensesKeywords(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    addBankSmsKeywordThunkCreator,
    editBankSmsKeywordThunkCreator,
    deleteBankSmsKeywordThunkCreator,
    getBankSMSKeywordsThunkCreator,
  })
)(KeywordsScreen)
