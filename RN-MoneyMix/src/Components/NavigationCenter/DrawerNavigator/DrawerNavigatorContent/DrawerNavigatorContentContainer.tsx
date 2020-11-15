// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import DrawerNavigatorContent from "./DrawerNavigatorContent"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { LogoutUserThunkCreator } from "~/Redux/Reducers/AuthReducers/AuthSetReducer"
import {
  setCurrencyThunkCreator,
  setNewAvatarThunkCreator,
  deleteAllDataThunkCreator,
  downloadSVGThunkCreator,
} from "~/Redux/Reducers/GeneralReducers/GeneralSetReducer"
import {
  getInitialGeneralDataThunkCreator,
  getBudgetStatusThunkCreator,
  ActionCreatorsList as GeneralGetReducerActionCreatorsList,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import {
  getPremiumFinishDate,
  getBudgetEnabledStatus,
  getSelectedCurrency,
  getOnlineStatus,
  getAvatar,
  getAuthentificationStatus,
  getStorageData,
} from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  avatar: string | null
  isOnline: boolean
  isAuthentificated: boolean

  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }
  PremiumFinishDate: string | null

  budgetEnabledStatus: boolean
  selectedCurrency: string
}

type MapDispatchToPropsType = {
  setNewAvatarThunkCreator: (newAvatarBlob: Blob) => void
  setCurrencyThunkCreator: (newCurrency: string) => void
  getBudgetStatusThunkCreator: () => void
  downloadSVGThunkCreator: (t: any) => void

  LogoutUserThunkCreator: () => void
  deleteAllDataThunkCreator: (i18: any) => void

  getInitialGeneralDataThunkCreator: () => void
  setAvatarActionCreator: (avatarURI: string) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    avatar: getAvatar(state),
    isOnline: getOnlineStatus(state),
    isAuthentificated: getAuthentificationStatus(state),

    storageData: getStorageData(state),
    PremiumFinishDate: getPremiumFinishDate(state),

    budgetEnabledStatus: getBudgetEnabledStatus(state),
    selectedCurrency: getSelectedCurrency(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      setNewAvatarThunkCreator,
      setCurrencyThunkCreator,
      getBudgetStatusThunkCreator,
      downloadSVGThunkCreator,

      LogoutUserThunkCreator,
      deleteAllDataThunkCreator,

      getInitialGeneralDataThunkCreator,

      setAvatarActionCreator:
        GeneralGetReducerActionCreatorsList.setAvatarActionCreator,
    }
  )
)(DrawerNavigatorContent)
