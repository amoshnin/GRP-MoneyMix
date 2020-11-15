//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import RNFetchBlob from "rn-fetch-blob"
import { PermissionsAndroid } from "react-native"
import axios from "axios"
import dayjs from "dayjs"

import { serverUrl } from "~/Components/Shared/Helpers/Constants/GeneralInfo"
import {
  renderBillName,
  renderCategoryTitle,
  concat,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { deleteImagesFromStorage } from "~/Components/Shared/Helpers/Functions/ReducersFunctions"

import { getCurrencyThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"
import {
  getInitialGeneralDataThunkCreator,
  getIncomeAndExpensesAmountThunkCreator,
  getPremiumFinishDateThunkCreator,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import {
  getCategoriesListsThunkCreator,
  getImporantBillsThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { createReserveCopyThunkCreator } from "~/Redux/Reducers/ReserveDataReducers/ReserveDataSetReducer"
////////////////
import {
  getSelectedCurrency,
  getOnlineStatus,
} from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const GeneralSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default GeneralSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const setCurrencyThunkCreator = (newCurrency: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.setItem("selectedCurrency", newCurrency)
    dispatch(getCurrencyThunkCreator())

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const setNewAvatarThunkCreator = (newAvatarBlob: Blob): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const storage = firebase.storage()
    const state = getState()
    const isOnline = getOnlineStatus(state)

    const delay = (t: any) => {
      return new Promise((resolve) => {
        setTimeout(resolve, t)
      })
    }

    const keepTrying = (triesRemaining: any) => {
      const imageStorageRef = storage.ref(
        `${state.firebase.auth.email}/general/avatar_1350x1350`
      )

      if (triesRemaining < 0) {
        return Promise.reject("out of tries")
      }

      return imageStorageRef
        .getDownloadURL()
        .then((url: string) => {
          return url
        })
        .catch((error: any) => {
          switch (error.code) {
            case "storage/object-not-found":
              return delay(2000).then(() => {
                return keepTrying(triesRemaining - 1)
              })
            default:
              console.log(error)
              return Promise.reject(error)
          }
        })
    }

    if (state.firebase.auth.email && isOnline) {
      const storageRef = storage.ref(
        `${state.firebase.auth.email}/general/avatar`
      )
      await storageRef.put(newAvatarBlob)
      await keepTrying(15).then(async (url: string) => {
        await firestore
          .collection(state.firebase.auth.email)
          .doc("GeneralInfo")
          .update({
            avatar: url,
          })
      })
    }
  }
}

export const setBudgetStatusThunkCreator = (
  budgetEnabledStatus: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()

    const selectedProfile = await AsyncStorage.getItem("selectedProfile")

    firestore
      .collection(state.firebase.auth.email)
      .doc("Profiles")
      .collection(selectedProfile)
      .doc("GeneralInfo")
      .update({
        budgetEnabled: budgetEnabledStatus,
      })
  }
}

export const deleteAllDataThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()
    const isOnline = getOnlineStatus(state)

    dispatch(createReserveCopyThunkCreator())

    const setData = () => {
      dispatch(getPremiumFinishDateThunkCreator())
      dispatch(getCategoriesListsThunkCreator())
      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getInitialGeneralDataThunkCreator())
      dispatch(getOperationsListThunkCreator([]))
      dispatch(getImporantBillsThunkCreator())
      dispatch(getIncomeAndExpensesAmountThunkCreator())
    }

    await AsyncStorage.getAllKeys()
      .then(async (keys) => {
        const filteredKeys = keys.filter((key: string) => {
          if (
            key !== "appUsed" &&
            key !== "selectedCurrency" &&
            key !== "selectedProfile" &&
            key !== "selectedLanguage" &&
            key !== "PremiumFinishDate"
          ) {
            return key
          }
        })

        await AsyncStorage.multiRemove(filteredKeys)
      })
      .then(async () => {
        await AsyncStorage.setItem(
          "normalBillsList",
          JSON.stringify([
            {
              name: "Cash",
              accountBalance: 0,
              type: "NormalBill",
              icon: "dollar",
              takeIntoTotalBalance: true,
            },
            {
              name: "Card",
              type: "NormalBill",
              accountBalance: 0,
              icon: "credit-card",
              takeIntoTotalBalance: true,
            },
          ])
        )

        setData()

        await AsyncStorage.setItem(
          "importantBills",
          JSON.stringify([
            { type: "Cash", name: "Cash" },
            { type: "Card", name: "Card" },
          ])
        )

        setData()

        if (state.firebase.auth.email && isOnline) {
          const selectedProfile = await AsyncStorage.getItem("selectedProfile")
          const selectedCurrency = await AsyncStorage.getItem(
            "selectedCurrency"
          )
          await axios.post(`${serverUrl}/DeleteAllDataFunction`, {
            userEmail: state.firebase.auth.email,
            selectedProfile,
            selectedCurrency: selectedCurrency
              ? selectedCurrency.replace(/[^a-zA-Z ]/g, "")
              : "RusRuble",
          })
        }
      })
  }
}

