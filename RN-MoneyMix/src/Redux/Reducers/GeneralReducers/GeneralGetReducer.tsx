//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import { AsyncStorage } from "react-native"
import dayjs from "dayjs"
import axios from "axios"

import {
  initialCategoriesFilter,
  removeCategoriesDuplicates,
} from "~/Components/Shared/Helpers/Functions/CategoriesFunctions"
import { getOnlineStatus } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////

const initialState = {
  storageUsed: 0 as number,
  storageLimit: 1048576 as number,
  isReachedLimit: false as boolean,
  //
  fullImagesURLsList: [] as Array<any>,
  ratingPopupVisible: false as boolean,

  isOnline: true as boolean,
  isAuthentificated: false as boolean,

  avatar: null as string | null,
  budgetEnabledStatus: false as boolean,

  selectedCurrency: "RusRuble" as string,

  totalIncomeCategoriesList: [] as Array<any>,
  totalExpensesCategoriesList: [] as Array<any>,

  totalIncome: 0 as string | number,
  totalExpenses: 0 as string | number,

  ProfilesList: [] as Array<any>,

  DateType: "Month" as string,
  InitialDate: new Date(dayjs().startOf("month") as any).getTime() as
    | Date
    | number,
  FinalDate: new Date(dayjs().endOf("month") as any).getTime() as Date | number,

  PremiumFinishDate: null as string | null,
}

type initialStateType = typeof initialState

// *REDUCER* //
const CategoriesReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_RATING_POPUP_VISIBILITY") {
    return {
      ...state,
      ratingPopupVisible: action.ratingPopupVisibility,
    }
  }

  if (action.type === "SET_SELECTED_CURRENCY") {
    return {
      ...state,
      selectedCurrency: action.selectedLanguage,
    }
  }

  if (action.type === "SET_ONLINE_STATUS") {
    return {
      ...state,
      isOnline: action.onlineStatus,
    }
  }

  if (action.type === "SET_AUTHENTIFICATION_STATUS") {
    return {
      ...state,
      isAuthentificated: action.isAuthentificated,
    }
  }

  if (action.type === "SET_TOTAL_INCOME_AND_EXPENSES") {
    return {
      ...state,
      totalIncome: action.totalIncome,
      totalExpenses: action.totalExpenses,
    }
  }

  if (action.type === "SET_AVATAR") {
    return {
      ...state,
      avatar: action.avatar,
    }
  }

  if (action.type === "SET_PROFILES_LIST") {
    return {
      ...state,
      ProfilesList: action.profilesList,
    }
  }

  if (action.type === "SET_BUDGET_STATUS") {
    return {
      ...state,
      budgetEnabledStatus: action.budgetStatus,
    }
  }

  if (action.type === "SET_DATE") {
    return {
      ...state,
      InitialDate: action.initialDate as number | Date,
      FinalDate: action.finalDate as number | Date,
    }
  }

  if (action.type === "SET_DATE_TYPE") {
    return {
      ...state,
      DateType: action.dateType,
    }
  }

  if (action.type === "SET_FULL_INCOME_AND_EXPENSES_LIST") {
    return {
      ...state,
      totalIncomeCategoriesList: action.fullIncomeList,
      totalExpensesCategoriesList: action.fullExpensesList,
    }
  }

  if (action.type === "SET_PREMIUM_FINISH_DATE") {
    return {
      ...state,
      PremiumFinishDate: action.premiumFinishDate,
    }
  }

  if (action.type === "SET_STORAGE_LIMIT_DATA") {
    return {
      ...state,
      storageUsed: action.usedAmount,
      storageLimit: action.limitAmount,
      isReachedLimit: action.isReachedLimit,
    }
  }

  if (action.type === "SET_IMAGES_URLS") {
    return {
      ...state,
      fullImagesURLsList: action.imagesURLs,
    }
  }

  return state
}

