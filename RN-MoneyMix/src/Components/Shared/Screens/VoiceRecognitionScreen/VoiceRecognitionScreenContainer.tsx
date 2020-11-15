// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import VoiceRecognitionScreen from "./VoiceRecognitionScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import {
  recogniseTextThunkCreator,
  ActionCreatorsList,
} from "~/Redux/Reducers/VoiceRecognitionReducer/VoiceRecognitionReducer"
import { CategoryMoneyTransferThunkCreator } from "~/Redux/Reducers/MoneyTransferReducers/MoneyTransferSetReducer"
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
import { getRecognitionInfo } from "~/Redux/Selectors/VoiceRecognitionSelectors"

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
  recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>
}

type MapDispatchToPropsType = {
  setRecognitionDataActionCreator: (recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }) => void
  recogniseTextThunkCreator: (text: string, t: any) => void
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
  getFullCategoriesListThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    //
    isOnline: getOnlineStatus(state),
    isAuthentificated: getAuthentificationStatus(state),
    selectedCurrency: getSelectedCurrency(state),
    storageData: getStorageData(state),
    recognitionInfo: getRecognitionInfo(state),
    //
    normalBillsList: getNormalBillsList(state),
    debtsBillsList: getDebtsBillsList(state),
    savingsBillsList: getSavingsBillsList(state),
    //
    totalIncomeCategoriesList: getTotalIncomeCategoriesList(state),
    totalExpensesCategoriesList: getTotalExpensesCategoriesList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      CategoryMoneyTransferThunkCreator,
      setRecognitionDataActionCreator:
        ActionCreatorsList.setRecognitionDataActionCreator,
      recogniseTextThunkCreator,
      getFullCategoriesListThunkCreator,
    }
  )
)(VoiceRecognitionScreen)
