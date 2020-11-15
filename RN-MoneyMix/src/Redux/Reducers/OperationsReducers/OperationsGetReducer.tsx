//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"

////////////////////////////////////////////////////////////////////////

const initialState = {
  operationsList: [] as Array<any>,
  fullOperationsList: [] as Array<any>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const OperationsGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_OPERATIONS_LIST") {
    return {
      ...state,
      operationsList: action.operationsList,
    }
  }

  if (action.type === "SET_FULL_OPERATIONS_LIST") {
    return {
      ...state,
      fullOperationsList: action.fullOperationsList,
    }
  }

  return state
}

export default OperationsGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setOperationsListActionCreator: (operationsList: Array<any>) =>
    ({
      type: "SET_OPERATIONS_LIST",
      operationsList,
    } as const),

  setFullOperationsListActionCreator: (fullOperationsList: Array<any>) =>
    ({
      type: "SET_FULL_OPERATIONS_LIST",
      fullOperationsList,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Get operations list
export const getOperationsListThunkCreator = (
  selectedFilters: Array<string>
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          dispatch(ActionCreatorsList.setFullOperationsListActionCreator(json))
          if (state.GeneralGetState.DateType === "Infinite") {
            dispatch(ActionCreatorsList.setOperationsListActionCreator(json))
          } else {
            let FilteredOperationsByDate = json.filter(
              (operation: any) =>
                operation.createdAt >=
                  Number(state.GeneralGetState.InitialDate) &&
                operation.createdAt <= Number(state.GeneralGetState.FinalDate)
            )

            if (selectedFilters.length > 0) {
              FilteredOperationsByDate = FilteredOperationsByDate.filter(
                (operation: any) => {
                  return (
                    selectedFilters.includes(
                      operation.bill && operation.bill.name
                    ) ||
                    selectedFilters.includes(operation.operation) ||
                    selectedFilters.includes(operation.category.title) ||
                    selectedFilters.includes(operation.user)
                  )
                }
              )
            }

            dispatch(
              ActionCreatorsList.setOperationsListActionCreator(
                FilteredOperationsByDate
              )
            )
          }
        } else {
          dispatch(ActionCreatorsList.setOperationsListActionCreator([]))
        }
      })
  }
}

// Get custom operations list
export const getCustomOperationsListThunkCreator = (
  searchValue: string,
  isCategory: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (isCategory) {
          let FilteredOperations = json.filter(
            (operation: any) => operation.categoryID === searchValue
          )

          if (state.GeneralGetState.DateType === "Infinite") {
            dispatch(
              ActionCreatorsList.setOperationsListActionCreator(
                FilteredOperations
              )
            )
          } else {
            FilteredOperations = FilteredOperations.filter(
              (operation: any) =>
                operation.createdAt >=
                  Number(state.GeneralGetState.InitialDate) &&
                operation.createdAt <= Number(state.GeneralGetState.FinalDate)
            )

            dispatch(
              ActionCreatorsList.setOperationsListActionCreator(
                FilteredOperations
              )
            )
          }
        } else {
          let FilteredOperations = json.filter(
            (operation: any) => operation.billTitle === searchValue
          )

          dispatch(
            ActionCreatorsList.setOperationsListActionCreator(
              FilteredOperations
            )
          )
        }
      })
  }
}
