// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import MoneyBillsTransferScreen from "./MoneyBillsTransferScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { BillsMoneyTransferThunkCreator } from "~/Redux/Reducers/MoneyTransferReducers/MoneyTransferSetReducer"
import { getBillsListsThunkCreator } from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
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

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>
}

type MapDispatchToPropsType = {
  BillsMoneyTransferThunkCreator: (
    firstBillData: any,
    sendingBillData: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: Date
  ) => void
  getBillsListsThunkCreator: () => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    isAuthentificated: getAuthentificationStatus(state),
    isOnline: getOnlineStatus(state),
    selectedCurrency: getSelectedCurrency(state),
    storageData: getStorageData(state),
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
      BillsMoneyTransferThunkCreator: BillsMoneyTransferThunkCreator,
      getBillsListsThunkCreator: getBillsListsThunkCreator,
    }
  )
)(MoneyBillsTransferScreen)
