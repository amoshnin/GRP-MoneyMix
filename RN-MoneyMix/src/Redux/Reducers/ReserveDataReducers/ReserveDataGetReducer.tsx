//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"

////////////////////////////////////////////////////////////////////////

const initialState = {
  ReservedCopiesList: [] as Array<string>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const ReserveDataGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_RESERVED_COPIES_LIST") {
    return {
      ...state,
      ReservedCopiesList: action.reservedCopiesList,
    }
  }

  return state
}

export default ReserveDataGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setReservedCopiesListActionCreator: (reservedCopiesList: Array<any>) =>
    ({
      type: "SET_RESERVED_COPIES_LIST",
      reservedCopiesList,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Get reserved copies
export const getReservedCopiesListThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firestore = await getFirestore()

    firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .onSnapshot((doc: any) => {
        if (doc.data()) {
          dispatch(
            ActionCreatorsList.setReservedCopiesListActionCreator(
              doc.data().ReservedCopiesList || []
            )
          )
        }
      })
  }
}
