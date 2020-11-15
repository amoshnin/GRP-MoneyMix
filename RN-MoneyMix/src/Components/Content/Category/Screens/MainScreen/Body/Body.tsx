// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import LeftRow from "./LeftRow/LeftRow"
import StatsRow from "./StatsRow/StatsRow"

import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isAuthentificated: boolean
  selectedCurrency: string | null

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  isIncome: boolean
  isEditMode: boolean

  totalIncome: number | string | number
  totalExpenses: number | string | number

  defaultBill: any

  operationsList: Array<any>
  budgetEnabledStatus: boolean
}

const Body: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <LeftRow
        navigation={props.navigation}
        isIncome={props.isIncome}
        isEditMode={props.isEditMode}
        defaultBill={props.defaultBill}
        selectedCurrency={props.selectedCurrency}
        incomeCategoriesList={props.incomeCategoriesList}
        expensesCategoriesList={props.expensesCategoriesList}
        operationsList={props.operationsList}
        totalIncome={props.totalIncome}
        totalExpenses={props.totalExpenses}
        budgetEnabledStatus={props.budgetEnabledStatus}
      />

      <StatsRow
        navigation={props.navigation}
        isAuthentificated={props.isAuthentificated}
        isEditMode={props.isEditMode}
        isIncome={props.isIncome}
        totalIncome={props.totalIncome}
        totalExpenses={props.totalExpenses}
        selectedCurrency={props.selectedCurrency}
        incomeCategoriesList={props.incomeCategoriesList}
        expensesCategoriesList={props.expensesCategoriesList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: 100000,
    borderTopRightRadius: 40,
    marginTop: 5,
    paddingTop: 20,
    marginRight: 20,
    elevation: 20,
    overflow: "hidden",
  },
})

export default React.memo(Body, isEqualMemoComparison)
