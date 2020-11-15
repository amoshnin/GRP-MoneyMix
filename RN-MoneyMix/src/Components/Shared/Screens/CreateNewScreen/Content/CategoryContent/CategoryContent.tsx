// PLUGINS IMPORTS //
import React from "react"

// COMPONENTS IMPORTS //
import ConfiguringSection from "./ConfiguringSection/ConfiguringSection"
import BottomIcons from "./BottomIcons/BottomIcons"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  selectedCurrency: string

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

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  isIncome: boolean
  selectedIcon: string | null
  setSelectedIcon: (selectedIcon: string) => void
  selectedColor: string
  setSelectedColor: (selectedColor: string) => void
  archiveStatus: boolean
  setArchiveStatus: (newArchiveStatus: boolean) => void
  subCategories: Array<any>
  setSubCategories: (newSubCategories: Array<any>) => void
  sendingSubCategories: Array<any>
  setSendingSubCategories: (newSendingSubCategories: Array<any>) => void
  deletingSubCategories: Array<any>
  setDeletingSubCategories: (newDeleteSubCategories: Array<any>) => void

  usedIconsArray: Array<string>
  submitNewCategory: (title: string) => void

  getUsedIconsArrayThunkCreator: () => void
  getFullCategoriesListThunkCreator: () => void
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

const CategoryContent: React.FC<PropsType> = (props) => {
  return (
    <>
      <ConfiguringSection
        navigation={props.navigation}
        isIncome={props.isIncome}
        route={props.route}
        category={props.category}
        submitNewCategory={props.submitNewCategory}
        selectedCurrency={props.selectedCurrency}
        selectedColor={props.selectedColor}
        setSelectedColor={props.setSelectedColor}
        selectedIcon={props.selectedIcon}
        setSelectedIcon={props.setSelectedIcon}
        archiveStatus={props.archiveStatus}
        setArchiveStatus={props.setArchiveStatus}
        subCategories={props.subCategories}
        setSubCategories={props.setSubCategories}
        sendingSubCategories={props.sendingSubCategories}
        setSendingSubCategories={props.setSendingSubCategories}
        deletingSubCategories={props.deletingSubCategories}
        setDeletingSubCategories={props.setDeletingSubCategories}
        usedIconsArray={props.usedIconsArray}
        convertSubCategoryToCategoryThunkCreator={
          props.convertSubCategoryToCategoryThunkCreator
        }
      />
      {props.category && (
        <BottomIcons
          navigation={props.navigation}
          category={props.category}
          route={props.route}
          isIncome={props.isIncome}
          selectedCurrency={props.selectedCurrency}
          totalIncomeCategoriesList={props.totalIncomeCategoriesList}
          totalExpensesCategoriesList={props.totalExpensesCategoriesList}
          getFullCategoriesListThunkCreator={
            props.getFullCategoriesListThunkCreator
          }
          combineCategoriesThunkCreator={props.combineCategoriesThunkCreator}
          deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}
        />
      )}
    </>
  )
}

export default React.memo(CategoryContent, isEqualMemoComparison)
