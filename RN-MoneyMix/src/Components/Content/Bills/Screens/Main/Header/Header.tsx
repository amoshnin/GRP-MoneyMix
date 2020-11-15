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

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  billsMoneyAmount: number | string
  debtsMoneyAmount: number | string
  savingsMoneyAmount: number | string
}

const Header: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Button
        title={t("BillsScreen.Lists.Bills")}
        content={renderPrice(
          props.billsMoneyAmount || 0,
          props.selectedCurrency,
          t,
          false,
          7
        )}
        containerStyle={styles.button}
      />
      <Button
        title={t("BillsScreen.Lists.Savings")}
        content={renderPrice(
          props.savingsMoneyAmount || 0,
          props.selectedCurrency,
          t,
          false,
          7
        )}
        containerStyle={styles.button}
      />
      <Button
        title={t("BillsScreen.Lists.Debts")}
        content={renderPrice(
          props.debtsMoneyAmount || 0,
          props.selectedCurrency,
          t,
          false,
          7
        )}
        containerStyle={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 16,
  },

  button: {
    width: 104,
    marginHorizontal: 7,
    flex: 1,
  },
})

export default React.memo(Header, isEqualMemoComparison)
