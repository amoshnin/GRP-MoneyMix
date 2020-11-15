// REDUX IMPORTS //
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"

// FIREBASE IMPORTS //
import { getFirebase } from "react-redux-firebase"
import { reduxFirestore, getFirestore } from "redux-firestore"
import FirebaseConfig from "~/API/FirebaseConfig"

import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

// REDUCERS IMPORTS //
import GeneralGetReducer from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import GeneralSetReducer from "~/Redux/Reducers/GeneralReducers/GeneralSetReducer"
import CategoriesGetReducer from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import BillsGetReducer from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import OperationsGetReducer from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import BudgetGetReducer from "~/Redux/Reducers/BudgetReducers/BudgetGetReducer"
import AuthSetReducer from "~/Redux/Reducers/AuthReducers/AuthSetReducer"
import PremiumSetReducer from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"

import TemplatesGetReducer from "~/Redux/Reducers/TemplatesReducers/TemplatesGetReducer"
import BankSMSGetReducer from "~/Redux/Reducers/BankSMSReducers/BankSMSGetReducer"
import VoiceRecognitionReducer from "~/Redux/Reducers/VoiceRecognitionReducer/VoiceRecognitionReducer"
import ReserveDataGetReducer from "~/Redux/Reducers/ReserveDataReducers/ReserveDataGetReducer"

////////////////////////////////////////////////////////////////////////

let reducers = combineReducers({
  // General
  GeneralGetState: GeneralGetReducer,
  GeneralSetState: GeneralSetReducer,
  // Categories
  CategoriesGetState: CategoriesGetReducer,
  // Bills
  BillsGetState: BillsGetReducer,
  // Operations
  OperationsGetState: OperationsGetReducer,
  //Budget
  BudgetGetState: BudgetGetReducer,
  // Auth
  AuthSetState: AuthSetReducer,
  // Premium
  PremiumSetState: PremiumSetReducer,

  // Templates
  TemplatesGetState: TemplatesGetReducer,
  // Banks SMS
  BankSMSGetState: BankSMSGetReducer,
  // Voice recognitions
  VoiceRecognitionState: VoiceRecognitionReducer,
  // Reserved data
  ReserveDataGetState: ReserveDataGetReducer,

  // Firebase //
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

type reducersType = typeof reducers
export type AppStateType = ReturnType<reducersType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>

const composeEnhancers = compose
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ getFirestore, getFirebase })
    ),
    reduxFirestore(FirebaseConfig)
  )
)

export default store
