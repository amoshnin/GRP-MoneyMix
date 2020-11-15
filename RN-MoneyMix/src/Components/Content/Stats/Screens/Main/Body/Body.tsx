// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import WhiteBlock from "~/Components/Shared/Components/WhiteBlock/WhiteBlock"

import TopSection from "./TopSection/TopSection"
import ChartSection from "./ChartSection/ChartSection"
import MiddleStatsSection from "./MiddleStatsSection/MiddleStatsSection"
import CategoriesStatsList from "./CategoriesStatsList/CategoriesStatsList"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  isIncome: boolean
  incomeAmount: number | null
  expensesAmount: number | null

  selectedCurrency: string | null

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  defaultBill: any
  operationsList: Array<any>

  setLoading: (loadingStatus: boolean) => void
}

const Main: React.FC<PropsType> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null as any)

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      setSelectedCategory(null)
    })
  }, [props.navigation])

  useEffect(() => {
    setSelectedCategory(null)
  }, [props.isIncome])

  const incomeOperations = props.operationsList.filter(
    (operation: any) =>
      operation.category.icon !== "unknown" &&
      operation.category.icon !== "dollar" &&
      operation.isIncome === true
  )
  const expensesOperations = props.operationsList.filter(
    (operation: any) =>
      operation.category.icon !== "unknown" &&
      operation.category.icon !== "dollar" &&
      operation.isIncome === false
  )

  return (
    <WhiteBlock containerStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSection
          expensesAmount={props.expensesAmount}
          incomeAmount={props.incomeAmount}
        />
        <ChartSection
          operations={props.isIncome ? incomeOperations : expensesOperations}
          selectedCategory={selectedCategory}
          selectedCurrency={props.selectedCurrency as string}
          isIncome={props.isIncome}
        />
        <MiddleStatsSection
          navigation={props.navigation}
          selectedCategory={selectedCategory}
          isIncome={props.isIncome}
          selectedCurrency={props.selectedCurrency}
          operationsList={
            props.isIncome ? incomeOperations : expensesOperations
          }
          setLoading={props.setLoading}
        />
        <CategoriesStatsList
          navigation={props.navigation}
          isIncome={props.isIncome}
          incomeCategoriesList={props.incomeCategoriesList}
          expensesCategoriesList={props.expensesCategoriesList}
          selectedCurrency={props.selectedCurrency}
          expensesAmount={props.expensesAmount}
          incomeAmount={props.incomeAmount}
          defaultBill={props.defaultBill}
          operationsList={props.operationsList}
          setSelectedCategory={setSelectedCategory}
        />
      </ScrollView>
    </WhiteBlock>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    flex: 1,
    height: "100%",
  },
})

export default React.memo(Main, isEqualMemoComparison)
