// PLUGINS IMPORTS //
import React from "react"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import Body from "./Body/Body"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  title: string

  rightSubtitle: string
  leftSubtitle: string

  selectedCurrency: string | null
  totalValue: string | number

  fieldsArray: Array<any>
  budgetedFieldsArray: Array<any>

  isBill?: boolean
  isIncome?: boolean
}

const SectionItem: React.FC<PropsType> = (props) => {
  let totalBudget = 0

  props.budgetedFieldsArray.map((budgetField: any) => {
    totalBudget = totalBudget + budgetField.budget
  })

  return (
    <>
      <Header
        selectedCurrency={props.selectedCurrency}
        title={props.title}
        rightSubtitle={props.rightSubtitle}
        leftSubtitle={props.leftSubtitle}
        isIncome={props.isIncome as boolean}
        totalValue={props.totalValue}
        totalBudget={totalBudget}
        isBill={props.isBill}
      />
      <Body
        navigation={props.navigation}
        fieldsArray={props.fieldsArray}
        budgetedFieldsArray={props.budgetedFieldsArray}
        selectedCurrency={props.selectedCurrency}
        isBill={props.isBill}
        isIncome={props.isIncome}
      />
    </>
  )
}

export default React.memo(SectionItem, isEqualMemoComparison)
