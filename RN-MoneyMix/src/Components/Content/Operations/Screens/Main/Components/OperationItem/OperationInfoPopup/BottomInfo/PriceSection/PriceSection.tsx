// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import {
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null
  isIncome: boolean
  moneyAmount: number | string
  operationType: string

  itemText: () => any
}

const PriceSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const renderOperationType = () => {
    if (props.operationType === "Transaction") {
      return t("Categories.Main.Transaction")
    } else {
      if (props.isIncome) {
        return t("Categories.Main.Income")
      } else {
        return t("Categories.Main.Expenses")
      }
    }
  }

  return (
    <View>
      <Text style={[styles.title, props.itemText()]}>
        {renderOperationType()}
      </Text>
      <Text style={[styles.text, props.itemText()]}>
        {props.isIncome ? "+" : "-"}{" "}
        {renderPrice(
          Math.abs(Number(props.moneyAmount)),
          props.selectedCurrency,
          t,
          true
        )}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
  },

  text: {
    fontSize: 20,
  },
})

export default React.memo(PriceSection, isEqualMemoComparison)
