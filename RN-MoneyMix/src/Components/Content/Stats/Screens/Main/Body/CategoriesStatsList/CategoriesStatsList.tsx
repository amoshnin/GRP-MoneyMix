// PLUGINS IMPORTS //
import React from "react"
import { FlatList } from "react-native"

// COMPONENTS IMPORTS //
import CategoryItem from "./CategoryItem/CategoryItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  incomeAmount: number | null
  expensesAmount: number | null

  isIncome: boolean
  selectedCurrency: string | null

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  defaultBill: any
  operationsList: Array<any>
  setSelectedCategory: (newSelectedCategory: any) => void
}

const CategoriesStatsList: React.FC<PropsType> = (props) => {
  const incomeCategoriesList = props.incomeCategoriesList.filter(
    (category: any) =>
      category.icon &&
      category.icon !== "dollar" &&
      category.icon !== "creditcard"
  )

  const expensesCategoriesList = props.expensesCategoriesList.filter(
    (category: any) =>
      category.icon &&
      category.icon !== "dollar" &&
      category.icon !== "creditcard"
  )

  return (
    <FlatList
      data={props.isIncome ? incomeCategoriesList : expensesCategoriesList}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={({ item }) => {
        return (
          <CategoryItem
            key={item.icon}
            navigation={props.navigation}
            category={item}
            selectedCurrency={props.selectedCurrency}
            incomeAmount={props.incomeAmount}
            expensesAmount={props.expensesAmount}
            isIncome={props.isIncome}
            defaultBill={props.defaultBill}
            operationsList={props.operationsList}
            setSelectedCategory={props.setSelectedCategory}
          />
        )
      }}
    />
  )
}

export default React.memo(CategoriesStatsList, isEqualMemoComparison)
