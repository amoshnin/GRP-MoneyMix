// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import TemplatesScreen from "./TemplatesScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { getTemplatesArrayThunkCreator } from "~/Redux/Reducers/TemplatesReducers/TemplatesGetReducer"
import { deleteTemplateThunkCreator } from "~/Redux/Reducers/TemplatesReducers/TemplatesSetReducer"
import { CategoryMoneyTransferThunkCreator } from "~/Redux/Reducers/MoneyTransferReducers/MoneyTransferSetReducer"
// >>Selectors<< //
import { getSelectedCurrency } from "~/Redux/Selectors/GeneralSelectors"
import { getTemplatesArray } from "~/Redux/Selectors/TemplatesSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any

  selectedCurrency: string | null
  TemplatesArray: Array<{
    templateTitle: string
    isIncome: boolean
    category: any
    bill: any
    newMoneyAmount: number | string
    comment: string
    selectedImages: Array<any>
    selectedDate: Date | string | null
    selectedSubCategory: any
    ID: string
  }>
}

type MapDispatchToPropsType = {
  getTemplatesArrayThunkCreator: () => void
  deleteTemplateThunkCreator: (template: any) => void
  CategoryMoneyTransferThunkCreator: (
    isIncome: boolean,
    categoryData: any,
    selectedSubCategory: any,
    selectedBill: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: string
  ) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    TemplatesArray: getTemplatesArray(state),
    selectedCurrency: getSelectedCurrency(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    getTemplatesArrayThunkCreator: getTemplatesArrayThunkCreator,
    deleteTemplateThunkCreator: deleteTemplateThunkCreator,
    CategoryMoneyTransferThunkCreator: CategoryMoneyTransferThunkCreator,
  })
)(TemplatesScreen)
