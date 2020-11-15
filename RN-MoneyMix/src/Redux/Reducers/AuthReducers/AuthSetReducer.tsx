//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"

import { getPremiumFinishDateThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { createReserveCopyThunkCreator } from "~/Redux/Reducers/ReserveDataReducers/ReserveDataSetReducer"
import { setStorageLimitThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralSetReducer"

////////////////////////////////////////////////////////////////////////

const initialState = {
  LoginResponse: null as string | null,
  ResetPassResponseData: {
    popupVisible: false as boolean,
    positive: false as boolean,
  },
}

type initialStateType = typeof initialState

// *REDUCER* //
const AuthSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_LOGIN_RESPONSE") {
    return {
      ...state,
      LoginResponse: action.loginResponse,
    }
  }

  if (action.type === "SET_RESET_PASS_RESPONSE_DATA") {
    return {
      ...state,
      ResetPassResponseData: action.responseData,
    }
  }

  return state
}

export default AuthSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setLoginResponseActionCreator: (loginResponse: string | null) =>
    ({
      type: "SET_LOGIN_RESPONSE",
      loginResponse,
    } as const),

  setResetPassResponseDataActionCreator: (responseData: {
    popupVisible: boolean
    positive: boolean
  }) =>
    ({
      type: "SET_RESET_PASS_RESPONSE_DATA",
      responseData,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Register user
export const RegisterUserThunkCreatior = (
  email: string,
  password: string,
  PremiumFinishDate: string | null,
  productId: string,
  userInfo: {
    avatarURL: string | null
    name: string | null
    email: string | null
  }
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    email = email.toLocaleLowerCase()

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await AsyncStorage.setItem("selectedProfile", "General")
    userInfo.name &&
      (await AsyncStorage.setItem("localUserName", userInfo.name))

    await AsyncStorage.setItem("PremiumFinishDate", PremiumFinishDate as string)

    await firestore
      .collection(email)
      .doc("GeneralInfo")
      .set({
        Email: email,
        PremiumFinishDate: PremiumFinishDate,
        PremiumProductId: productId,
        SecretCode: null,
        ProfilesList: ["General"],
        avatar: userInfo.avatarURL ? userInfo.avatarURL : null,
      })

    const operationsList = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => (json ? json : []))

    await firestore
      .collection(email)
      .doc("Profiles")
      .collection("General")
      .doc("operations")
      .set({
        operations: operationsList || [],
      })

    const selectedCurrency = await AsyncStorage.getItem("selectedCurrency")
    const importantBills = await AsyncStorage.getItem("importantBills")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    await firestore
      .collection(email)
      .doc("Profiles")
      .collection("General")
      .doc("GeneralInfo")
      .set({
        budgetEnabled: false,
        selectedCurrency: selectedCurrency
          ? selectedCurrency.replace(/[^a-zA-Z ]/g, "")
          : "RusRuble",
        importantBills: importantBills || [
          {
            type: "Cash",
            name: "Cash",
          },
          {
            type: "Card",
            name: "Card",
          },
        ],
      })

    const normalBillsList = await AsyncStorage.getItem("normalBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json && json)

    const debtsBillsList = await AsyncStorage.getItem("debtsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json && json)

    const savingsBillsList = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json && json)

    await firestore
      .collection(email)
      .doc("Profiles")
      .collection("General")
      .doc("billsList")
      .set({
        normalBillsList: normalBillsList || [],
        debtsBillsList: debtsBillsList || [],
        savingsBillsList: savingsBillsList || [],
      })

    dispatch(setStorageLimitThunkCreator(String(1), email))
    dispatch(getPremiumFinishDateThunkCreator())
  }
}

// Login User
export const LoginUserThunkCreatior = (
  email: string,
  password: string,
  navigation: any
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    email = email.toLocaleLowerCase().replace(" ", "")

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await firestore
          .collection(email)
          .doc("GeneralInfo")
          .get()
          .then(async (doc: { data: any }) => {
            const profiles = await doc.data().ProfilesList
            await AsyncStorage.setItem(
              "selectedProfile",
              profiles[0] || "General"
            )

            await AsyncStorage.setItem(
              "PremiumFinishDate",
              doc.data().PremiumFinishDate
            )

            await AsyncStorage.setItem(
              "PremiumProductId",
              doc.data().PremiumProductId
            )
          })

        navigation.navigate("RestoreDataScreen")
        dispatch(ActionCreatorsList.setLoginResponseActionCreator(null))
        await dispatch(createReserveCopyThunkCreator(email))

        await dispatch(getPremiumFinishDateThunkCreator())
      })
      .catch((error: any) => {
        dispatch(ActionCreatorsList.setLoginResponseActionCreator("Error"))
      })

    await dispatch(getPremiumFinishDateThunkCreator())
  }
}

// Logout User
export const LogoutUserThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firebase = getFirebase()

    if (state.firebase.auth.email) {
      await firebase.auth().signOut()
    }
  }
}

// Send reset password email
export const sendResetPasswordEmailThunkCreator = (
  emailAddress: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    var auth = firebase.auth()

    auth
      .sendPasswordResetEmail(emailAddress)
      .then((res: any) => {
        dispatch(
          ActionCreatorsList.setResetPassResponseDataActionCreator({
            popupVisible: true,
            positive: true,
          })
        )
      })
      .catch((error: any) => {
        dispatch(
          ActionCreatorsList.setResetPassResponseDataActionCreator({
            popupVisible: true,
            positive: false,
          })
        )
      })
  }
}

// Delete user
export const deleteUserThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const state = getState()

    firestore
      .collection(state.firebase.auth.email)
      .get()
      .then((res: any) =>
        res.docs.map((doc: any) => {
          firestore.collection(state.firebase.auth.email).doc(doc.id).delete()
        })
      )
      .then(() => {
        const ref = firebase.storage().ref(state.firebase.auth.email)
        ref.delete().then(() => {
          const user = firebase.auth().currentUser
          user.delete()
        })
      })
  }
}

// Set new subscription data
export const setNewSubscriptionDataThunkCreator = (
  PremiumFinishDate: string | null,
  productId: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const firestore = getFirestore()

    await AsyncStorage.setItem("PremiumFinishDate", PremiumFinishDate as string)

    await firestore
      .collection(state.firebase.auth.email)
      .doc("GeneralInfo")
      .update({
        PremiumFinishDate: PremiumFinishDate,
        PremiumProductId: productId,
      })

    dispatch(getPremiumFinishDateThunkCreator())
  }
}
