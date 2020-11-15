// PLUGINS IMPORTS //
import React, { useState } from "react"

// COMPONENTS IMPORTS //
import SubCategoriesList from "~/Components/Shared/Screens/MoneyTransfers/Shared/Sections/SubCategoriesList/SubCategoriesList"
import CalculatorSection from "./CalculatorSection/CalculatorSection"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isAuthentificated: boolean
  isOnline: boolean
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  isIncome: boolean
  selectedCurrency: string | null

  selectedCategory: any
  selectedBill: any

  CategoryMoneyTransferThunkCreator: (
    isIncome: boolean,
    categoryData: any,
    selectedSubCategory: any,
    selectedBill: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: string
  ) => any
}

const Body: React.FC<PropsType> = (props) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null as any)

  return (
    <>
      <SubCategoriesList
        subCategoriesList={props.selectedCategory.subCategories}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />
      <CalculatorSection
        navigation={props.navigation}
        route={props.route}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        storageData={props.storageData}
        //
        isIncome={props.isIncome}
        selectedCurrency={props.selectedCurrency}
        selectedCategory={props.selectedCategory}
        selectedBill={props.selectedBill}
        selectedSubCategory={selectedSubCategory}
        CategoryMoneyTransferThunkCreator={
          props.CategoryMoneyTransferThunkCreator
        }
      />
    </>
  )
}

export default React.memo(Body, isEqualMemoComparison)
