// PLUGINS IMPORTS //
import React from "react"
import { FlatList, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import CategoryItem from "~/Components/Shared/Components/CategoryItem/CategoryItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  isEditMode: boolean
  isIncome: boolean

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  totalIncome: number | string | number
  totalExpenses: number | string | number

  defaultBill: any
  operationsList: Array<any>
  budgetEnabledStatus: boolean
}

const CategoriesList: React.FC<PropsType> = (props) => {
  const incomeCategoriesList = props.incomeCategoriesList.filter(
    (category: any) =>
      category.icon !== "dollar" && category.icon !== "creditcard"
  )

  const expensesCategoriesList = props.expensesCategoriesList.filter(
    (category: any) =>
      category.icon !== "dollar" && category.icon !== "creditcard"
  )

  return (
    <FlatList
      data={props.isIncome ? incomeCategoriesList : expensesCategoriesList}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <CategoryItem
            key={item.icon}
            navigation={props.navigation}
            category={item}
            billData={props.defaultBill}
            isIncome={props.isIncome}
            isEditMode={props.isEditMode}
            selectedCurrency={props.selectedCurrency}
            operationsList={props.operationsList}
            totalIncome={props.totalIncome}
            totalExpenses={props.totalExpenses}
            budgetEnabledStatus={props.budgetEnabledStatus}
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 200,
  },
})

export default React.memo(CategoriesList, isEqualMemoComparison)
