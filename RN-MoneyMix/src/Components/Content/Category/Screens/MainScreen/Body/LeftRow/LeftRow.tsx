// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import CategoriesList from "./CategoriesList/CategoriesList"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  isIncome: boolean
  isEditMode: boolean

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  totalIncome: number | string | number
  totalExpenses: number | string | number

  defaultBill: any
  operationsList: Array<any>
  budgetEnabledStatus: boolean
}

const LeftRow: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.isIncome
          ? t("Categories.Main.Income")
          : t("Categories.Main.Expenses")}
      </Text>
      <CategoriesList
        navigation={props.navigation}
        selectedCurrency={props.selectedCurrency}
        isEditMode={props.isEditMode}
        isIncome={props.isIncome}
        defaultBill={props.defaultBill}
        incomeCategoriesList={props.incomeCategoriesList}
        expensesCategoriesList={props.expensesCategoriesList}
        operationsList={props.operationsList}
        totalIncome={props.totalIncome}
        totalExpenses={props.totalExpenses}
        budgetEnabledStatus={props.budgetEnabledStatus}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    flex: 2.3,
  },

  title: {
    fontSize: 24,
    marginBottom: 28,
  },
})

export default React.memo(LeftRow, isEqualMemoComparison)
