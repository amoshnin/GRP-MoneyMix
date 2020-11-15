// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  incomeAmount: number | null
  expensesAmount: number | null

  selectedCurrency: string | null

  setIsIncome: (isIncomeStatus: boolean) => void
}

const Main: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Button
        title={t("Categories.Main.Income")}
        icon={<AntDesign name="arrowup" size={24} color="#01CA5C" />}
        containerStyle={[styles.button, { backgroundColor: "#01CA5C" }]}
        content={renderPrice(
          props.incomeAmount as number,
          props.selectedCurrency,
          t
        )}
        onPress={() => props.setIsIncome(true)}
      />

      <Button
        title={t("Categories.Main.Expenses")}
        icon={<AntDesign name="arrowdown" size={24} color="#FF555B" />}
        containerStyle={[styles.button, { backgroundColor: "#FF555B" }]}
        content={renderPrice(
          props.expensesAmount as number,
          props.selectedCurrency,
          t
        )}
        onPress={() => props.setIsIncome(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },

  button: {
    width: 148,
  },
})

export default React.memo(Main, isEqualMemoComparison)
