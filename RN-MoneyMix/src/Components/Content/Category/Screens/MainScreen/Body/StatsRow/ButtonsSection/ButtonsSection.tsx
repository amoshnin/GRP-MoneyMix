// PLUGINS IMPORTS //
import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import AddButton from "./AddButton/AddButton"
import {
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isAuthentificated: boolean
  selectedCurrency: string | null

  isEditMode: boolean
  isIncome: boolean

  incomeCategoriesLength: number
  expensesCategoriesLength: number

  totalIncome: number | string | number
  totalExpenses: number | string | number
}

const ButtonSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <TouchableOpacity
        onPress={async () => {
          props.navigation.setParams({
            isIncome: false,
          })
        }}
        style={[styles.button_wrap, styles.expense_button]}
      >
        <Text style={styles.button_title}>{t("Categories.Main.Expenses")}</Text>
        <Text style={styles.button_price}>
          {renderPrice(props.totalExpenses, props.selectedCurrency, t)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          props.navigation.setParams({
            isIncome: true,
          })
        }}
        style={[styles.button_wrap, styles.income_button]}
      >
        <Text style={styles.button_title}>{t("Categories.Main.Income")}</Text>
        <Text style={styles.button_price}>
          {renderPrice(props.totalIncome, props.selectedCurrency, t)}
        </Text>
      </TouchableOpacity>
      <AddButton
        navigation={props.navigation}
        isAuthentificated={props.isAuthentificated}
        isEditMode={props.isEditMode}
        isIncome={props.isIncome}
        incomeCategoriesLength={props.incomeCategoriesLength}
        expensesCategoriesLength={props.expensesCategoriesLength}
      />
    </>
  )
}

const styles = StyleSheet.create({
  button_wrap: {
    width: 156,
    alignItems: "center",
    elevation: 10,
    marginRight: 7,
    zIndex: -20,
  },

  button_title: {
    color: "white",
    fontSize: 13,
  },

  button_price: {
    color: "white",
    fontSize: 18,
    paddingBottom: 2,
  },

  expense_button: {
    marginBottom: 6,
    backgroundColor: "#FF555B",
    borderTopLeftRadius: 18,
  },

  income_button: {
    marginBottom: 14,
    backgroundColor: "#01CA5C",
    borderBottomLeftRadius: 18,
  },
})

export default React.memo(ButtonSection, isEqualMemoComparison)
