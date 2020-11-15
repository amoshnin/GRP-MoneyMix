// PLUGINS IMPORTS //
import React, { useState } from "react"

// COMPONENTS IMPORTS //
import UpperSection from "./UpperSection/UpperSection"

import BillSelectPopup from "~/Components/Shared/Components/Popups/BillsSelectPopup/BillsSelectPopup"
import CategoriesPopup from "./CategoriesPopup/CategoriesPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null
  isIncome: boolean

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>
  setIsIncome: (isIncome: boolean) => void

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  selectedCategory: any
  setSelectedCategory: (newSelectedCategory: any) => void

  selectedBill: any
  setSelectedBill: (newSelectedBill: any) => void
}

const TopSection: React.FC<PropsType> = (props) => {
  const [categoryPopupShown, setCategoryPopupShown] = useState(false as boolean)
  const [billPopupShown, setBillPopupShown] = useState(false as boolean)

  return (
    <>
      <UpperSection
        selectedCategory={props.selectedCategory}
        selectedBill={props.selectedBill}
        isIncome={props.isIncome}
        setCategoryPopupShown={setCategoryPopupShown}
        setBillPopupShown={setBillPopupShown}
        selectedCurrency={props.selectedCurrency}
      />
      <BillSelectPopup
        selectedCurrency={props.selectedCurrency}
        popupShown={billPopupShown}
        setPopupShown={setBillPopupShown}
        selectedBill={props.selectedBill}
        setSelectedBill={props.setSelectedBill}
        normalBillsList={props.normalBillsList}
        debtsBillsList={props.debtsBillsList}
        savingsBillsList={props.savingsBillsList}
      />
      <CategoriesPopup
        navigation={props.navigation}
        selectedCurrency={props.selectedCurrency}
        totalIncomeCategoriesList={props.totalIncomeCategoriesList}
        totalExpensesCategoriesList={props.totalExpensesCategoriesList}
        selectedCategory={props.selectedCategory}
        setSelectedCategory={props.setSelectedCategory}
        popupVisible={categoryPopupShown}
        setPopupVisible={setCategoryPopupShown}
        setIsIncome={props.setIsIncome}
      />
    </>
  )
}

export default React.memo(TopSection, isEqualMemoComparison)
