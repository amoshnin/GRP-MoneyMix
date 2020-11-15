//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
import AsyncStorage from "@react-native-community/async-storage"
import dayjs from "dayjs"

import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"
import {
  getCategoriesListsThunkCreator,
  getImporantBillsThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getIncomeAndExpensesAmountThunkCreator,
  getStorageDataThunkCreator,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import {
  getBillsListsThunkCreator,
  getBillsMoneyAmountThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsGetReducer"
import { getOperationsListThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const MoneyTransferReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default MoneyTransferReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const CategoryMoneyTransferThunkCreator = (
  isIncome: boolean,
  categoryData: any,
  selectedSubCategory: any,
  selectedBill: any,
  newMoneyAmount: string,
  comment: string,
  selectedImages: Array<any>,
  selectedDate: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const storage = firebase.storage()
    const state = getState()

    const setData = () => {
      dispatch(getCategoriesListsThunkCreator())
      dispatch(getIncomeAndExpensesAmountThunkCreator())
      dispatch(getBillsListsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
      dispatch(getImporantBillsThunkCreator())
      dispatch(RestoreDataFromDeviceThunkCreator())
    }

    const localUserName = await AsyncStorage.getItem("localUserName")

    const renderSubCategories = () => {
      if (selectedSubCategory) {
        return [
          {
            ...selectedSubCategory,
            price: newMoneyAmount,
          },
        ]
      } else {
        return []
      }
    }

    let OperationObject = {
      isIncome: isIncome,
      billTitle: selectedBill.name,
      bill: selectedBill,
      moneyAmount: newMoneyAmount,
      comment: comment,
      category: {
        ...categoryData,
        subCategories: renderSubCategories(),
        budget: 0,
        price: selectedSubCategory ? 0 : newMoneyAmount,
      },
      createdAt: new Date(selectedDate).getTime(),
      PhotosURLsList: [] as Array<any>,
      user: localUserName,
      id: generateRandomID(),
      categoryID: categoryData.id,
      operation: isIncome ? "Income" : "Expenses",
      subCategory: selectedSubCategory || null,
    }

    if (selectedImages.length > 0) {
      let PhotosURLsList = [] as any

      const CallBack = async () => {
        await AsyncStorage.getItem("operations")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const newObject = {
              ...OperationObject,
              PhotosURLsList: PhotosURLsList,
            }

            await AsyncStorage.setItem(
              "operations",
              JSON.stringify(json ? [...json, newObject] : [newObject])
            )

            setData()
            dispatch(getStorageDataThunkCreator())
          })
      }

      const userEmail = state.firebase.auth.email

      selectedImages.forEach(async (selectedImage) => {
        const randomPhotoID = firestore.collection(userEmail).doc().id
        const storageRef = storage.ref(
          `${userEmail}/operations/${randomPhotoID}`
        )
        await storageRef.put(selectedImage)
        PhotosURLsList = [...PhotosURLsList, `${randomPhotoID}_1350x1350`]
        if (selectedImages.length === PhotosURLsList.length) {
          CallBack()
        }
      })
    } else {
      const operationsList = await AsyncStorage.getItem("operations")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => json)

      await AsyncStorage.setItem(
        "operations",
        JSON.stringify(
          operationsList
            ? [...operationsList, OperationObject]
            : [OperationObject]
        )
      )
    }

    if (selectedBill.type === "NormalBill") {
      const CleanedBillsArray = state.BillsGetState.normalBillsList.filter(
        (bill: any) => {
          return bill.name !== selectedBill.name
        }
      )
      await AsyncStorage.setItem(
        "normalBillsList",
        JSON.stringify([
          ...CleanedBillsArray,
          {
            ...selectedBill,
            accountBalance: isIncome
              ? Number(selectedBill.accountBalance) + Number(newMoneyAmount)
              : Number(selectedBill.accountBalance) - Number(newMoneyAmount),
          },
        ])
      )
    } else if (selectedBill.type === "DebtBill") {
      const CleanedBillsArray = state.BillsGetState.debtsBillsList.filter(
        (bill: any) => {
          return bill.name !== selectedBill.name
        }
      )
      await AsyncStorage.setItem(
        "debtsBillsList",
        JSON.stringify([
          ...CleanedBillsArray,
          {
            ...selectedBill,
            iOwe: isIncome
              ? Number(selectedBill.iOwe) + Number(newMoneyAmount)
              : Number(selectedBill.iOwe) - Number(newMoneyAmount),
          },
        ])
      )
    } else if (selectedBill.type === "SavingsBill") {
      const CleanedBillsArray = state.BillsGetState.savingsBillsList.filter(
        (bill: any) => {
          return bill.name !== selectedBill.name
        }
      )
      await AsyncStorage.setItem(
        "savingsBillsList",
        JSON.stringify([
          ...CleanedBillsArray,
          {
            ...selectedBill,
            accountBalance: isIncome
              ? Number(selectedBill.accountBalance) + Number(newMoneyAmount)
              : Number(selectedBill.accountBalance) - Number(newMoneyAmount),
          },
        ])
      )
    }

    await setData()
  }
}

