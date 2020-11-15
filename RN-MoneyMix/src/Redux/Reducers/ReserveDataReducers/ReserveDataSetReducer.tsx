//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import axios from "axios"
/////////
import { RestoreDataFromCloudThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"
import { getOnlineStatus } from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const ReserveDataSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default ReserveDataSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Create reserve copy
export const createReserveCopyThunkCreator = (email?: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const isOnline = getOnlineStatus(state)

    const date = String(new Date())
    const userEmail = email ? email : state.firebase.auth.email
    if (userEmail && isOnline) {
      await axios.post(
        "https://us-central1-moneymix-f7423.cloudfunctions.net/CreateReserveDataCopy",
        {
          date,
          userEmail: userEmail,
        }
      )
    }
  }
}

// Remove reserve copy
export const removeReserveCopyThunkCreator = (ID: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firestore = getFirestore()
    const isOnline = getOnlineStatus(state)

    const userEmail = state.firebase.auth.email

    await firestore
      .collection(userEmail)
      .doc("GeneralInfo")
      .update({
        ReservedCopiesList: firestore.FieldValue.arrayRemove(ID),
      })

    if (isOnline) {
      await axios.post(
        "https://us-central1-moneymix-f7423.cloudfunctions.net/RemoveReserveDataCopy",
        {
          ID,
          userEmail,
        }
      )
    }
  }
}

// Apply reserve copy
export const applyReserveCopyThunkCreator = (ID: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = await getFirestore()
    const state = getState()

    // await firestore
    //   .collection(state.firebase.auth.email)
    //   .doc("Profiles")
    //   .delete()

    const profilesNames = await firestore
      .collection(state.firebase.auth.email)
      .doc("ReservedCopies")
      .collection(ID)
      .doc("ProfilesList")
      .get()
      .then((doc: any) => doc.data().ProfilesNames)

    await firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .update({
        ProfilesList: profilesNames,
      })

    await profilesNames.forEach(async (profileName: string) => {
      const snapshot = await firestore
        .collection(state.firebase.auth.email)
        .doc("ReservedCopies")
        .collection(ID)
        .doc("Doc")
        .collection(profileName)
        .get()

      await snapshot.docs.map((doc: any) => {
        firestore
          .collection(state.firebase.auth.email)
          .doc("Profiles")
          .collection(profileName)
          .doc(doc.id)
          .set(doc.data())
      })
    })

    await dispatch(RestoreDataFromCloudThunkCreator())
  }
}
