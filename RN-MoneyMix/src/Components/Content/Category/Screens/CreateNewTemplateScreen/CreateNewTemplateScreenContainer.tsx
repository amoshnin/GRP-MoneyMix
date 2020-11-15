// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import CreateNewTemplateScreen from "./CreateNewTemplateScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"

// >>Reducers<< //
import { addNewTemplateThunkCreator } from "~/Redux/Reducers/TemplatesReducers/TemplatesSetReducer"
import { getFullCategoriesListThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import {
  getSelectedCurrency,
  getOnlineStatus,
  getAuthentificationStatus,
  getStorageData,
} from "~/Redux/Selectors/GeneralSelectors"
import {
  getNormalBillsList,
  getDebtsBillsList,
  getSavingsBillsList,
} from "~/Redux/Selectors/BillsSelectors"
import {
  getTotalIncomeCategoriesList,
  getTotalExpensesCategoriesList,
} from "~/Redux/Selectors/CategoriesSelectors"
import { TemplateItemType } from "~/Redux/Types/TemplatesTypes"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  isOnline: boolean
  isAuthentificated: boolean
  selectedCurrency: string
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>
}

type MapDispatchToPropsType = {
  getFullCategoriesListThunkCreator: () => void
  addNewTemplateThunkCreator: (newTemplate: TemplateItemType) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    //
    isAuthentificated: getAuthentificationStatus(state),
    isOnline: getOnlineStatus(state),
    selectedCurrency: getSelectedCurrency(state),
    storageData: getStorageData(state),
    //
    totalIncomeCategoriesList: getTotalIncomeCategoriesList(state),
    totalExpensesCategoriesList: getTotalExpensesCategoriesList(state),
    //
    normalBillsList: getNormalBillsList(state),
    debtsBillsList: getDebtsBillsList(state),
    savingsBillsList: getSavingsBillsList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      addNewTemplateThunkCreator,
      getFullCategoriesListThunkCreator,
    }
  )
)(CreateNewTemplateScreen as any)