export const BillsMoneyTransferThunkCreator = (
  firstBillData: any,
  sendingBillData: any,
  newMoneyAmount: string,
  comment: string,
  selectedImages: Array<any>,
  selectedDate: Date
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const state = getState()

    const userEmail = state.firebase.auth.email
    const localUserName = await AsyncStorage.getItem("localUserName")

    if (firstBillData.type === "NormalBill") {
      await AsyncStorage.getItem("normalBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const CleanedBillsArray = json.filter((bill: any) => {
            return bill.name !== firstBillData.name
          })

          await AsyncStorage.setItem(
            "normalBillsList",
            JSON.stringify([
              ...CleanedBillsArray,
              {
                ...firstBillData,
                accountBalance:
                  Number(firstBillData.accountBalance) - Number(newMoneyAmount),
              },
            ])
          )
        })
    } else if (firstBillData.type === "DebtBill") {
      await AsyncStorage.getItem("debtsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const CleanedBillsArray = json.filter((bill: any) => {
            return bill.name !== firstBillData.name
          })

          await AsyncStorage.setItem(
            "debtsBillsList",
            JSON.stringify([
              ...CleanedBillsArray,
              {
                ...firstBillData,
                iOwe: Number(firstBillData.iOwe) - Number(newMoneyAmount),
              },
            ])
          )
        })
    } else if (firstBillData.type === "SavingsBill") {
      await AsyncStorage.getItem("savingsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const CleanedBillsArray = json.filter((bill: any) => {
            return bill.name !== firstBillData.name
          })

          await AsyncStorage.setItem(
            "savingsBillsList",
            JSON.stringify([
              ...CleanedBillsArray,
              {
                ...firstBillData,
                accountBalance:
                  Number(firstBillData.accountBalance) - Number(newMoneyAmount),
              },
            ])
          )
        })
    }

    if (sendingBillData.type === "NormalBill") {
      await AsyncStorage.getItem("normalBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const CleanedBillsArray = json.filter((bill: any) => {
            return bill.name !== sendingBillData.name
          })

          await AsyncStorage.setItem(
            "normalBillsList",
            JSON.stringify([
              ...CleanedBillsArray,
              {
                ...sendingBillData,
                accountBalance:
                  Number(sendingBillData.accountBalance) +
                  Number(newMoneyAmount),
              },
            ])
          )
        })
    } else if (sendingBillData.type === "DebtBill") {
      await AsyncStorage.getItem("debtsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const CleanedBillsArray = json.filter((bill: any) => {
            return bill.name !== sendingBillData.name
          })

          await AsyncStorage.setItem(
            "debtsBillsList",
            JSON.stringify([
              ...CleanedBillsArray,
              {
                ...sendingBillData,
                iOwe: Number(sendingBillData.iOwe) + Number(newMoneyAmount),
              },
            ])
          )
        })
    } else if (sendingBillData.type === "SavingsBill") {
      await AsyncStorage.getItem("savingsBillsList")
        .then((req: any) => JSON.parse(req))
        .then(async (json) => {
          const CleanedBillsArray = json.filter((bill: any) => {
            return bill.name !== sendingBillData.name
          })

          await AsyncStorage.setItem(
            "savingsBillsList",
            JSON.stringify([
              ...CleanedBillsArray,
              {
                ...sendingBillData,
                accountBalance:
                  Number(sendingBillData.accountBalance) +
                  Number(newMoneyAmount),
              },
            ])
          )
        })
    }

    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json || [])

    let OperationObject = {
      isIncome: true,
      billTitle: firstBillData.name,
      bill: firstBillData,
      moneyAmount: newMoneyAmount,
      comment: comment,
      category: {
        price: newMoneyAmount,
        title: sendingBillData.name,
        icon: sendingBillData.icon,
        color: "#674ABE",
        type: sendingBillData.type,
      },
      createdAt: new Date(selectedDate).getTime(),
      id: generateRandomID(),
      operation: "Transaction",
      user: localUserName,
    }

    if (selectedImages.length > 0) {
      const storage = firebase.storage()
      let PhotosURLsList = [] as any

      const CallBack = async () => {
        const newObject = {
          ...OperationObject,
          PhotosURLsList: PhotosURLsList,
        }

        await AsyncStorage.setItem(
          "operations",
          JSON.stringify(operations ? [...operations, newObject] : [newObject])
        )

        dispatch(getStorageDataThunkCreator())
      }

      selectedImages.forEach(async (selectedImage) => {
        const randomPhotoID = firestore.collection(userEmail).doc().id
        const storageRef = storage.ref(
          `${userEmail}/operations/${randomPhotoID}`
        )
        await storageRef.put(selectedImage)
        PhotosURLsList = [...PhotosURLsList, `${randomPhotoID}_1350x1350`]
        if (selectedImages.length === PhotosURLsList.length) {
          CallBack()
        }
      })
    } else {
      await AsyncStorage.setItem(
        "operations",
        JSON.stringify(
          operations ? [...operations, OperationObject] : [OperationObject]
        )
      )
    }

    dispatch(getOperationsListThunkCreator([]))
    dispatch(getBillsListsThunkCreator())
    dispatch(getBillsMoneyAmountThunkCreator())
    dispatch(getImporantBillsThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

export const MoneyBillsRefillBalanceThunkCreator = (
  billData: any,
  newBalance: string,
  onlyOperation?: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    if (!onlyOperation) {
      if (billData.type === "NormalBill") {
        await AsyncStorage.getItem("normalBillsList")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const CleanedBillsArray = json.filter((bill: any) => {
              return bill.name !== billData.name
            })

            await AsyncStorage.setItem(
              "normalBillsList",
              JSON.stringify([
                ...CleanedBillsArray,
                {
                  ...billData,
                  accountBalance: Number(newBalance),
                },
              ])
            )
          })
      } else if (billData.type === "DebtBill") {
        await AsyncStorage.getItem("debtsBillsList")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const CleanedBillsArray = json.filter((bill: any) => {
              return bill.name !== billData.name
            })

            await AsyncStorage.setItem(
              "debtsBillsList",
              JSON.stringify([
                ...CleanedBillsArray,
                {
                  ...billData,
                  iOwe: Number(newBalance),
                },
              ])
            )
          })
      } else if (billData.type === "SavingsBill") {
        await AsyncStorage.getItem("savingsBillsList")
          .then((req: any) => JSON.parse(req))
          .then(async (json) => {
            const CleanedBillsArray = json.filter((bill: any) => {
              return bill.name !== billData.name
            })
            await AsyncStorage.setItem(
              "savingsBillsList",
              JSON.stringify([
                ...CleanedBillsArray,
                {
                  ...billData,
                  accountBalance: Number(newBalance),
                },
              ])
            )
          })
      }

      dispatch(getBillsListsThunkCreator())
      dispatch(getImporantBillsThunkCreator())
      dispatch(getBillsMoneyAmountThunkCreator())
    }

    const localUserName = await AsyncStorage.getItem("localUserName")
    const moneyAmount =
      billData.type === "DebtBill"
        ? Number(newBalance) - Number(billData.iOwe)
        : Number(newBalance) - Number(billData.accountBalance)
    const isIncome =
      billData.type === "DebtBill"
        ? (Number(billData.iOwe) < Number(newBalance) && true) ||
          Number(billData.iOwe) === 0
        : (Number(billData.accountBalance) < Number(newBalance) && true) ||
          (Number(billData.accountBalance) === 0 && true)

    let OperationObject = {
      isIncome: isIncome,
      billTitle: billData.name,
      bill: billData,
      moneyAmount: moneyAmount,
      comment: null,
      category: {
        price: billData.accountBalance || 0,
        icon: "unknown",
      },
      createdAt: new Date(dayjs() as any).getTime(),
      PhotosURLsList: [] as Array<any>,
      user: localUserName,
      id: generateRandomID(),
      icon: null,
      operation: "Balance",
    }

    const operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    await AsyncStorage.setItem(
      "operations",
      JSON.stringify(
        operations ? [...operations, OperationObject] : [OperationObject]
      )
    )

    dispatch(getOperationsListThunkCreator([]))
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}