export const setStorageLimitThunkCreator = (
  newStorageLimit: string,
  email?: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore()
    const state = getState()
    const renderStorageLimit = () => {
      const gbValue = newStorageLimit.replace("storage", "")
      return Number(gbValue) * 1048576
    }

    const userEmail = email ? email : state.firebase.auth.email

    firestore
      .collection(userEmail)
      .doc("StorageUsage")
      .get()
      .then((doc: any) => {
        if (doc.data()) {
          firestore.collection(userEmail).doc("StorageUsage").update({
            limitValue: renderStorageLimit(),
          })
        } else {
          firestore.collection(userEmail).doc("StorageUsage").set({
            limitValue: renderStorageLimit(),
          })
        }
      })
  }
}

export const deleteImagesFromStorageThunkCreator = (
  imagesIDs: Array<string>
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const state = getState()
    const storage = firebase.storage()

    deleteImagesFromStorage(
      imagesIDs,
      state.firebase.auth.email as string,
      storage
    )

    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then((json) => json && json)

    const newOperations = await operations.map((operation: any) => {
      if (
        operation.PhotosURLsList &&
        Object.values(operation.PhotosURLsList).length > 0
      ) {
        return {
          ...operation,
          PhotosURLsList: operation.PhotosURLsList.filter(
            (imageStorageID: string) => !imagesIDs.includes(imageStorageID)
          ),
        }
      } else {
        return operation
      }
    })

    await AsyncStorage.setItem("operations", JSON.stringify(newOperations))
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const downloadSVGThunkCreator = (t: any): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const state = getState()

    const operationsInitArr = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) =>
        json ? json.filter((operation: any) => operation.createdAt) : []
      )

    const normalBillsInitArr = await AsyncStorage.getItem("normalBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json || [])

    const debtsBillsInitArr = await AsyncStorage.getItem("debtsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json || [])

    const savingsBillsInitArr = await AsyncStorage.getItem("savingsBillsList")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json || [])

    const selectedCurrency = getSelectedCurrency(state)

    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let operations = [] as Array<Array<any>>
      let normalBills = [] as Array<Array<any>>
      let debtsBills = [] as Array<Array<any>>
      let savingsBills = [] as Array<Array<any>>

      await operationsInitArr.map((operation: any) => {
        operations.push([
          `${dayjs(operation.createdAt).format("DD")} ${t(
            `Header.Months.${dayjs(operation.createdAt).format("MMMM")}`
          )} ${dayjs(operation.createdAt).format("YYYY")}`,
          operation.operation,
          renderBillName(operation.bill.name, t),
          renderCategoryTitle(operation.category.title, t, true),
          operation.moneyAmount,
          selectedCurrency,
          operation.comment || "",
        ])
      })

      normalBillsInitArr.map((bill: any) => {
        normalBills.push([
          renderBillName(bill.name, t),
          bill.accountBalance,
          selectedCurrency,
        ])
      })

      debtsBillsInitArr.map((bill: any) => {
        debtsBills.push([
          renderBillName(bill.name, t),
          Number(bill.totalDebtSum) - Number(bill.iOwe),
          selectedCurrency,
        ])
      })

      savingsBillsInitArr.map((bill: any) => {
        savingsBills.push([
          renderBillName(bill.name, t),
          bill.accountBalance,
          selectedCurrency,
        ])
      })

      //////////////////////////////////////////////////////////////////
      const operationsHeader =
        "DATE,TYPE,FROM BILL,TO BILL/CATEGORY,SUM,CURRENCY,COMMENT\n"

      const operationsData = operations
        .map(
          (d) =>
            `${d[0]},${d[1]},${d[2]},${d[3]},${d[4]},${d[5]},${d[6]},${d[7]}\n`
        )
        .join("")
      //
      const billsHeader = "TITLE, BALANCE, CURRENCY"
      const normalBillsData = normalBills
        .map((d) => `${d[0]},${d[1]},${d[2]}\n`)
        .join("")
      const debtsBillsData = debtsBills
        .map((d) => `${d[0]},${d[1]},${d[2]}\n`)
        .join("")
      const savingsBillsData = savingsBills
        .map((d) => `${d[0]},${d[1]},${d[2]}\n`)
        .join("")

      const csvString = `${operationsHeader}${operationsData}\n\n${billsHeader}\n${`${t(
        "BillsScreen.CreateNewBillPopup.NormalBill"
      )} ${t("BillsScreen.Bills")}`}\n${normalBillsData}${`${t(
        "BillsScreen.CreateNewBillPopup.DebtBill"
      )} ${t("BillsScreen.Bills")}`}\n${debtsBillsData}${`${t(
        "BillsScreen.CreateNewBillPopup.SavingsBill"
      )} ${t("BillsScreen.Bills")}`}\n${savingsBillsData}`

      // write the current list of answers to a local csv file
      const pathToWrite = `${
        RNFetchBlob.fs.dirs.DownloadDir
      }/MoneyMix-Report-${dayjs().format("DD:MM:YYYY-hh:mm")}.csv`

      RNFetchBlob.fs
        .writeFile(pathToWrite, csvString, "utf8")
        .then(() => {})
        .catch((error) => {})
    }
  }
}
