//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"

import AsyncStorage from "@react-native-community/async-storage"
import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"

import {
  getCategoriesListsThunkCreator,
  getImporantBillsThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import {
  getIncomeAndExpensesAmountThunkCreator,
  getFullCategoriesListThunkCreator,
} from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { DeleteOperationsThunkCreator } from "~/Redux/Reducers/OperationsReducers/OperationsSetReducer"
import { RestoreDataFromDeviceThunkCreator } from "~/Redux/Reducers/PremiumReducers/PremiumSetReducer"
import { getTemplatesArrayThunkCreator } from "~/Redux/Reducers/TemplatesReducers/TemplatesGetReducer"
import { TemplateItemType } from "~/Redux/Types/TemplatesTypes"

////////////////////////////////////////////////////////////////////////

const initialState = {}

type initialStateType = typeof initialState

// *REDUCER* //
const CategoriesReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default CategoriesReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Submit new category
export const SubmitNewCategoryThunkCreator = (
  isIncome: boolean,
  newCategoryTitle: string,
  selectedIcon: string,
  selectedColor: string,
  archived: boolean,
  subCategories: Array<any>,
  deletingSubCategories: Array<any>,
  id: string
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const CategoryObject = {
      icon: selectedIcon,
      color: selectedColor || null,
      title: newCategoryTitle,
      price: 0,
      budget: 0,
      subCategories: subCategories,
      id: id,
      archived: archived,
    }

    let OperationObject = {
      isIncome: isIncome,
      bill: null,
      moneyAmount: null,
      comment: null,
      category: CategoryObject,
      createdAt: null,
      image: null,
      imageStorageID: null,
      user: null,
      id: generateRandomID(),
      categoryID: id,
    }

    let operations = await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    let currentCategorySubCategories = [] as Array<any>
    if (operations && operations.length > 0) {
      if (deletingSubCategories.length > 0) {
        operations = await operations.filter(
          (operation: any) =>
            operation.category &&
            operation.category.subCategories &&
            operation.category.subCategories.every(
              (subCategory: any) =>
                !deletingSubCategories.includes(subCategory.id)
            )
        )
      }

      await operations
        .filter((operation: any) => operation.category.id === id)
        .map((operation: any) => {
          if (
            operation.category.subCategories &&
            operation.category.subCategories.length > 0
          ) {
            currentCategorySubCategories = [
              ...currentCategorySubCategories,
              ...operation.category.subCategories,
            ]
          }
        })

      const renewdOperations = await operations
        .filter((operation: any) => operation.category.id === id)
        .map((operation: any) => {
          if (
            operation.subCategory &&
            Object.values(operation.subCategory).length > 0
          ) {
            const isChange = subCategories.some(
              (e: any) => e.id === operation.subCategory.id
            )

            const obj = subCategories.filter(
              (e) => e.id === operation.subCategory.id
            )[0]

            if (isChange) {
              return {
                ...operation,
                category: {
                  ...operation.category,
                  icon: selectedIcon,
                  color: selectedColor,
                  title: newCategoryTitle,
                },
                subCategory: obj,
              }
            } else {
              return {
                ...operation,
                category: {
                  ...operation.category,
                  icon: selectedIcon,
                  color: selectedColor,
                  title: newCategoryTitle,
                },
              }
            }
          } else {
            return {
              ...operation,
              category: {
                ...operation.category,
                icon: selectedIcon,
                color: selectedColor,
                title: newCategoryTitle,
              },
            }
          }
        })

      const filteredOperations = await operations.filter(
        (operation: any) => operation.category.id !== id
      )

      const newArray = [
        ...renewdOperations,
        ...filteredOperations,
        OperationObject,
      ]
      await AsyncStorage.setItem("operations", JSON.stringify(newArray))
    } else {
      await AsyncStorage.setItem(
        "operations",
        JSON.stringify([OperationObject])
      )
    }

    dispatch(getCategoriesListsThunkCreator(true))
    dispatch(getIncomeAndExpensesAmountThunkCreator())
    dispatch(getFullCategoriesListThunkCreator())

    const templates = await AsyncStorage.getItem("templates")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json && json)

    const renewdTemplates = templates
      .filter((template: TemplateItemType) => {
        return template.category.id === id
      })
      .filter((template: TemplateItemType) => {
        if (template.selectedSubCategory && template.selectedSubCategory.id) {
          let isExists = currentCategorySubCategories.some(
            (subCategory) =>
              subCategory["id"] === template.selectedSubCategory.id
          )

          if (isExists) {
            return template
          }
        } else {
          return template
        }
      })
      .map((template: TemplateItemType) => {
        return {
          ...template,
          category: {
            ...template.category,
            icon: selectedIcon,
            color: selectedColor,
            title: newCategoryTitle,
          },
        }
      })

    const filteredTemplates = templates.filter(
      (template: TemplateItemType) => template.category.id !== id
    )

    await AsyncStorage.setItem(
      "templates",
      JSON.stringify([...renewdTemplates, ...filteredTemplates])
    )

    dispatch(getTemplatesArrayThunkCreator())
    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

// Delete category
export const deleteCategoryThunkCreator = (categoryID: string): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const operationsToDelete = json.filter((operation: any) => {
            return operation.category.id === categoryID
          })

          dispatch(DeleteOperationsThunkCreator(operationsToDelete))
        }
      })

    dispatch(getCategoriesListsThunkCreator(true))
    dispatch(getIncomeAndExpensesAmountThunkCreator())
    dispatch(getFullCategoriesListThunkCreator())

    const templates = await AsyncStorage.getItem("templates")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => json)

    const filteredTemplates = templates.filter((template: any) => {
      return template.category.id !== categoryID
    })

    await AsyncStorage.setItem("templates", JSON.stringify(filteredTemplates))
    dispatch(getTemplatesArrayThunkCreator())

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

