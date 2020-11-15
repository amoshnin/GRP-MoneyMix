import { AppStateType } from "~/Redux/ReduxStore"

export const getRatingPopupVisibility = (state: AppStateType) => {
  return state.GeneralGetState.ratingPopupVisible
}

export const getSelectedCurrency = (state: AppStateType) => {
  return state.GeneralGetState.selectedCurrency
}

export const getOnlineStatus = (state: AppStateType) => {
  return state.GeneralGetState.isOnline
}

export const getAuthentificationStatus = (state: AppStateType) => {
  return state.GeneralGetState.isAuthentificated
}

export const getInitialDate = (state: AppStateType) => {
  return state.GeneralGetState.InitialDate
}

export const getDateType = (state: AppStateType) => {
  return state.GeneralGetState.DateType
}

export const getFinalDate = (state: AppStateType) => {
  return state.GeneralGetState.FinalDate
}

export const getBudgetEnabledStatus = (state: AppStateType) => {
  return state.GeneralGetState.budgetEnabledStatus
}

export const getDefaultBill = (state: AppStateType) => {
  return state.BillsGetState.defaultBill
}

export const getAvatar = (state: AppStateType) => {
  return state.GeneralGetState.avatar
}

export const getPremiumFinishDate = (state: AppStateType) => {
  return state.GeneralGetState.PremiumFinishDate
}

export const getSubscriptionStatus = (state: AppStateType) => {
  return state.PremiumSetState.isSubscribed
}

export const getFullImagesURLsList = (state: AppStateType) => {
  return state.GeneralGetState.fullImagesURLsList
}

export const getStorageData = (state: AppStateType) => {
  return {
    used: state.GeneralGetState.storageUsed,
    limit: state.GeneralGetState.storageLimit,
    isReachedLimit: state.GeneralGetState.isReachedLimit,
  }
}
