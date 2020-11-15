//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"

import { getTemplatesArrayThunkCreator } from "~/Redux/Reducers/TemplatesReducers/TemplatesGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"

import { TemplateItemType } from "~/Redux/Types/TemplatesTypes"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const TemplatesGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default TemplatesGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const addNewTemplateThunkCreator = (
  newTemplate: TemplateItemType
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("templates")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          await AsyncStorage.setItem(
            "templates",
            JSON.stringify([...json, newTemplate])
          )
        } else {
          await AsyncStorage.setItem("templates", JSON.stringify([newTemplate]))
        }
      })

    dispatch(getTemplatesArrayThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const deleteTemplateThunkCreator = (template: {
  templateTitle: string
  isIncome: boolean
  category: any
  bill: any
  newMoneyAmount: number | string
  comment: string
  selectedImages: Array<any>
  selectedSubCategories: Array<any>
  ID: string
}): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("templates")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        const FilteredArray = json.filter((obj: any) => obj.ID !== template.ID)
        await AsyncStorage.setItem("templates", JSON.stringify(FilteredArray))
      })

    dispatch(getTemplatesArrayThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}
