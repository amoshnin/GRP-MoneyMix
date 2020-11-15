// PLUGINS IMPORTS //
import React, { useState } from "react"

// COMPONENTS IMPORTS //
import UpperSection from "./Sections/UpperSection/UpperSection"
import BottomSection from "./Sections/BottomSection/BottomSection"

import SelectCetegoryIconPopup from "~/Components/Shared/Components/Popups/SelectCategoryIconPopup/SelectCategoryIconPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  isIncome: boolean
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

  usedIconsArray: Array<any>

  submitNewCategory: (title: string) => void
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
  convertSubCategoryToCategoryThunkCreator: (
    currentCategory: any,
    convertingSubCategory: any,
    isIncome: boolean
  ) => void
}

const ConfiguringSection: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)

  return (
    <>
      <UpperSection
        navigation={props.navigation}
        isIncome={props.isIncome}
        category={props.category}
        submitNewCategory={props.submitNewCategory}
        setPopupVisible={setPopupVisible}
        selectedCurrency={props.selectedCurrency}
        selectedColor={props.selectedColor}
        selectedIcon={props.selectedIcon}
        subCategories={props.subCategories}
        setSubCategories={props.setSubCategories}
        sendingSubCategories={props.sendingSubCategories}
        setSendingSubCategories={props.setSendingSubCategories}
        deletingSubCategories={props.deletingSubCategories}
        setDeletingSubCategories={props.setDeletingSubCategories}
        convertSubCategoryToCategoryThunkCreator={
          props.convertSubCategoryToCategoryThunkCreator
        }
      />
      {props.category && (
        <BottomSection
          category={props.category}
          archiveStatus={props.archiveStatus}
          setArchiveStatus={props.setArchiveStatus}
        />
      )}

      <SelectCetegoryIconPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        selectedIcon={props.selectedIcon}
        setSelectedIcon={props.setSelectedIcon}
        selectedColor={props.selectedColor}
        setSelectedColor={props.setSelectedColor}
        usedIconsArray={props.usedIconsArray}
      />
    </>
  )
}

export default React.memo(ConfiguringSection, isEqualMemoComparison)