// Combine categories
export const combineCategoriesThunkCreator = (
  oldCategory: any,
  newCategory: any,
  isCombining: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const localUserName = await AsyncStorage.getItem("localUserName")
    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          let FilteredArray = [] as Array<any>
          let NewOperationsArray = [] as Array<any>

          if (isCombining) {
            FilteredArray = json.filter(
              (operation: any) => operation.category.id !== newCategory.id
            )

            NewOperationsArray = await json
              .filter(
                (operation: any) => operation.category.id === newCategory.id
              )
              .map((newOper: any) => {
                return {
                  ...newOper,
                  user: localUserName,
                  id: generateRandomID(),
                  category: {
                    ...newOper.category,
                    icon: oldCategory.icon,
                    title: oldCategory.title,
                    color: oldCategory.color,
                    id: oldCategory.id,
                  },
                }
              })
          } else {
            FilteredArray = json.filter(
              (operation: any) => operation.category.id !== oldCategory.id
            )

            NewOperationsArray = await json
              .filter(
                (operation: any) => operation.category.id === oldCategory.id
              )
              .map((oldOper: any) => {
                const subCategory = {
                  title: oldOper.category.title,
                  icon: oldOper.category.icon,
                  color: oldOper.category.color,
                  price: oldOper.category.price,
                  id: oldOper.category.id,
                }

                return {
                  ...oldOper,
                  user: localUserName,
                  id: generateRandomID(),
                  category: {
                    ...newCategory,
                    price: 0,
                    budget: 0,
                    subCategories: [subCategory],
                  },
                  subCategory: subCategory,
                }
              })
          }

          await AsyncStorage.setItem(
            "operations",
            JSON.stringify([...FilteredArray, ...NewOperationsArray])
          )
        }
      })
    dispatch(getCategoriesListsThunkCreator(true))

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

// Comvert sub-category to category
export const convertSubCategoryToCategoryThunkCreator = (
  currentCategory: any,
  convertingSubCategory: any,
  isIncome: boolean
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("operations")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json) {
          const localUserName = await AsyncStorage.getItem("localUserName")
          const newOperation1 = {
            isIncome: isIncome,
            billTitle: convertingSubCategory.title,
            bill: null,
            moneyAmount: 0,
            comment: null,
            category: {
              archived: false,
              budget: 0,
              color: convertingSubCategory.color,
              icon: convertingSubCategory.icon,
              id: convertingSubCategory.id,
              price: 0,
              subCategories: [],
              title: convertingSubCategory.title,
            },
            createdAt: null,
            PhotosURLsList: [] as Array<any>,
            user: localUserName,
            id: generateRandomID(),
            categoryID: convertingSubCategory.id,
            operation: isIncome ? "Income" : "Expenses",
            subCategory: null,
          }

          const NewOperations = json
            .filter((operation: any) => {
              let result = false
              operation.category.subCategories.every((subCategory: any) => {
                result = subCategory.id === convertingSubCategory.id
              })

              return result
            })
            .filter((operation: any) => Number(operation.moneyAmount) > 0)
            .map((operation: any) => {
              return {
                ...operation,

                category: {
                  archived: false,
                  budget: 0,
                  color: convertingSubCategory.color,
                  icon: convertingSubCategory.icon,
                  id: convertingSubCategory.id,
                  price: operation.moneyAmount,
                  subCategories: [],
                  title: convertingSubCategory.title,
                },
                user: localUserName,
                id: generateRandomID(),
                subCategory: null,
              }
            })

          const newOperations =
            Number(convertingSubCategory.price) > 0
              ? [newOperation1, ...NewOperations]
              : [newOperation1]

          const filteredOperations = json.filter((operation: any) =>
            operation.category.subCategories.every(
              (subCategory: any) =>
                ![convertingSubCategory.id].includes(subCategory.id)
            )
          )

          await AsyncStorage.setItem(
            "operations",
            JSON.stringify([...filteredOperations, ...newOperations])
          )
        }
      })
    dispatch(getCategoriesListsThunkCreator(true))

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}

// Change impotant bill
export const ChangeImportantBillThunkCreator = (
  oldBill: any,
  newBill?: any
): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    const normalBillsList = await AsyncStorage.getItem("normalBillsList")
      .then((req: any) => JSON.parse(req))
      .then((json) => json)

    await AsyncStorage.getItem("importantBills")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        if (json && json.length > 0) {
          const array = normalBillsList.filter((normalBill: any) =>
            json.some(
              (importantBill: any) =>
                normalBill &&
                importantBill &&
                normalBill.name === importantBill.name
            )
          )

          if (array && array.length > 0) {
            const FinalArray = () => {
              if (oldBill) {
                if (newBill) {
                  return [
                    ...array.filter((bill: any) => bill.name !== oldBill.name),
                    newBill,
                  ]
                } else {
                  return array.filter((bill: any) => bill.name !== oldBill.name)
                }
              } else {
                return [...array, newBill]
              }
            }

            await AsyncStorage.setItem(
              "importantBills",
              JSON.stringify(FinalArray().slice(0, 2))
            )
          } else {
            await AsyncStorage.setItem(
              "importantBills",
              JSON.stringify([newBill])
            )
          }
        } else {
          await AsyncStorage.setItem(
            "importantBills",
            JSON.stringify([newBill])
          )
        }
      })

    dispatch(getImporantBillsThunkCreator())

    dispatch(RestoreDataFromDeviceThunkCreator())
  }
}
