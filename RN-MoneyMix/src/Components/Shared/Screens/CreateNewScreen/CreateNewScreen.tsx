// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet, BackHandler } from "react-native"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import { icons, colors } from "./Content/Helpers/IconsArraysData"
import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"

import CategoryContent from "./Content/CategoryContent/CategoryContent"
import BillsContent from "./Content/BillsContent/BillsContent"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
    subCategories: Array<any>
    archived: boolean
  }

  isCategoryCreate: boolean
  isIncome?: boolean
  selectedCurrency: string

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  // BILLS
  billType: string
  billEditData: any

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  SubmitNewBillThunkCreator: (
    billEditData: any,
    billType: string,
    billData: {
      name: string
      description: string
      accountBalance: string
      creditLimit: string
      takeIntoTotalBalance: boolean
      iOwe: string
      goal: string
      totalDebtSum: string
      icon: string
    },
    BillsArraysData: {
      normalBillsList: Array<any>
      savingsBillsList: Array<any>
      debtsBillsList: Array<any>
    }
  ) => void
  getCategoriesListsThunkCreator: () => void
  getUsedIconsArrayThunkCreator: () => void
  getFullCategoriesListThunkCreator: () => void
  DeleteBillThunkCreator: (
    billType: string,
    billEditData: any,
    accountBalance: string,
    totalDebtSum: string,
    iOwe: string,
    normalBillsList: Array<any>,
    debtsBillsList: Array<any>,
    savingsBillsList: Array<any>
  ) => void

  // CATEGORIES
  usedIconsArray: Array<string>
  SubmitNewCategoryThunkCreator: (
    isIncome: boolean,
    newCategoryTitle: string,
    selectedIcon: string,
    selectedColor: string,
    archived: boolean,
    subCategories: Array<any>,
    deletingSubCategories: Array<any>,
    id: string
  ) => any
  deleteCategoryThunkCreator: (categoryID: string) => void
  combineCategoriesThunkCreator: (
    oldCategory: any,
    newCategory: any,
    isCombining: boolean
  ) => void
  convertSubCategoryToCategoryThunkCreator: (
    currentCategory: any,
    convertingSubCategory: any,
    isIncome: boolean
  ) => void
}

const CreateNewScreen: React.FC<PropsType> = (props) => {
  const [name, setBillName] = useState(null as string | null)
  const [uploadBillData, setUploadBillData] = useState(false as boolean)
  const [archiveStatus, setArchiveStatus] = useState(
    (props.category && props.category.archived) || (false as boolean)
  )
  const [selectedIcon, setSelectedIcon] = useState(
    props.category && props.category.icon
  )
  const [selectedColor, setSelectedColor] = useState(
    props.category && props.category.color
  )
  const [subCategories, setSubCategories] = useState(
    (props.category && props.category.subCategories) || []
  )
  const [sendingSubCategories, setSendingSubCategories] = useState(
    [] as Array<any>
  )
  const [deletingSubCategories, setDeletingSubCategories] = useState(
    [] as Array<any>
  )

  const getData = async () => {
    props.getUsedIconsArrayThunkCreator()
    if (props.category) {
      setSelectedIcon(props.category.icon)
      setSelectedColor(props.category.color)
      setSubCategories(props.category.subCategories)
    } else {
      setSelectedIcon(
        icons.filter((el: any) => !props.usedIconsArray.includes(el))[
          Math.floor(Math.random() * colors.length)
        ]
      )

      setSelectedColor(colors[Math.floor(Math.random() * colors.length)])
    }
  }

  const submitNewCategory = (title: string) => {
    const filteredSubCategories = sendingSubCategories.filter((el) => {
      return props.category && props.category.subCategories
        ? !props.category.subCategories.includes(el)
        : sendingSubCategories
    })

    props
      .SubmitNewCategoryThunkCreator(
        props.isIncome as boolean,
        title,
        selectedIcon as string,
        selectedColor as string,
        archiveStatus,
        filteredSubCategories,
        deletingSubCategories,
        props.category ? props.category.id : generateRandomID()
      )
      .then(() => {
        props.getCategoriesListsThunkCreator()
      })
    props.navigation.goBack()
  }

  useEffect(() => {
    getData()
  }, [props.route])

  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.goBack()
      return true
    }

    props.navigation.addListener("focus", () => {
      getData()
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
    })
    props.navigation.addListener("blur", () => {
      setSelectedColor("")
      setSelectedIcon("")
      setSubCategories([])
      setSendingSubCategories([])
      setDeletingSubCategories([])

      BackHandler.removeEventListener("hardwareBackPress", handleBackButton)
    })
  }, [props.navigation])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [props.category])

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      <Header
        navigation={props.navigation}
        title={
          props.category
            ? "EditCategory"
            : props.isCategoryCreate
            ? "CreateCategory"
            : Object.values(props.billEditData).length
            ? "EditBill"
            : "CreateNewBill"
        }
        isCategoryCreate={props.isCategoryCreate}
        name={name as string}
        setBillName={setBillName}
        setUploadBillData={setUploadBillData}
        billEditData={props.billEditData}
        isIncome={props.isIncome}
        subCategories={subCategories}
        deletingSubCategories={deletingSubCategories}
        getCategoriesListsThunkCreator={props.getCategoriesListsThunkCreator}
        selectedIcon={selectedIcon}
        selectedColor={selectedColor}
        archiveStatus={archiveStatus}
        category={props.category}
        route={props.route}
        submitNewCategory={submitNewCategory}
      />

      {props.category || props.isCategoryCreate ? (
        <CategoryContent
          navigation={props.navigation}
          route={props.route}
          category={props.category}
          isIncome={props.isIncome as boolean}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          selectedColor={selectedColor}
          selectedCurrency={props.selectedCurrency}
          setSelectedColor={setSelectedColor}
          archiveStatus={archiveStatus}
          setArchiveStatus={setArchiveStatus}
          subCategories={subCategories}
          setSubCategories={setSubCategories}
          sendingSubCategories={sendingSubCategories}
          setSendingSubCategories={setSendingSubCategories}
          deletingSubCategories={deletingSubCategories}
          setDeletingSubCategories={setDeletingSubCategories}
          usedIconsArray={props.usedIconsArray}
          submitNewCategory={submitNewCategory}
          totalIncomeCategoriesList={props.totalIncomeCategoriesList}
          totalExpensesCategoriesList={props.totalExpensesCategoriesList}
          deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}
          combineCategoriesThunkCreator={props.combineCategoriesThunkCreator}
          convertSubCategoryToCategoryThunkCreator={
            props.convertSubCategoryToCategoryThunkCreator
          }
          getUsedIconsArrayThunkCreator={props.getUsedIconsArrayThunkCreator}
          getFullCategoriesListThunkCreator={
            props.getFullCategoriesListThunkCreator
          }
        />
      ) : (
        <BillsContent
          navigation={props.navigation}
          billType={props.billType as string}
          name={name as string}
          uploadBillData={uploadBillData}
          setUploadBillData={setUploadBillData}
          billEditData={props.billEditData}
          selectedCurrency={props.selectedCurrency}
          //
          normalBillsList={props.normalBillsList}
          debtsBillsList={props.debtsBillsList}
          savingsBillsList={props.savingsBillsList}
          //
          SubmitNewBillThunkCreator={props.SubmitNewBillThunkCreator}
          DeleteBillThunkCreator={props.DeleteBillThunkCreator}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
  },
})

export default React.memo(CreateNewScreen, isEqualMemoComparison)