export default CategoriesReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setRatingPopupVisibilityActionCreator: (ratingPopupVisibility: boolean) =>
    ({
      type: "SET_RATING_POPUP_VISIBILITY",
      ratingPopupVisibility,
    } as const),

  setSelectedCurrencyActionCreator: (selectedLanguage: string) =>
    ({
      type: "SET_SELECTED_CURRENCY",
      selectedLanguage,
    } as const),

  setOnlineStatusActionCreator: (onlineStatus: boolean) =>
    ({
      type: "SET_ONLINE_STATUS",
      onlineStatus,
    } as const),

  setAuthentificationStatusActionCreator: (isAuthentificated: boolean) =>
    ({
      type: "SET_AUTHENTIFICATION_STATUS",
      isAuthentificated,
    } as const),

  setTotalIncomeAndExpensesActionCreator: (
    totalIncome: number | string | number,
    totalExpenses: number | string | number
  ) =>
    ({
      type: "SET_TOTAL_INCOME_AND_EXPENSES",
      totalIncome,
      totalExpenses,
    } as const),

  setAvatarActionCreator: (avatar: string) =>
    ({
      type: "SET_AVATAR",
      avatar,
    } as const),

  setBudgetStatusActionCreator: (budgetStatus: boolean) =>
    ({
      type: "SET_BUDGET_STATUS",
      budgetStatus,
    } as const),

  setProfilesListActionCreator: (profilesList: Array<any>) =>
    ({
      type: "SET_PROFILES_LIST",
      profilesList,
    } as const),

  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) =>
    ({
      type: "SET_DATE",
      initialDate,
      finalDate,
    } as const),

  setDateTypeActionCreator: (dateType: string) =>
    ({
      type: "SET_DATE_TYPE",
      dateType,
    } as const),

  setFullIncomeAndExpensesCategoriesList: (
    fullIncomeList: Array<any>,
    fullExpensesList: Array<any>
  ) =>
    ({
      type: "SET_FULL_INCOME_AND_EXPENSES_LIST",
      fullIncomeList,
      fullExpensesList,
    } as const),

  setPremiumFinishDateActionCreator: (premiumFinishDate: string) =>
    ({
      type: "SET_PREMIUM_FINISH_DATE",
      premiumFinishDate,
    } as const),

  setStorageLimitDataActionCreator: (
    usedAmount: number,
    limitAmount: number,
    isReachedLimit: boolean
  ) =>
    ({
      type: "SET_STORAGE_LIMIT_DATA",
      usedAmount,
      limitAmount,
      isReachedLimit,
    } as const),

  setImagesURLsListActionCreator: (imagesURLs: Array<any>) =>
    ({
      type: "SET_IMAGES_URLS",
      imagesURLs,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getStorageDataThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()

    const setData = () => {
      firestore
        .collection(state.firebase.auth.email)
        .doc("StorageUsage")
        .get()
        .then(async (doc: any) => {
          const data = await doc.data()
          if (data) {
            const imagesURLs = data.imagesURLs || []
            const value = data.value || 0
            const limitValue = data.limitValue || 1048576
            //
            const isReachedLimit = Number(value) >= Number(limitValue)

            dispatch(
              ActionCreatorsList.setStorageLimitDataActionCreator(
                value,
                limitValue,
                isReachedLimit
              )
            )

            dispatch(
              ActionCreatorsList.setImagesURLsListActionCreator(imagesURLs)
            )
          }
        })
    }

    setData()

    await axios
      .post(
        "https://us-central1-moneymix-f7423.cloudfunctions.net/GetStorageData",
        {
          userEmail: state.firebase.auth.email,
        }
      )
      .then(() => setData())
  }
}

