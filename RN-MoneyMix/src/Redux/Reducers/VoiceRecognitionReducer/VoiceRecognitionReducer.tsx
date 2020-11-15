//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import {
  concat,
  renderBillName,
  renderCategoryTitle,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

////////////////////////////////////////////////////////////////////////

const initialState = {
  recognitionInfo: {
    isIncome: false as boolean,
    bill: {} as any,
    category: {} as any,
    moneyAmount: 0 as number | string,
  },
}

type initialStateType = typeof initialState

// *REDUCER* //
const RecognitionReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_RECOGNITION_INFO") {
    return {
      ...state,
      recognitionInfo: action.recognitionInfo,
    }
  }

  return state
}

export default RecognitionReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setRecognitionDataActionCreator: (recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }) =>
    ({
      type: "SET_RECOGNITION_INFO",
      recognitionInfo,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Recognise text
export const recogniseTextThunkCreator = (text: string, t: any): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    let textVal = text.toLowerCase() as any

    const incomeCategoriesList = state.CategoriesGetState.incomeCategoriesList
    const expensesCategoriesList =
      state.CategoriesGetState.expensesCategoriesList

    const bills = concat(
      state.BillsGetState.normalBillsList,
      state.BillsGetState.debtsBillsList,
      state.BillsGetState.savingsBillsList
    )

    ///////////////////////////////////////////////////////////////

    const containsInArray = (
      str: string,
      substrings: Array<any>,
      searchValue: string
    ) => {
      for (var i = 0; i != substrings.length; i++) {
        var substring = String(substrings[i][searchValue]).toLowerCase()

        if (str.toLowerCase().indexOf(substring) != -1) {
          return substrings[i]
        }

        if (searchValue === "name") {
          var substring = String(
            renderBillName(substrings[i][searchValue], t)
          ).toLowerCase()

          if (str.toLowerCase().indexOf(substring) != -1) {
            return substrings[i]
          }
        } else if (searchValue === "title") {
          var substring = String(
            renderCategoryTitle(substrings[i][searchValue], t, true)
          ).toLowerCase()

          if (str.toLowerCase().indexOf(substring) != -1) {
            return substrings[i]
          }
        }
      }
      return null
    }

    /////////////////////////////////////////////

    let isIncome = false as boolean
    let moneyAmount = 0 as number | string
    let bill = {} as any
    let category = {} as any

    moneyAmount = textVal.match(/\d/g) ? textVal.match(/\d/g).join("") : 0

    if (
      bills &&
      (bills.some((v: any) => textVal.includes(String(v.name).toLowerCase())) ||
        bills.some((v: any) =>
          textVal.includes(String(renderBillName(v.name, t)).toLowerCase())
        ))
    ) {
      bill = containsInArray(textVal, bills, "name") || bills[0]
    }

    if (
      incomeCategoriesList &&
      (incomeCategoriesList.some((v: any) =>
        textVal.includes(String(v.title).toLowerCase())
      ) ||
        incomeCategoriesList.some((v: any) =>
          textVal.includes(
            String(renderCategoryTitle(v.title, t, true)).toLowerCase()
          )
        ))
    ) {
      category =
        containsInArray(textVal, incomeCategoriesList, "title") ||
        incomeCategoriesList[0]
      isIncome = true
    }

    if (
      expensesCategoriesList &&
      (expensesCategoriesList.some((v: any) =>
        textVal.includes(String(v.title).toLowerCase())
      ) ||
        expensesCategoriesList.some((v: any) =>
          textVal.includes(
            String(renderCategoryTitle(v.title, t, true)).toLowerCase()
          )
        ))
    ) {
      category =
        containsInArray(textVal, expensesCategoriesList, "title") ||
        expensesCategoriesList[0]
      isIncome = false
    }

    dispatch(
      ActionCreatorsList.setRecognitionDataActionCreator({
        bill,
        category,
        moneyAmount,
        isIncome,
      })
    )
  }
}
