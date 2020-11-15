// PLUGINS IMPORTS //
import React, { useState } from "react"

// COMPONENTS IMPORTS //
import SubCategoriesList from "./SubCategoriesList/SubCategoriesList"
import EditModeSection from "./EditModeSection/EditModeSection"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  isIncome: boolean
  navigation: any
  category: any
  selectedCurrency: string

  subCategories: Array<any>
  setSubCategories: (newSubCategories: Array<any>) => void
  sendingSubCategories: Array<any>
  setSendingSubCategories: (newSendingSubCategories: Array<any>) => void
  deletingSubCategories: Array<any>
  setDeletingSubCategories: (newDeleteSubCategories: Array<any>) => void
  submitNewCategory: (title: string) => void

  convertSubCategoryToCategoryThunkCreator: (
    currentCategory: any,
    convertingSubCategory: any,
    isIncome: boolean
  ) => void
}

const SubCategoriesSection: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false as boolean)

  return (
    <>
      <SubCategoriesList
        navigation={props.navigation}
        isIncome={props.isIncome}
        category={props.category}
        subCategories={props.subCategories}
        setSubCategories={props.setSubCategories}
        sendingSubCategories={props.sendingSubCategories}
        setSendingSubCategories={props.setSendingSubCategories}
        selectedCurrency={props.selectedCurrency}
        deletingSubCategories={props.deletingSubCategories}
        setDeletingSubCategories={props.setDeletingSubCategories}
        convertSubCategoryToCategoryThunkCreator={
          props.convertSubCategoryToCategoryThunkCreator
        }
        submitNewCategory={props.submitNewCategory}
      />

      <EditModeSection
        navigation={props.navigation}
        editMode={editMode}
        setEditMode={setEditMode}
        subCategories={props.subCategories}
        setSubCategories={props.setSubCategories}
        sendingSubCategories={props.sendingSubCategories}
        setSendingSubCategories={props.setSendingSubCategories}
      />
    </>
  )
}

export default React.memo(SubCategoriesSection, isEqualMemoComparison)