//
export const getInitialGeneralDataThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()
    const isOnline = getOnlineStatus(state)

    dispatch(getBudgetStatusThunkCreator())
    dispatch(getCurrencyThunkCreator())
    dispatch(getIncomeAndExpensesAmountThunkCreator())
    dispatch(getFullCategoriesListThunkCreator())

    if (state.firebase.auth.email && isOnline) {
      dispatch(getStorageDataThunkCreator())
      firestore
        .collection(state.firebase.auth.email)
        .doc("GeneralInfo")
        .get()
        .then((doc: any) => {
          if (doc.data()) {
            dispatch(
              ActionCreatorsList.setAvatarActionCreator(doc.data().avatar)
            )
          }
        })

      firestore
        .collection(state.firebase.auth.email)
        .doc("GeneralInfo")
        .get()
        .then(async (doc: any) => {
          await AsyncStorage.setItem(
            "PremiumFinishDate",
            doc.data().PremiumFinishDate
          )
        })
    }

    const defaultBill = await AsyncStorage.getItem("defaultBill")
    if (!defaultBill) {
      await AsyncStorage.getItem("normalBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          await AsyncStorage.setItem("defaultBill", JSON.stringify(json[0]))
        })
    }

    dispatch(getPremiumFinishDateThunkCreator())
  }
}

export const scheduleRatingPopupVisibilityThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const lastShownDate = await AsyncStorage.getItem("ratePopupShownDate")

    if (
      lastShownDate &&
      dayjs(lastShownDate as string).isSame(new Date(), "week")
    ) {
    } else if (lastShownDate !== "Block") {
      // setTimeout(async () => {
      //   dispatch(ActionCreatorsList.setRatingPopupVisibilityActionCreator(true))
      //   await AsyncStorage.setItem("ratePopupShownDate", new Date() as any)
      // }, 10000)
    }
  }
}

export const getPremiumFinishDateThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const PremiumFinishDate = await AsyncStorage.getItem("PremiumFinishDate")
    dispatch(
      ActionCreatorsList.setPremiumFinishDateActionCreator(
        PremiumFinishDate as string
      )
    )
  }
}

export const getBudgetStatusThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const user = state.firebase.auth.email
    const budgetEnabled = await AsyncStorage.getItem("budgetEnabled")

    dispatch(
      ActionCreatorsList.setBudgetStatusActionCreator(
        user && budgetEnabled ? JSON.parse(budgetEnabled) : false
      )
    )
  }
}

export const getCurrencyThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const selectedCurrency = await AsyncStorage.getItem("selectedCurrency")

    dispatch(
      ActionCreatorsList.setSelectedCurrencyActionCreator(
        String(selectedCurrency).replace(/[^a-zA-Z ]/g, "") || "RusRuble"
      )
    )
  }
}

export const getIncomeAndExpensesAmountThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    let TotalIncome = 0
    let TotalExpenses = 0

    state.CategoriesGetState.incomeCategoriesList
      .filter((category: any) => !category.archived)
      .map((category: any) => {
        TotalIncome = Number(TotalIncome) + Number(category.price)
      })

    state.CategoriesGetState.expensesCategoriesList
      .filter((category: any) => !category.archived)
      .map((category: any) => {
        TotalExpenses = Number(TotalExpenses) + Number(category.price)
      })

    dispatch(
      ActionCreatorsList.setTotalIncomeAndExpensesActionCreator(
        TotalIncome,
        TotalExpenses
      )
    )
  }
}

export const getProfilesListThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()

    firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .get()
      .then((doc: any) => {
        if (doc.data()) {
          dispatch(
            ActionCreatorsList.setProfilesListActionCreator(
              doc.data().ProfilesList
            )
          )
        }
      })
  }
}

export const getFullCategoriesListThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const FullIncomeCategories = initialCategoriesFilter(state, json, {
            income: true,
          })

          const FullExpensesCategories = initialCategoriesFilter(state, json, {
            income: false,
          })

          const CleanedIncomeCategories = removeCategoriesDuplicates(
            FullIncomeCategories,
            "id"
          )
          const CleanedExpensesCategories = removeCategoriesDuplicates(
            FullExpensesCategories,
            "id"
          )

          dispatch(
            ActionCreatorsList.setFullIncomeAndExpensesCategoriesList(
              CleanedIncomeCategories.filter(
                (category: any) => !category.archived
              ),
              CleanedExpensesCategories.filter(
                (category: any) => !category.archived
              )
            )
          )
        }
      })

    dispatch(getIncomeAndExpensesAmountThunkCreator())
  }
}
